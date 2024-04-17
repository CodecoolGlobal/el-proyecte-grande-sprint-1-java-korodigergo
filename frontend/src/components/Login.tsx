import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [name, setUsername] = useState('');
  const [password, setUserPassword] = useState('');
  const [userId, setUserId] = useState(-1);
  console.log("1. " + userId);
  const navigate = useNavigate();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('userId')!);
    if (id > 0) {
      setUserId(id);
      console.log("2. " + userId);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = {
      name,
      password
    };

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("1." + response);
      
      if (response.ok) {
        const responseUser = await response.json();
        console.log( JSON.stringify(responseUser))
        localStorage.setItem('userId', JSON.stringify(responseUser.userID));
        setUserId(responseUser.userID);
        console.log("3." + userId);
        

        
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserId(-1);
    localStorage.clear();
  }

  return userId != -1  ? (
    <form className="form" onSubmit={(e) => handleLogout(e)}>
      <h4>You are logged in! </h4>
      <button type="submit" className="btn">
        Log out
      </button>
    </form>
  ) : (
    <div className="root-layout">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h4>Login: </h4>
        <div className="form-row">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
            value={name}
            placeholder="Username"
            autoComplete="username"
            required
          />
        </div>
        <div className="form-row">
        <label htmlFor="userName" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={password}
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <p>
        Not a member?
        <Link to="/register" className="member-btn">
          Register
        </Link>
      </p>
      </form>
    </div>
  );
}
