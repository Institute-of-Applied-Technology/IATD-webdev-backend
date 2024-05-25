import { useLocation, useNavigate } from 'react-router-dom';
function MainPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const buttonIdentifier = new URLSearchParams(location.search).get('button');

    const handleGoBack = () => {
        navigate('/');
    };

    return (
      <div>
        <div className='app-header'> IATD Student Expense Tracker</div>
        <div className="login-container card">
          <legend className="login-title">Main Page</legend>
          <div className="app-buttons text-center">
            <div>You logged in as: {buttonIdentifier}</div>
            <button onClick={handleGoBack}>Go Back</button>
          </div>
        </div>
      </div>
    );
}

export default MainPage;