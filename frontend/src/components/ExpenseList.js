const ExpenseList = ({content}) => (
    <>
    <h3>This month's expenses:</h3>
    {content.map(item => (
        <div className="content" key={item.expense}>
            <h4>{item.expense}</h4>
            <p>{item.price}</p>
        </div>
    ))}
    </>
);

export default ExpenseList;