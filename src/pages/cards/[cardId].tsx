import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from '../../interface';
import { fetchCard } from '../../utils/cardService';

const CardPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [card, setCard] = useState<Card | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const fetchedCard = await fetchCard(id as string);
                console.log(fetchedCard)
                setCard(fetchedCard);
            }
        };
        fetchData();
    }, [id]);

    if (!card) return <div>Loading...</div>;

    return (
        <div>
            <h2>{card.title}</h2>
            {card.taskLists.map(task => (
                <div key={task._id}>{task.description}</div>
            ))}
        </div>
    );
};

export default CardPage;
