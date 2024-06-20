import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ConfirmationService } from "../service/AccountService";

const Confirmation = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    if (codeParam) {
      setConfirmationCode(codeParam);
    }
  }, []);

  useEffect(() => {
    if (confirmationCode) {
      const confirmUser = async () => {
        try {
          let code = {
            code: confirmationCode
          }
          const result = await ConfirmationService(code);
          if (result) {
            setConfirmationResult(result);
            setLoading(false);
          }

        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      confirmUser();
    }
  }, [confirmationCode]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (confirmationResult) {
    return (
      <div>
        <h2>Confirmation Successful!</h2>
        <p>{confirmationResult?.message}</p>
        {/* Button to navigate to the login page */}
        <button onClick={() => navigate('/UserLogin')} className="btn btn-primary">Click here to Login</button>
      </div>
    );
  }

  return <p>Confirmation in progress...</p>;
};

export default Confirmation;
