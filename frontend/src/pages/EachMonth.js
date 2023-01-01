import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import months from "../data/months";
import MonthListPage from "./MonthList";
import AddExpenseForm from "../components/AddExpensesForm";
import ExpenseList from "../components/ExpenseList";

const EachMonthPage = () => {
    const [monthInfo, setMonthInfo] = useState({totalExpense: "$0", content: []});
    const {yearId} = useParams();
    const {monthId} = useParams();

    useEffect(() => {
        const loadMonthInfo = async () => {
            const response = await axios.get(`/api/${yearId}/${monthId}`);
            const newMonthInfo = response.data;
            setMonthInfo(newMonthInfo);
        }

        loadMonthInfo();
    });

    // const {monthId} = useParams();
    // const month = months.find(month => month.id === monthId);

    return (
        <div>
            <h1>This is the Budget page of month {monthId}, year {yearId}</h1>
            {/* <p>Total expense for this month: {month.totalExpense}</p> */}
            <h2>Total expense this month: {monthInfo.totalExpense}</h2>
            <AddExpenseForm
                yearId={yearId}
                monthId={monthId}
                onBudgetUpdated={updatedBudget => setMonthInfo(updatedBudget)} />
            <ExpenseList content={monthInfo.content} />
        </div>
    )
}

export default EachMonthPage;