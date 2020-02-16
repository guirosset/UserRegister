import { Grupo } from '../group/group.model';

export class Usuario {

    id: number;
    nome: string;
    login: string;
    senha: string;
    email: string;
    ativo: boolean = true;
    grupo: string;
    grupos: Grupo[];
}