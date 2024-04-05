import AccountsCard from '../components/AccountsCard';
import ExpensesCard from '../components/ExpensesCard';
import IncomeCard from '../components/IncomeCard';
import RecentTransactions from '../components/RecentTransactionsCard';
import ButtonsRow from '../components/ButtonsRow';
import Graph from '../components/Graph';

const Dashboard = () => {

    return (
        <div>
            <h1 className='font-bold text-2xl text-center'>Dashboard</h1>
            <AccountsCard />
            <div className="flex gap-4 justify-center">
                <ExpensesCard />
                <IncomeCard />
                <RecentTransactions />
            </div>
            <div>
                <ButtonsRow />
            </div>
            <div>
                <Graph />
            </div>
        </div>
    );
};

export default Dashboard;