import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORY_SUBLEVEL1_WITH_SUB2, GET_ALL_ITEMS } from '../GraphQL/Queries';
import { UPDATE_ITEM } from '../GraphQL/Mutations';
import { Item } from '../types/Item';

const UpdateItemComponent: React.FC = () => {
    const { loading: loadingCategories, error: categoryError, data: categoryData } = useQuery(GET_CATEGORY_SUBLEVEL1_WITH_SUB2);
    const { loading: loadingItems, error: itemError, data: itemData } = useQuery<{ getAllItems: Item[] }>(GET_ALL_ITEMS);
    const [updateItem, { loading: updating }] = useMutation(UPDATE_ITEM, {
        onCompleted: (data) => {
            console.log('Item updated:', data.updateItem);
            alert(`Item "${data.updateItem.name}" updated successfully!`);
            resetForm();
        },
        onError: (error) => {
            console.error('Error updating item:', error);
            alert('Error updating item. Please try again.');
        },
    });

    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [itemImg, setItemImg] = useState('');
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState<number | ''>(0);
    const [price, setPrice] = useState<number | ''>(0);
    const [costPrice, setCostPrice] = useState<number | ''>(0);

    const resetForm = () => {
        setSelectedItemId(null);
        setName('');
        setCategoryId(null);
        setItemImg('');
        setDesc('');
        setAmount(0);
        setPrice(0);
        setCostPrice(0);
    };

    const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const itemId = Number(e.target.value);
        const selectedItem = itemData?.getAllItems.find((item: { id: number }) => item.id === itemId);
        
        if (selectedItem) {
            setSelectedItemId(itemId);
            setName(selectedItem.name);
            setCategoryId(selectedItem.categoryId);
            setItemImg(selectedItem.itemImg || '');
            setDesc(selectedItem.desc || '');
            setAmount(selectedItem.amount);
            setPrice(selectedItem.price);
            setCostPrice(selectedItem.costPrice);
        } else {
            resetForm();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedItemId === null) {
            alert("Please select an item to update.");
            return;
        }

        updateItem({
            variables: {
                id: selectedItemId,
                data: {
                    name,
                    categoryId,
                    itemImg,
                    desc,
                    amount: Number(amount),
                    price: Number(price),
                    costPrice: Number(costPrice),
                },
            },
        });
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        if (file) {
            const fileSize = file.size / 1024 / 1024; 
            const fileType = file.type;

            if (fileSize > 10) {
                alert('File size exceeds 10 MB');
                e.target.value = ''; 
                return;
            }

            if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
                alert('Only PNG and JPEG formats are allowed');
                e.target.value = ''; 
                return;
            }
            const mockCdnUrl = `https://mockcdn.com/${file.name}`;
            setItemImg(mockCdnUrl); 
        }
    };

    return (
<div>
    <h1>Update Item</h1>
    <select onChange={handleItemSelect} required>
        <option value="">Select an item to update</option>
        {loadingItems && <option value="">Loading items...</option>}
        {itemError && <option value="">Error loading items</option>}
        {itemData && itemData.getAllItems.map((item: { id: number; name: string }) => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        ))}
    </select>

    {selectedItemId && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' , marginTop: '20px'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ flex: '1', marginRight: '10px' }}>Item Name</label>
                <input 
                    type="text" 
                    placeholder="Enter item name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                    style={{ flex: '2' }}
                />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ flex: '1', marginRight: '10px' }}>Category</label>
                <select onChange={(e) => setCategoryId(Number(e.target.value))} required style={{ flex: '2' }}>
                    <option value="">Select a category</option>
                    {loadingCategories && <option value="">Loading categories...</option>}
                    {categoryError && <option value="">Error loading categories</option>}
                    {categoryData && categoryData.getAllCategories.map((category: { id: number; name: string }) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ flex: '1', marginRight: '10px' }}>Update Item Image</label>
                        <input 
                            type="file"
                            accept=".png,.jpeg"
                            onChange={handleImageUpload} 
                            required
                            style={{ flex: '2' }}
                        />
                    </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ flex: '1', marginRight: '10px' }}>Description</label>
                <input 
                    type="text" 
                    placeholder="Enter item description" 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                    style={{ flex: '2' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ flex: '1', marginRight: '10px' }}>Amount</label>
                <input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    style={{ flex: '2' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ flex: '1', marginRight: '10px' }}>Price</label>
                <input 
                    type="number" 
                    placeholder="Enter price" 
                    value={price} 
                    onChange={(e) => setPrice(Number(e.target.value))} 
                    style={{ flex: '2' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ flex: '1', marginRight: '10px' }}>Cost Price</label>
                <input 
                    type="number" 
                    placeholder="Enter cost price" 
                    value={costPrice} 
                    onChange={(e) => setCostPrice(Number(e.target.value))} 
                    style={{ flex: '2' }}
                />
            </div>

            <button type="submit" disabled={updating}>
                {updating ? 'Updating...' : 'Update Item'}
            </button>
        </form>
    )}
</div>


    );
};

export default UpdateItemComponent;
