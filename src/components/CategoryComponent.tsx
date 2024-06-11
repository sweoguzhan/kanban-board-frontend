import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Category } from '../interface/index';
import { NewCardData } from '../interface/index';

import Card from './Card';
import CreateCardModal  from './CreateCardModal';

interface CategoryProps {
    category: Category;
}

const CategoryComponent: React.FC<CategoryProps> = ({ category }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSave = (formData: NewCardData) => {
       window.location.reload();
    };

    return (
        <div className="cursor-pointer bg-[#262626] rounded-lg text-white">
            <Droppable droppableId={category._id.toString()}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="cursor-pointer p-6 h-fit rounded-lg text-white max-w-[368px] min-w-[368px] rounded-2xl"
                    >
                        <div className="flex flex-row justify-between">
                            <h3 className="text-white text-4xl font-bold leading-10">{category.name}</h3>
                            <div
                                className="bg-black px-2 cursor-pointer rounded justify-center items-center flex "
                                onClick={handleModalOpen}
                            >
                                <h3 className="cursor-pointer text-white text-2xl font-bold leading-10">+</h3>
                            </div>
                        </div>

                        {category.cards.map((card, index) => (
                            <Draggable key={card._id.toString()} draggableId={card._id.toString()} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mt-4"
                                    >
                                        <Card card={card} index={index} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <CreateCardModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleSave}
                categoryId={category._id}
            />
        </div>
    );
};

export default CategoryComponent;
