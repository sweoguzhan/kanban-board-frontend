import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Board as BoardType } from '../interface/index';
import { createBoard, fetchBoards } from '../utils/boardService';
import Spinner from '../components/Spinner';
import CreateBoardModal from '../components/CreateBoardModal';
import { toast } from 'react-toastify';

const HomePage: React.FC = () => {
    const [boards, setBoards] = useState<BoardType[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const boardsData = await fetchBoards();
            setBoards(boardsData);
            setLoading(false);
        }
        fetchData();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateBoard = async (name: string) => {
        try {
            await createBoard(name);
            const updatedBoards = await fetchBoards();
            toast.success('Board created successfully!');
            setBoards(updatedBoards);
        } catch (error) {
            toast.error('An error occurred while creating the board!');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center bg-black pt-6 p-4 min-h-screen">
            <CreateBoardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateBoard}
            />
            {boards.map(board => (
                <div
                    key={board._id.toString()}
                    onClick={() => router.push(`/board/${board._id}`)}
                    className="cursor-pointer bg-gray-800 p-6 rounded-lg  text-white h-fit mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                    <h2 className=" cursor-pointer font-bold text-xl">{board.name}</h2>
                </div>
            ))}
            {boards.length === 0 && (
                <div className="text-white text-center w-full mt-4">
                    No boards available. Create a new board to get started.
                </div>
            )}
            <button
                onClick={() => setIsModalOpen(true)}
                className=" mt-2 cursor-pointer bg-gray-800 p-6 rounded-lg  text-white h-fit mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
                <h2 className=" cursor-pointer font-bold text-xl">+</h2>
            </button>
        </div>
    );
};

export default HomePage;
