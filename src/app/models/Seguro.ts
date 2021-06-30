import { MarcaCarro } from "./MarcaCarro";

export  class Seguro {
    id!: string;
    marcaCarro: MarcaCarro | undefined;
    modeloCarro: string | undefined;
    placaCarro: string | undefined;
    nomeProprietario: string | undefined;
    sobrenomeProprietario: string | undefined; 
    dataNascimentoProprietario: string | undefined;
}