import Infobox from '../components/Infobox';
import { useNavigate } from 'react-router-dom';

export default function Landing(): JSX.Element {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <div>
            <div className="mx-auto">
                <h1 className="text-center text-2xl font-bold">Welcome to the Personal Finance App</h1>
                <p className="text-center text-xl">We will help you manage your finances and help you visualize your spending</p>
            </div>

            <div className='my-4'>
                <h1 className="text-3xl text-center">Features</h1>
                <div className="flex flex-col text-center gap-4 mx-auto my-2 w-[500px]">
                    <Infobox className="bg-white p-4 shadow-lg">
                        <h1 className="bg-white text-2xl">Track Spending</h1>
                        <p className="bg-white">Track your spending and categorize them</p>
                    </Infobox>
                    <Infobox className="bg-white p-4 shadow-lg">
                        <h1 className="bg-white text-2xl">Visualize Spending</h1>
                        <p className="bg-white">Visualize your spending in a graphs</p>
                    </Infobox>
                    <Infobox className="bg-white p-4 shadow-lg">
                        <h1 className="bg-white text-2xl">Budgeting</h1>
                        <p className="bg-white">Set budgets and track your spending against them</p>
                    </Infobox>
                </div>
            </div>

            <div>
                <h1 className="text-3xl text-center">Get Started</h1>
                <p className="text-center">Login or create an account to get started</p>
                <div className="flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded mx-auto" onClick={handleClick}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}