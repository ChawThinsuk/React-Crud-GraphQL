import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from '../GraphQL/Queries';

interface Item {
  id: number;
  name: string;
  itemImg?: string; 
  desc?: string;
  amount: number;
  price: number;
  costPrice: number;
}

const GetAllItemComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [getItems, { loading, error }] = useLazyQuery<{ getAllItems: Item[] }>(GET_ALL_ITEMS, {
    onCompleted: (data) => {
      setItems(data.getAllItems);
    },
  });

  const handleFetchItems = () => {
    getItems();
  };

  return (
    <div>
      <button onClick={handleFetchItems} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch All Items'}
      </button>

      {error && <p>Error: {error.message}</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>imageUrl: {item.itemImg}</p>
            {item.desc && <p>description: {item.desc}</p>}
            <p>Amount: {item.amount}</p>
            <p>Price: {item.price}</p>
            <p>Cost Price: {item.costPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAllItemComponent;
