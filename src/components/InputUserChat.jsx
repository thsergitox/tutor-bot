/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const InputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '49%',
    padding: '1rem',
    margin:'0',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    position: 'fixed',
    bottom: '0',
    gap: '1rem',
    alignSelf: 'flex-end',
    borderRadius: '10px',
});


const InputUserChat = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const [user, setUser] = useState({})

  const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        }
        setUser(user)
    }, [navigate]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setNewMessage('');
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/v1/bot/ask`, {
           question: newMessage,
           name: user.name
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            console.log('Respuesta recibida:', response.data);
            onSendMessage({type:'user', text: newMessage}, {type:'bot', text: response.data.res})
        } else {
            onSendMessage({type:'user', text: newMessage})
            console.error('Error al crear el quiz');
        }
    } catch (error) {
        console.error('Error:', error);
    }
      
    }
  };

  return (
    <InputContainer>
      <TextField 
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe tu mensaje..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Enviar
      </Button>
    </InputContainer>
  );
};

export default InputUserChat;
