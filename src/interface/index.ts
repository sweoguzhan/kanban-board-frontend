
export interface TaskList {
    description: string;
}

export interface Card {
    _id: string;
    categoryId: string;
    color: string;
    title: string;
    order: number;
    taskLists: TaskList[];
}

export interface Category {
    _id: string;
    name: string;
    cards: Card[];
}

export interface Board {
    _id: string;
    name: string;
    cards: Card[];
    categories: Category[];
}

export interface BoardProps {
    board: Board;
}

export interface CardProps {
    card: Card;
    index : number;
}
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: NewCardData) => void;
    categoryId?: string;
}

export interface NewCardData {
    categoryId: string;
    color: string;
    title: string;
    taskLists: TaskList[];
}
