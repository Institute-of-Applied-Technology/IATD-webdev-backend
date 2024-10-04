import './css/MainPage.css'
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const buttonIdentifier = new URLSearchParams(location.search).get('button');

  const handleGoBack = () => {
    navigate('/');
  };
  const data = [
    { name: 'Entertainment', Expense: 145 },
    { name: 'Food', Expense: 300 },
    { name: 'Books', Expense: 150 },
    { name: 'Transport', Expense: 110 },
  ];

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const toggleAddExpenseModal = () => {
    setIsAddExpenseModalOpen(!isAddExpenseModalOpen);
  };

  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] = useState(false);

  const toggleEditExpenseModal = () => {
    setIsEditExpenseModalOpen(!isEditExpenseModalOpen);
  };

  const [studentName, setStudentName] = useState('');
  const [studentBalance, setStudentBalance] = useState(0);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/students/${buttonIdentifier}`);
        setStudentName(response.data.name);
        setStudentBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudentData();
  }, [buttonIdentifier]);

  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/expenses/student/${buttonIdentifier}`);
      setExpenses(response.data);
      const total = response.data.reduce((acc, cur) => acc + cur.amount, 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, [buttonIdentifier]);


  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false);
  const toggleMoneyModal = () => {
    setIsMoneyModalOpen(!isMoneyModalOpen);
  };



  
  return (
    <div className="container">
      <div>
        <div className="app-buttons logg-off-btn">
          <button onClick={handleGoBack} className="btn btn-primary app-button-hover-effect">Log Out</button>
          <div>User: {studentName}</div>
        </div>
        <div>
          <h1 className=' app-header-main-page app-header'>IATD Student Expense Tracker</h1>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-flex-container">
          <div className="dashboard-item">
            <fieldset className="action-container card">
              <div className="app-buttons text-center">
                <div class='balance-expense-header'>
                  Balance: ${studentBalance.toFixed(2)}
                </div>
                <button className="btn btn-primary app-button-hover-effect" onClick={toggleMoneyModal}>
                  <span className="visually-hidden">+ Add Money</span>
                </button>
              </div>
              <Modal
                isOpen={isMoneyModalOpen}
                onRequestClose={toggleMoneyModal}
                contentLabel="Add Money"
                className="modal"
                overlayClassName="modal-overlay"
              >
                <fieldset className="modal-container">
                  <legend className="modal-title">Add Money</legend>
                  <div className="modal-body">
                    <form className="form-border">
                      <label htmlFor="amount">Amount: $ </label>
                      <input
                        type="text"
                        id="amount"
                        name="amount"
                        className="form-control"
                      />
                      <div className="app-buttons text-center">
                      <button className="btn btn-primary app-button-hover-effect" onClick={toggleMoneyModal}>
                          <span className="visually-hidden">Add</span>
                        </button>
                        <button className="btn btn-primary app-button-hover-effect" onClick={toggleMoneyModal}>
                          <span className="visually-hidden">Cancel</span>
                        </button>
                      </div>
                    </form>
                  </div>

                </fieldset>
              </Modal>
            </fieldset>
          </div>
          <div className="dashboard-item"> <fieldset className="action-container card">
            <div className="app-buttons text-center">
              <div class='balance-expense-header'>
                Expense: ${totalExpenses.toFixed(2)}
              </div>
              <button className="btn btn-primary app-button-hover-effect" onClick={toggleAddExpenseModal}>
                <span className="visually-hidden">+ Add Expense</span>
              </button>
            </div>
            <Modal
              isOpen={isAddExpenseModalOpen}
              onRequestClose={toggleAddExpenseModal}
              contentLabel="Add Money"
              className="modal"
              overlayClassName="modal-overlay"
            >
              <fieldset className="modal-container">
                <legend className="modal-title">Add Expense</legend>
                <div className="modal-body">
                  <form className="form-border">
                    <div className="wide-form">
                      <label htmlFor="amount">Amount: $ </label>
                      <input type="text" id="amount" name="amount" className="form-control" />
                      <label htmlFor="title"> Title: </label>
                      <input type="text" id="title" name="title" className="form-control" />
                      <label htmlFor="category">Category: </label>
                      <select id="category" name="category" className="form-control">
                        <option value="">Select a category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Books">Books</option>
                        <option value="Transport">Transport</option>
                      </select>
                      <label htmlFor="date" >Date: </label>
                      <input type="date" id="date" name="date" className="form-control" />
                    <div className="app-buttons">
                      <button type="button" className="btn btn-primary app-button-hover-effect" onClick={toggleAddExpenseModal}>
                        Add
                      </button>
                      <button type="button" className="btn btn-secondary app-button-hover-effect" onClick={toggleAddExpenseModal}>
                        Cancel
                      </button></div>
                    </div>
                  </form>

                </div>

              </fieldset>

            </Modal>


          </fieldset>
          </div>
        </div>
        <div className="dashboard-flex-container">
          <div className="dashboard-item">
            <div className="dash-heading">
              Recent Transactions
            </div>
            <table className="expense-table">
          <thead>
            <tr>
              <th>Expense</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4).map((expense) => (
              <tr key={expense._id}>
                {/* <td>{expense.category_id}</td> */}
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                <div className="icons">
                    <a href="#"><FontAwesomeIcon icon={faInfoCircle} /></a>
                    <a href="#"><FontAwesomeIcon icon={faEdit} onClick={toggleEditExpenseModal} /></a>
                    <a href="#"><FontAwesomeIcon icon={faTrash} /></a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
           
            <Modal
              isOpen={isEditExpenseModalOpen}
              onRequestClose={toggleEditExpenseModal}
              contentLabel="Add Money"
              className="modal"
              overlayClassName="modal-overlay"
            >
              <fieldset className="modal-container card">
                <legend className="modal-title">Edit Expense</legend>
                <div className="modal-body">
                  <form className="form-border">
                    <div className="wide-form">
                      <label htmlFor="amount">Amount: $ </label>
                      <input type="text" id="amount" name="amount" className="form-control" />
                      <label htmlFor="title"> Title: </label>
                      <input type="text" id="title" name="title" className="form-control" />
                    </div>

                    <div className="wide-form">
                      <label htmlFor="category">Category: </label>
                      <select id="category" name="category" className="form-control">
                        <option value="">Select a category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Books">Books</option>
                        <option value="Transport">Transport</option>
                      </select>
                      <label htmlFor="date"> Date: </label>
                      <input type="date" id="date" name="date" className="form-control" />
                    </div>

                    <div className="app-buttons text-center">
                      <button type="button" className="btn btn-primary app-button-hover-effect" onClick={toggleEditExpenseModal}>
                        Update
                      </button>
                      <button type="button" className="btn btn-secondary app-button-hover-effect" onClick={toggleEditExpenseModal}>
                        Cancel
                      </button>
                    </div>
                  </form>

                </div>

              </fieldset>

            </Modal>
          </div>
          <div className="dashboard-item"><div className="chart-container" style={{ height: '400px' }}>
            <div className="dash-heading">
              Top Expenses
            </div>
            <BarChart width={500} height={250} data={expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4)}>
              <XAxis dataKey="description"   />
              <YAxis tickFormatter={(value) => `$${value}`}  />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" label={({ value }) => `$${value}`} />
            </BarChart>
          </div></div>
        </div>
      </div>
    </div>

  );
}

export default MainPage;