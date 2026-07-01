const Button = ({ value, onClick, className }) => {
    return (
        <button className={`calc-btn ${className || ''}`} onClick={() => onClick(value)}>
            {value}
        </button>
    );
};


export default Button;