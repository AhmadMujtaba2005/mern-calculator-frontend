import { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';
import History from './History';
import { getHistory, saveCalculation, deleteCalculation } from '../services/api';

const buttons = [
    { value: 'C', className: 'clear wide' },
    { value: '%', className: 'operator' },
    { value: '/', className: 'operator' },
    { value: '7', className: 'number' },
    { value: '8', className: 'number' },
    { value: '9', className: 'number' },
    { value: '*', className: 'operator' },
    { value: '4', className: 'number' },
    { value: '5', className: 'number' },
    { value: '6', className: 'number' },
    { value: '-', className: 'operator' },
    { value: '1', className: 'number' },
    { value: '2', className: 'number' },
    { value: '3', className: 'number' },
    { value: '+', className: 'operator' },
    { value: '0', className: 'number zero' },
    { value: '.', className: 'decimal' },
    { value: '=', className: 'equals' },
];

const Calculator = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch history from backend on mount
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data);
            } catch (err) {
                console.error("Failed to load history:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const handleButtonClick = async (value) => {
        if (value === 'C') {
            setExpression('');
            setResult('');
            return;
        }

        // % acts as percentage-of: A%B → A*B/100
        // e.g. 15%20 → (15*20/100) = 3

        if (value === '=') {
            try {
                const [val, total] = expression.split('%');
                const processed = total ? `${val}*${total}/100` : expression;
                const answer = eval(processed);
                const formatted = parseFloat(answer.toFixed(10));

                // Save to backend and get the saved item (with _id)
                const saved = await saveCalculation(expression, String(formatted));
                setHistory((prev) => [saved, ...prev]);
                setResult(String(formatted));
                setExpression('');
            } catch {
                setResult('Error');
            }
            return;
        }

        // Prevent double operators (including %)
        const operators = ['+', '-', '*', '/', '%'];
        const lastChar = expression.slice(-1);
        if (operators.includes(value) && operators.includes(lastChar)) {
            setExpression((prev) => prev.slice(0, -1) + value);
            return;
        }

        setExpression((prev) => prev + value);
        setResult('');
    };

    const handleHistorySelect = (item) => {
        setExpression(item.equation);
        setResult(item.result);
    };

    // Delete a single history item
    const handleDeleteItem = async (id) => {
        try {
            await deleteCalculation(id);
            setHistory((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            console.error("Failed to delete item:", err);
        }
    };

    // Delete all: soft-delete each item via API
    const handleClearHistory = async () => {
        try {
            await Promise.all(history.map((item) => deleteCalculation(item._id)));
            setHistory([]);
        } catch (err) {
            console.error("Failed to clear history:", err);
        }
    };

    return (
        <div className="app-wrapper">
            <div className="calculator-container">
                <Display expression={expression} result={result} />
                <div className="button-grid">
                    {buttons.map((btn) => (
                        <Button
                            key={btn.value}
                            value={btn.value}
                            className={btn.className}
                            onClick={handleButtonClick}
                        />
                    ))}
                </div>
            </div>

            <History
                history={history}
                loading={loading}
                onSelect={handleHistorySelect}
                onDelete={handleDeleteItem}
                onClear={handleClearHistory}
            />
        </div>
    );
};

export default Calculator;