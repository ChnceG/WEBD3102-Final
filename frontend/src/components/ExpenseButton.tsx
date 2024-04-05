import { useNavigate } from 'react-router-dom';

export default function IncomeButton() {
  const navigate = useNavigate();

  const handleNavigateToIncome = () => {
    navigate('/expenses');
  };

  return (
    <button onClick={handleNavigateToIncome} className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4'>Add Expense</button>
  );
}