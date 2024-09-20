
interface RefeicoesProps{
     horario: string;
     nome: string;
     alimentos: string[];
     calorias: number;
}

export interface Data{
     nome: string;
     sexo: string;
     idade: number;
     altura: number;
     peso: number;
     objetivo: number;
     refeicoes: RefeicoesProps[];
     suplementos: string[];

}