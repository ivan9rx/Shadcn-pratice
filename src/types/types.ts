export interface CursoItem {
    id: number;
    nome: string;
    faculdade: string;
    notaDeCorte: number;
    ano: number;
    descricao: string | null;
}

export interface CursoResponse {
    erro: boolean;
    data: CursoItem[];
}

export interface UserItem {
    id: number;
    nome: string;
    email: string;
    senha: string;
    nivelacesso: string;
}

export interface UserResponse {
    erro?: string; // ou qualquer campo que indica erro
    data?: UserItem; // ou data: UserItem[] se a resposta for uma lista
}