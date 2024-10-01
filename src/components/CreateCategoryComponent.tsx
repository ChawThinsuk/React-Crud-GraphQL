import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY_SUBLEVEL1 } from '../GraphQL/Mutations';

const CreateCategoryComponent: React.FC = () => {
    const [createCategorySublevel1] = useMutation(CREATE_CATEGORY_SUBLEVEL1, {
        onCompleted: (data) => {
            console.log('Category created:', data.createCategorySublevel1);
            alert(`Category "${data.createCategorySublevel1.name}" created successfully!`);
            resetForm();
        },
        onError: (error) => {
            console.error('Error creating category:', error);
            alert(`Error creating category.${error} Please try again.`);
        },
    });

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [categorySublevel2, setCategorySublevel2] = useState<{ name: string; desc: string }[]>([
        { name: '', desc: '' },
    ]);

    const handleSubcategoryChange = (
        index: number,
        field: keyof typeof categorySublevel2[number],
        value: string
    ) => {
        const updatedSubcategories = [...categorySublevel2];
        updatedSubcategories[index][field] = value || ''; 
        setCategorySublevel2(updatedSubcategories);
    };

    const addSubcategory = () => {
        setCategorySublevel2([...categorySublevel2, { name: '', desc: '' }]);
    };

    const resetForm = () => {
        setName('');
        setDesc('');
        setCategorySublevel2([{ name: '', desc: '' }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Category name is required.");
            return;
        }

        const validSubcategories = categorySublevel2.filter(sub => sub.name.trim() || sub.desc.trim());

        createCategorySublevel1({
            variables: {
                input: {
                    name,
                    desc,
                    categorySublevel2: validSubcategories.length > 0 ? validSubcategories : [], 
                },
            },
        });
    };

    return (
        <div>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 style={{ marginRight: '10px' }}>Subcategories</h2>
                    <button type="button" onClick={addSubcategory}>
                        Add Subcategory
                    </button>
                </div>
                
                {categorySublevel2.map((subcategory, index) => (
                    <div key={index} style={{ marginBottom: '10px'}}>
                        <input
                            type="text"
                            placeholder="Subcategory Name"
                            value={subcategory.name}
                            onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <input
                            type="text"
                            placeholder="Subcategory Description"
                            value={subcategory.desc}
                            onChange={(e) => handleSubcategoryChange(index, 'desc', e.target.value)}
                        />
                    </div>
                ))}
                <button type="submit" style={{marginTop: '10px'}}>Create Category</button>
            </form>
        </div>
    );
};


export default CreateCategoryComponent;
