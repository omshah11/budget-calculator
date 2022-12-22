import { useParams } from "react-router-dom";
import months from "../data/months";
import MonthListPage from "./MonthList";

const EachMonthPage = () => {
    const {monthId} = useParams();
    const month = months.find(month => month.id === monthId)

    return (
        <div>
            <h1>This is the Budget page of month {monthId}</h1>
            <p>Total expense for this month: {month.totalExpense}</p>
        </div>
        
    )
}

export default EachMonthPage;