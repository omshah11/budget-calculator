import { useState } from "react";
import axios from "axios";

const AddExpenseForm = ({yearId, monthId, onBudgetUpdated}) => {
    const [newExpense, setExpense] = useState('');
    const [newPrice, setPrice] = useState(0);

    const addExpense = async () => {
        const response = axios.post(`/api/${yearId}/${monthId}/addExpense`, {
            expense: newExpense,
            price: newPrice
        });

        const updatedBudget = (await response).data;
        onBudgetUpdated(updatedBudget);
        setExpense('');
        setPrice(0);
    }

    return (
        <div id="add-expense-form">
            <h3>Add an Expense</h3>
            <label>
                Expense:
                <input 
                    value={newExpense}
                    onChange={e => setExpense(e.target.value)}
                    type="text" />
            </label>
            <label>
                Price:
                <input
                    value={newPrice}
                    onChange={e => setPrice(e.target.value)} 
                    type="number" />
            </label>
            <button onClick={addExpense}>Add</button>
        </div>
    )
}

export default AddExpenseForm