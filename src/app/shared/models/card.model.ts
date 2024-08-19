export interface CardModel {
    id?: string;
    titulo: string;
    conteudo: string;
    lista?: CardStatus;
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

export type CardStatus = 'ToDo' | 'Doing' | 'Done';
