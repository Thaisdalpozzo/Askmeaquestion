import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/conexao.png';
import logoImg from '../assets/images/illustra.png';
import googleIconImg from '../assets/images/google-icon.svg';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import '../styles/Auth.scss';
import userEvent from '@testing-library/user-event';
//import { AuthContext } from '../contexts/AuthContext';


export function NewRoom() {
    const { user } = useAuth();

    const [newRoom, setNewRoom] = useState('');

    const history = useHistory()
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,

        })

        history.push(`/rooms/${firebaseRoom.key}`)

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas." />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>

                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />

                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

