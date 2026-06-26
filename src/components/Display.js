const Display = ({ expression, result }) => {
    return (
        <div className="display">
            <div className="expression">{expression || '0'}</div>
            <div className="result">{result !== '' ? result : '0'}</div>
        </div>
    );
};

export default Display;