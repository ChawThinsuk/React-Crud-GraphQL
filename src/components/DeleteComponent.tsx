// src/components/DeleteItemComponent.tsx
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from '../GraphQL/Queries'; // Assuming you have this query defined
import { DELETE_ITEM } from '../GraphQL/Mutations';
import { Item } from '../types/Item';

const DeleteItemComponent: React.FC = () => {
    const { loading, error, data } = useQuery<{ getAllItems: Item[] }>(GET_ALL_ITEMS);
    const [deleteItem] = useMutation<{ deleteItem: Item }, { id: number }>(DELETE_ITEM, {
        onCompleted: (data) => {
            console.log('Item deleted:', data.deleteItem);
            alert(`Item "${data.deleteItem.name}" deleted successfully!`);
        },
        onError: (error) => {
            console.error('Error deleting item:', error);
            alert('Error deleting item. Please try again.');
        },
    });

    const [itemId, setItemId] = useState<string>('');

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        deleteItem({
            variables: {
                id: parseInt(itemId, 10),
            },
            refetchQueries: [{ query: GET_ALL_ITEMS }],
        });
        setItemId('');
    };

    return (
        <div>
            <h1>Delete Item by ID</h1>
            <form onSubmit={handleDelete}>
                <input
                    type="number"
                    placeholder="Enter item ID to delete"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    required
                />
                <button type="submit">Delete Item</button>
            </form>

            {loading && <p>Loading items...</p>}
            {error && <p>Error loading items: {error.message}</p>}
            {data && (
                <ul>
                    {data.getAllItems.map((item) => (
                        <li key={item.id}>
                            Item-Name: {item.name} (ID: {item.id})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DeleteItemComponent;
