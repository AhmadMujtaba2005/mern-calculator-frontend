const History = ({ history, loading, onSelect, onDelete, onClear }) => {
    return (
        <div className="history-panel">
            <h3>History</h3>
            <div className="history-list">
                {loading ? (
                    <p className="history-empty">Loading history...</p>
                ) : history.length === 0 ? (
                    <p className="history-empty">No calculations yet</p>
                ) : (
                    history.map((item) => (
                        <div
                            key={item._id}
                            className="history-item"
                            onClick={() => onSelect(item)}
                        >
                            <div className="hist-content">
                                <div className="hist-expr">{item.equation}</div>
                                <div className="hist-result">= {item.result}</div>
                                <div className="hist-date">{item.createdAt}</div>
                            </div>
                            <button
                                className="delete-item-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(item._id);
                                }}
                                title="Delete"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>
            {history.length > 0 && (
                <button className="clear-history-btn" onClick={onClear}>
                    Clear All
                </button>
            )}
        </div>
    );
};

export default History;