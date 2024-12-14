import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './App.css'
const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        navigate("/success");
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  return (
    <div style={{ padding: "2rem" }} className="container">
      <h1>Email Sender</h1>
      <form  onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input
            type="email"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={emailData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

const SuccessPage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Thank You!</h1>
    <p>Your email has been sent successfully.</p>
  </div>
);

const ErrorPage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Oops!</h1>
    <p>Something went wrong. Please try again later.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
