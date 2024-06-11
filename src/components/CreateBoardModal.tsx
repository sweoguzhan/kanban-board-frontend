import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
}

const CreateBoardModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = React.useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {

        onSave(name);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-4">
                <h2 className="text-2xl mb-4">Create Board</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full mb-4"
                    placeholder="Board Name"
                />
                <div className="flex justify-end space-x-4">
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

export default CreateBoardModal
