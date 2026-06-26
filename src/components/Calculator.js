import { useState } from 'react';
import Display from './Display';
import Button from './Button';
import History from './History';

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

    const handleButtonClick = (value) => {
        if (value === 'C') {
            setExpression('');
            setResult('');
            return;
        }


        if (value === '%') {
            if (expression) {
                try {
                    const val = eval(expression) / 100;
                    setExpression(String(val));
                    setResult('');
                } catch {
                    setResult('Error');
                }
            }
            return;
        }

        if (value === '=') {
            try {
                const answer = eval(expression);
                const formatted = parseFloat(answer.toFixed(10));
                setHistory((prev) => [
                    ...prev,
                    { expression, result: String(formatted) },
                ]);
                setResult(String(formatted));
                setExpression('');
            } catch {
                setResult('Error');
            }
            return;
        }

        // Prevent double operators
        const operators = ['+', '-', '*', '/'];
        const lastChar = expression.slice(-1);
        if (operators.includes(value) && operators.includes(lastChar)) {
            setExpression((prev) => prev.slice(0, -1) + value);
            return;
        }

        setExpression((prev) => prev + value);
        setResult('');
    };

    const handleHistorySelect = (item) => {
        setExpression(item.expression);
        setResult(item.result);
    };

    const handleClearHistory = () => setHistory([]);

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
                onSelect={handleHistorySelect}
                onClear={handleClearHistory}
            />
        </div>
    );
};

export default Calculator;