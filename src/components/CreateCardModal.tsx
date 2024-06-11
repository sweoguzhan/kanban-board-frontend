import React, { useEffect } from 'react';
import { TaskList } from '../interface/index';
import InputColor from 'react-input-color';
import { createCard } from '../utils/cardService';
import { toast } from 'react-toastify';
import {ModalProps} from "@/interface/index";
import {NewCardData} from "@/interface/index";



const CreateCardModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, categoryId }) => {
    const [formData, setFormData] = React.useState<NewCardData>({
        categoryId: '',
        color: '#00A88B',
        title: '',
        taskLists: [],
    });
    useEffect(() => {
        if (isOpen) {
            setFormData({
                categoryId: categoryId || '',
                color: formData.color || '#5e72e4',
                title: '',
                taskLists: [],
            });
        }
    }, [isOpen, categoryId]);
    if (!isOpen) return null;
    const handleSave = async () => {
        try {
            await createCard(formData);
            toast.success('Card added succesfully!');
            onSave(formData);
            onClose();
        } catch (error) {
            toast.error('An error eccured while creating the card!');
            console.error("Error creating card:", error);
        }
    };
    const handleTaskListChange = (index: number, name: keyof TaskList, value: string) => {
        const updatedTaskLists = [...formData.taskLists];
        const taskListToUpdate = updatedTaskLists[index];

        if (taskListToUpdate && name in taskListToUpdate) {
            taskListToUpdate[name] = value;
            setFormData({ ...formData, taskLists: updatedTaskLists });
        }
    };
    const addTaskList = () => {
        setFormData({ ...formData, taskLists: [...formData.taskLists, { description: ''}] });
    };
    const removeTaskList = (index: number) => {
        const updatedTaskLists = [...formData.taskLists];
        updatedTaskLists.splice(index, 1);
        setFormData({ ...formData, taskLists: updatedTaskLists });
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-4">
                <h2 className="text-2xl mb-4">Create Card</h2>

                <div className="flex flex-col gap-2">
                    <label className="text-black">Enter the card title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="border p-2 w-full mb-4 text-black"
                        placeholder="Card Title"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-black ">Choose the card color</label>
                    <InputColor
                        initialValue="#5e72e4"
                        onChange={(color) => setFormData({ ...formData, color: color.hex })}
                        placement="right"
                    />
                </div>
                {formData.taskLists.map((taskList, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                        <input
                            type="text"
                            value={taskList.description}
                            onChange={(e) => handleTaskListChange(index, 'description', e.target.value)}
                            className="border p-2 w-full text-black"
                            placeholder="Task List Description"
                        />
                        <button
                            type="button"
                            onClick={() => removeTaskList(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addTaskList}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                    Add Task List
                </button>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CreateCardModal;
