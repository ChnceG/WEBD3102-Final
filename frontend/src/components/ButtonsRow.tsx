import IncomeButton from "./IncomeButton";
import ExpenseButton from "./ExpenseButton";
import TransferButton from "./TransferButton";

export default function ButtonsRow() {
    return (
        <div className="flex justify-center gap-4">
            <IncomeButton />
            <ExpenseButton />
            <TransferButton />
        </div>
    );
}