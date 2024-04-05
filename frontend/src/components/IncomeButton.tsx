import { useNavigate } from 'react-router-dom';

export default function IncomeButton() {
  const navigate = useNavigate();

  const handleNavigateToIncome = () => {
    navigate('/income');
  };

  return (
    <button onClick={handleNavigateToIncome} className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4'>Add Income</button>
  );
}