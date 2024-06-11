import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import CategoryComponent from '../../components/CategoryComponent';
import Spinner from '../../components/Spinner'; // Spinner import
import { Board as BoardType } from '../../interface/index';
import { fetchBoard } from '../../utils/boardService';
import { updateCard } from '../../utils/cardService';

const BoardPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [board, setBoard] = useState<BoardType | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const boardData = await fetchBoard(id as string);
                setBoard(boardData);
            }
        }
        fetchData();
    }, [id]);

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        if (!board) return;
        const sourceCategory = board.categories.find(category => category._id === source.droppableId);
        const destinationCategory = board.categories.find(category => category._id === destination.droppableId);
        if (!sourceCategory || !destinationCategory) {
            console.error('Source or destination category not found');
            return;
        }
        const draggedCard = sourceCategory.cards.find(card => card._id === draggableId);
        if (!draggedCard) {
            console.error('Dragged card not found');
            return;
        }
        sourceCategory.cards.splice(source.index, 1);
        destinationCategory.cards.splice(destination.index, 0, draggedCard);
        setBoard({ ...board });
        try {
            await updateCard(draggedCard._id, { categoryId: destinationCategory._id });
        } catch (error) {
            console.error('Failed to update card categoryId:', error);
        }
    };

    if (!board) return (
        <div className="flex justify-center items-center h-screen bg-black">
            <Spinner /> {/* Spinner component */}
        </div>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h3 className="text-5xl font-bold text-white bg-black p-4  flex">{board.name}</h3>

            <div className="flex flex-wrap justify-center items-start pt-6 bg-black gap-5"
                 style={{minHeight: 'calc(100vh - 70px)'}}>
                {board.categories.map(category => (
                    <CategoryComponent key={category._id.toString()} category={category}/>
                ))}
            </div>
        </DragDropContext>
    );
};

export default BoardPage;
