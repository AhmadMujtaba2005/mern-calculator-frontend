const History = ({ history, onSelect, onClear }) => {
    return (
        <div className="history-panel">
            <h3>History</h3>
            <div className="history-list">
                {history.length === 0 ? (
                    <p className="history-empty">No calculations yet</p>
                ) : (
                    [...history].reverse().map((item, index) => (
                        <div
                            key={index}
                            className="history-item"
                            onClick={() => onSelect(item)}
                        >
                            <div className="hist-expr">{item.expression}</div>
                            <div className="hist-result">= {item.result}</div>
                        </div>
                    ))
                )}
            </div>
            {history.length > 0 && (
                <button className="clear-history-btn" onClick={onClear}>
                    Clear History
                </button>
            )}
        </div>
    );
};

export default History;