import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importa useParams
import { UserItem, UserResponse } from '@/types/types';

const EditUserComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Pega o ID da URL
    const [user, setUser] = useState<UserItem | null>(null);

    // Função para buscar o usuário
    async function fetchUser(): Promise<UserItem | null> {
        if (!id) return null; // Verifica se o ID está disponível
        try {
            const response = await axios.get<UserResponse>(`http://localhost:9090/get-usuario/${id}`);
            if (response.data.erro) {
                console.error('Erro na resposta da API:', response.data.erro);
                return null; // Retorna null em caso de erro
            } else {
                return response.data.data ?? null; // Retorna os dados ou null se não houver dados
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return null; // Retorna null em caso de erro
        }
    }

    // Chama a função fetchUser quando o componente é montado ou o ID muda
    useEffect(() => {
        async function loadData() {
            const data = await fetchUser();
            console.log('Dados carregados:', data); // Adicione esta linha para depuração
            setUser(data);
        }
        loadData();
    }, [id]); // Dependência no ID para atualizar quando mudar

    return (
        <div>
            EditUserComponent com ID: {id}
            {user ? (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.nome}</p>
                    <p>Email: {user.email}</p>
                    {/* Renderize outros campos conforme necessário */}
                </div>
            ) : (
                <p>Carregando ou usuário não encontrado</p>
            )}
        </div>
    );
};

export default EditUserComponent;
