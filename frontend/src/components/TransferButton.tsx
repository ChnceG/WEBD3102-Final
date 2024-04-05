import { useNavigate } from 'react-router-dom';

export default function TransferButton() {
  const navigate = useNavigate();

  const handleNavigateToTransfer = () => {
    navigate('/transfer');
  };

  return (
    <button onClick={handleNavigateToTransfer} className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4'>Transfer Money</button>
  );
}