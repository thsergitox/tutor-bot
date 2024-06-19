import  { useState } from 'react';
import styled from 'styled-components';
import imageChatbot from '../assets/images/chatbotImage.png';
import Navbar from '../components/NavbarEbooks';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';




const ContainerPrincipal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: 'var(--secondary-color)',
    padding: '0',
    margin: '0',
});

const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    width: '50%',
    height: '70%',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    backgroundColor: '#fff',
    marginRight: '2rem',
});

const Input = styled('input')({
    margin: '10px 0',
    padding: '15px',
    width: '60%',
    borderRadius: '5px',
    border: '1px solid #ccc',
});

const Button = styled('button')({
    padding: '10px 20px',
    marginTop: '20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'var(--primary-color)',
    color: '#fff',
    cursor: 'pointer',
    width: '30%',
});
const LogoDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box'
  //  backgroundColor: 'var(--secondary-color)',
  })
  const Image = styled('img')({
    height: '40vmin',
    pointerEvents: 'visibleFill',
  })

const Login = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/user?username=${userName}&password=${password}&email=${email}`);

            if (response.status === 200) {
                navigate('/principalmenu');
            } else {
                console.log('IDK')
                
            }
        } catch (error) {
            setStatus('Contraseña, usario o email incorrecto')
            console.error('Error:', error);
        }
    };

    return (
        <ContainerPrincipal>
            <LogoDiv>
            <Navbar page='Regresar' route='/'/>
                  <Image src={imageChatbot} alt='logo tutor bot'/>
                  <Typography variant='h3' sx={{fontFamily: 'Lily Script One'}}>Tutor Bot</Typography>
            </LogoDiv>
            <Form onSubmit={handleSubmit}>
                <h1>Inicio de sesión</h1>
                <Input
                    type="text"
                    placeholder="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p style={{color: 'red'}}> {status} </p>
                <Button type="submit">Iniciar sesión</Button>
                
                
            </Form>
        </ContainerPrincipal>
    );
};

export default Login;
