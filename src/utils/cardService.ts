import {Card} from "@/interface";
import axios from "axios";
import {NewCardData} from "@/interface";
const API_URL = 'http://localhost:5001/api';

export const fetchCards = async (): Promise<Card[]> => {
    const response = await axios.get(`${API_URL}/card`);
    return response.data;
};

export const fetchCard = async (id: string): Promise<Card> => {
    const response = await axios.get(`${API_URL}/card/${id}`);
    return response.data;
};

export const createCard = async (card: NewCardData): Promise<Card> => {
    const response = await axios.post(`${API_URL}/card`, card);
    return response.data;
};

export const updateCard = async (id: string, card: Partial<Card>): Promise<Card> => {
    const response = await axios.put(`${API_URL}/card/${id}`, card);
    return response.data;
};

export const deleteCard = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/card/${id}`);
};
