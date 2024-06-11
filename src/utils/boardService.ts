import {Board} from "@/interface";
import axios from "axios";

const API_URL = 'http://localhost:5001/api';

export const fetchBoards = async (): Promise<Board[]> => {
    const response = await axios.get(`${API_URL}/board`);
    return response.data;
};

export const fetchBoard = async (id: string): Promise<Board> => {
    const response = await axios.get(`${API_URL}/board/${id}`);
    return response.data;
};


export const createBoard = async (name: string) => {
    const response = await axios.post(`${API_URL}/board`, {name});
    return response.data;
};


export const updateBoard = async (id: string, card: Partial<Board>): Promise<Board> => {
    const response = await axios.put(`${API_URL}/board/${id}`, card);
    return response.data;
};

export const deleteBoard = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/board/${id}`);
};
