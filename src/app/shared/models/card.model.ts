export interface CardModel {
    id?: string;
    titulo: string;
    conteudo: string;
    lista?: 'ToDo' | 'Doing' | 'Done';
}

export interface CardGroup {
    ToDo: CardModel[];
    Doing: CardModel[];
    Done: CardModel[];
}

export interface CardsGroupedByStatus {
    ToDo: CardModel[];
    Doing: CardModel[];
    Done: CardModel[]
}