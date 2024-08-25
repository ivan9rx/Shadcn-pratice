import { useState, useEffect } from 'react';
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
import { CursoItem, CursoResponse } from "../types/types";
import CreateCursoDialog from './actions/CreateCursoDialog';

// Função para buscar dados
async function fetchData(): Promise<CursoItem[]> {
    try {
        const response = await axios.get<CursoResponse>('http://localhost:9090/list-cursos');
        if (response.data.erro) {
            console.error('Erro na resposta da API:', response.data);
            return []; // Retorna uma lista vazia em caso de erro
        } else {
            return response.data.data; // Retorna os dados
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return []; // Retorna uma lista vazia em caso de erro
    }
}

// Função para deletar dados
async function deleteCurso(id: number): Promise<void> {
    try {
        await axios.delete(`http://localhost:9090/delete-curso/${id}`);
        // Atualiza a lista de cursos após a exclusão
        alert('Curso deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar curso:', error);
        alert('Erro ao deletar curso. Por favor, tente novamente.');
    }
}

const CursosComponent = () => {
    const [cursos, setCursos] = useState<CursoItem[]>([]);

    // Chama a função fetchData quando o componente é montado
    useEffect(() => {
        async function loadData() {
            const data = await fetchData();
            setCursos(data);
        }
        loadData();
    }, []);

    // Função para lidar com a exclusão
    const handleDelete = async (id: number) => {
        if (window.confirm('Você tem certeza que deseja deletar este curso?')) {
            await deleteCurso(id);
            // Atualiza a lista de cursos após a exclusão
            const updatedCursos = await fetchData();
            setCursos(updatedCursos);
        }
    };

    return (
        <div className='table-container'>
            <div className='table-wrapper'>
                <Table>
                    <TableHeader>
                        <CreateCursoDialog />
                    </TableHeader>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Curso</TableHead>
                            <TableHead>Faculdade</TableHead>
                            <TableHead>Ano</TableHead>
                            <TableHead>Nota de corte</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cursos.map((curso) => (
                            <TableRow key={curso.id}>
                                <TableCell className="font-medium">{curso.nome}</TableCell>
                                <TableCell>{curso.faculdade}</TableCell>
                                <TableCell>{curso.ano}</TableCell>
                                <TableCell>{curso.notaDeCorte}</TableCell>
                                <TableCell>
                                    <Button variant={'secondary'} className='mr-2'>Editar</Button>
                                    <Button
                                        variant={'destructive'}
                                        onClick={() => handleDelete(curso.id)}
                                    >
                                        Deletar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CursosComponent;
