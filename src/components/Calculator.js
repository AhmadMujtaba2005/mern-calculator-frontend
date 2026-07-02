import { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';
import History from './History';
import { getHistory, saveCalculation, deleteCalculation, filterHistoryByDay } from '../services/api';

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
    const [history, setHistory] = useState([]);          // full list 
    const [filteredHistory, setFilteredHistory] = useState([]); // what the panel shows
    const [loading, setLoading] = useState(true);
    const [isFiltered, setIsFiltered] = useState(false);

    // Filter history 
    const filterHistory = async () => {
        try {
            const recentCalculations = await filterHistoryByDay();
            setFilteredHistory(recentCalculations);
            setIsFiltered(true);
        } catch (err) {
            console.error("Failed to fetch filtered history:", err);
        }
    };

    // Reset the filter
    const resetFilter = () => {
        setFilteredHistory(history);
        setIsFiltered(false);
    };

    // Fetch history from backend
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data);
                setFilteredHistory(data);
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

        if (value === '=') {
            try {
                // Supported operators: + - * / %
                const match = expression.match(/^(-?[\d.]+)([+\-*/%])(-?[\d.]+)$/);
                if (!match) {
                    setResult('Error');
                    return;
                }

                const number1 = match[1];
                const operationType = match[2];
                const number2 = match[3];

                // Send to backend
                const saved = await saveCalculation(number1, operationType, number2);

                // save result to backend
                setHistory((prev) => [saved, ...prev]);
                if (!isFiltered) {
                    setFilteredHistory((prev) => [saved, ...prev]);
                }
                setResult(saved.result);
                setExpression('');
            } catch {
                setResult('Error');
            }
            return;
        }

        // Prevent double operators
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
        setExpression(`${item.number1}${item.operationType}${item.number2}`);
        setResult(item.result);
    };

    // Delete history acc to ID
    const handleDeleteItem = async (id) => {
        try {
            await deleteCalculation(id);
            setHistory((prev) => prev.filter((item) => item._id !== id));
            setFilteredHistory((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            console.error("Failed to delete item:", err);
        }
    };

    // Delete all
    const handleClearHistory = async () => {
        try {
            await Promise.all(history.map((item) => deleteCalculation(item._id)));
            setHistory([]);
            setFilteredHistory([]);
            setIsFiltered(false);
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
                history={filteredHistory}
                loading={loading}
                onSelect={handleHistorySelect}
                onDelete={handleDeleteItem}
                onClear={handleClearHistory}
                filterHistory={filterHistory}
                resetFilter={resetFilter}
                isFiltered={isFiltered}
            />
        </div>
    );
};

export default Calculator;