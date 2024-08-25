import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate do react-router-dom
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table";

import { Button } from './ui/button';
import axios from 'axios';
import { UserItem, UserResponse } from "../types/types";
import CreateUserDialog from './actions/CreateUserDialog';

// Função para buscar dados
async function fetchData(): Promise<UserItem[]> {
    try {
        const response = await axios.get<UserResponse>('http://localhost:9090/list-usuarios');
        if (response.data.erro) {
            console.error('Erro na resposta da API:', response.data);
            return [];
        } else {
            return Array.isArray(response.data.data) ? response.data.data : [];
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

// Função para deletar um usuário
async function deleteUser(userId: number, setUsers: React.Dispatch<React.SetStateAction<UserItem[]>>) {
    try {
        await axios.delete(`http://localhost:9090/delete-usuario/${userId}`);
        // Atualiza a lista de usuários removendo o usuário deletado
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
    }
}

const UsersComponent = () => {
    const [users, setUsers] = useState<UserItem[]>([]);
    const navigate = useNavigate(); // Inicializa o hook useNavigate

    // Chama a função fetchData quando o componente é montado
    useEffect(() => {
        async function loadData() {
            const data = await fetchData();
            console.log('Dados carregados:', data); // Adicione esta linha para depuração
            setUsers(data);
        }
        loadData();
    }, []);

    const handleEdit = (userId: number) => {
        navigate(`/edit-user/${userId}`); // Redireciona para a página de edição com o ID do usuário
    };

    return (
        <div className='table-container'>
            <div className='table-wrapper'>
                <Table>
                    <TableHeader><CreateUserDialog /></TableHeader>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead className="w-[100px]">Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Nivel de acesso</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">Nenhum usuário encontrado</TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell className="font-medium">{user.nome}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.nivelacesso}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant={'secondary'}
                                            className='mr-2'
                                            onClick={() => handleEdit(user.id)} // Adiciona a funcionalidade de edição
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant={'destructive'}
                                            onClick={() => deleteUser(user.id, setUsers)}
                                        >
                                            Deletar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default UsersComponent;
