const History = ({ history, loading, onSelect, onDelete, onClear, filterHistory, resetFilter, isFiltered }) => {

    return (
        <div className="history-panel">
            <h3>History</h3>
            <div className="filter-container">
                <button onClick={filterHistory} className="day-btn">Last 1 Day</button>
                {isFiltered && (
                    <button onClick={resetFilter} className="reset-filter-btn">Show All</button>
                )}
            </div>

            <div className="hist-table-header">
                <span>Number 1</span>
                <span>Operation</span>
                <span>Number 2</span>
                <span>Result</span>
                <span>Calculated On</span>
                <span></span>
            </div>
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
                            <span className="hist-num1">{item.number1}</span>
                            <span className="hist-op">{item.operationType}</span>
                            <span className="hist-num2">{item.number2}</span>
                            <span className="hist-result">{item.result}</span>
                            <span className="hist-date">{item.createdAt}</span>
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