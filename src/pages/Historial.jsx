import styled from 'styled-components';
import CardHistotial from '../components/CardHistotial';
import Navbar from '../components/NavbarEbooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContainerCustom = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    width: '100vw',
    backgroundColor: 'var(--secondary-color)',
    paddingTop: '5rem',
    margin: '0',
});

const HistorialContent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: 'var(--secondary-color)',
    padding: '5rem',
    margin: '0',
    gap: '20px',
});

const GridContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    width: '80%',
});

const Historial = () => {
    const [questionnaires, setQuestionaries] = useState([]);

    const [user, setUser] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        }
        setUser(user)
    }, [navigate]);

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/v1/questionnaires/all/${user.user_id}`);

                if (response.status === 200) {
                    setQuestionaries(response.data.questionnaires);
                } else {
                    console.error('Error al obtener los cuestionarios');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchQuestionnaires();
    }, [user.user_id]);

    return (
        <ContainerCustom>
            <HistorialContent>
                <Navbar page='Regresar' route='/principalmenu' />
                <h2>Exámenes recientes</h2>
                <GridContainer>
                    {questionnaires.map((questionnaire) => (
                        <CardHistotial key={questionnaire.id} topic={questionnaire.title} score={questionnaire.score} questionarie_id={questionnaire.id}/>
                    ))}
                </GridContainer>
            </HistorialContent>
        </ContainerCustom>
    );
};

export default Historial;
