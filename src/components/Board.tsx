import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { Board as BoardType } from '../interface/index';

const Board: React.FC<{ board: BoardType }> = ({ board }) => {
    return (
        <Droppable droppableId={board._id} type="board">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-2xl max-w-[368px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] h-fit bg-[#262626] p-6 items-center justify-center w-full"
                >
                    <h2 className="font-bold text-4xl mb-4 text-white">{board.name}</h2>
                    {
                        board.cards.map((card, index) => (
                            <Draggable key={card._id} draggableId={card._id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}

                                    >
                                        <Card card={card} index={index} />
                                    </div>
                                )}
                            </Draggable>
                        ))
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Board;
