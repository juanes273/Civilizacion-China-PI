import { useState, useEffect } from 'react';
import axios from 'axios';
import Experience from './Experience';

export default function ModelViewer(props) {
  const [model, setModel] = useState(null);

  const instance = axios.create({
    baseURL: 'https://civilizacion-china-pi.vercel.app/'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('/api/users', { email, password });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

