import axios from 'axios';
import {TaskList } from '../interface';

const API_URL = 'http://localhost:5001/api';


export const fetchTaskLists = async (): Promise<TaskList[]> => {
    const response = await axios.get(`${API_URL}/taskList`);
    return response.data;
};

export const fetchTaskList = async (id: string): Promise<TaskList> => {
    const response = await axios.get(`${API_URL}/taskList/${id}`);
    return response.data;
};

export const createTaskList = async (taskList: Partial<TaskList>): Promise<TaskList> => {
    const response = await axios.post(`${API_URL}/taskList`, taskList);
    return response.data;
};

export const updateTaskList = async (id: string, taskList: Partial<TaskList>): Promise<TaskList> => {
    const response = await axios.put(`${API_URL}/taskList/${id}`, taskList);
    return response.data;
};

export const deleteTaskList = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/taskList/${id}`);
};
