import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_ITEMS, GET_CATEGORY_SUBLEVEL1_WITH_SUB2 } from '../GraphQL/Queries';
import { CREATE_ITEM } from '../GraphQL/Mutations';

const CreateItemComponent = () => {
    const { loading, error, data } = useQuery(GET_CATEGORY_SUBLEVEL1_WITH_SUB2);
    const { loading: loadingItems, error: itemError, data: itemData } = useQuery(GET_ALL_ITEMS); 

    const [createItem] = useMutation(CREATE_ITEM, {
      onCompleted: (data) => {
        alert(`Item "${data.createItem}" created successfully!`);
        console.log('Item created:', data.createItem);
      },
      onError: (error) => {
        alert(`Error creating item: ${error}`);
        console.error('Error creating item:', error);
      },
    });
  
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [itemImg, setItemImg] = useState('');
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [costPrice, setCostPrice] = useState(0);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // ตรวจสอบว่าหมวดหมู่ที่เลือกมีค่าไหม
      if (categoryId === null) {
        alert("Please select a category ID.");
        return;
      }
      const itemExists = itemData?.getAllItems.some((item: { name: string }) => item.name === name);
      if (itemExists) {
          alert("An item with this name already exists. Please choose a different name.");
          return;
      }
  
      createItem({
        variables: {
          input: {
            name,
            categoryId,
            itemImg,
            desc,
            amount,
            price,
            costPrice,
          },
        },
      });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // ตรวจสอบว่า file มีค่าและเป็นไฟล์ตัวแรก
    
      if (file) {
        const fileSize = file.size / 1024 / 1024; // แปลงขนาดเป็น MB
        const fileType = file.type;
    
        if (fileSize > 10) {
          alert('File size exceeds 10 MB');
          e.target.value = ''; // ล้างค่า input
          return;
        }
    
        if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
          alert('Only PNG and JPEG formats are allowed');
          e.target.value = ''; // ล้างค่า input
          return;
        }
        const mockCdnUrl = `https://mockcdn.com/${file.name}`;       
        setItemImg(mockCdnUrl.toString());

      }
    };

  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
  <h1>Create New Item</h1>
  <form onSubmit={handleSubmit}>
    <input 
      type="text" 
      placeholder="Item Name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      required
      style={{ marginBottom: '10px' }}
    />

    <select 
      onChange={(e) => setCategoryId(Number(e.target.value))} 
      required
      style={{ marginBottom: '10px' }}
    >
      <option value="">Select a category</option>
      {loading && <option value="">Loading...</option>}
      {error && <option value="">Error loading categories</option>}
      {data && data.getAllCategories.map((category: { id: number; name: string }) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>

    <input 
      type="file"
      accept=".png,.jpeg"
      onChange={handleImageUpload} // we'll handle the image validation here
      required
      style={{ marginBottom: '10px' }}
    />

    <input 
      type="text" 
      placeholder="Description" 
      value={desc} 
      onChange={(e) => setDesc(e.target.value)} 
      style={{ marginBottom: '10px' }}
    />

<input 
  type="number" 
  placeholder="Amount" 
  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} 
  min="0"
  required
  style={{ marginBottom: '10px' }}
/>

<input 
  type="number" 
  placeholder="Price" 
  onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))} 
  min="0"
  required
  style={{ marginBottom: '10px' }}
/>

<input 
  type="number" 
  placeholder="Cost Price" 
  onChange={(e) => setCostPrice(Math.max(0, Number(e.target.value)))} 
  min="0"
  required
  style={{ marginBottom: '10px' }}
/>


    <button type="submit">Create Item</button>
  </form>
</div>

    );
  };
  
  export default CreateItemComponent;
