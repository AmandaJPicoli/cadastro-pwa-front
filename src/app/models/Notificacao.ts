import { Seguro } from "./Seguro";

export  class Notificacao {
    id!: string;
    seguro_id: Seguro | undefined;
}