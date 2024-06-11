import React from 'react';
import { CardProps } from '../interface/index';
import { Draggable } from 'react-beautiful-dnd';

const Card: React.FC<CardProps & { index: number }> = ({ card, index }) => {
    return (
        <Draggable draggableId={card._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-6 mb-4 rounded-lg cursor-pointer"
                    style={{ backgroundColor: card.color,cursor: 'pointer'}}
                >
                    <h3 className="text-base leading-6 font-semibold text-white cursor-pointer">{card.title}</h3>
                    <ul>
                        {card.taskLists.map(task => (
                            <li className="text-sm font-normal text-white" key={task._id}>{task.description}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Draggable>
    );
};

export default Card;
