import {Category} from "@/interface";
import axios from "axios";

const API_URL = 'http://localhost:5001/api';

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get(`${API_URL}/category`);
    return response.data;
};

export const fetchCategory = async (id: string): Promise<Category> => {
    const response = await axios.get(`${API_URL}/category/${id}`);
    return response.data;
};

export const createCategory = async (category: Partial<Category>): Promise<Category> => {
    const response = await axios.post(`${API_URL}/category`, category);
    return response.data;
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
    const response = await axios.put(`${API_URL}/category/${id}`, category);
    return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/category/${id}`);
};
