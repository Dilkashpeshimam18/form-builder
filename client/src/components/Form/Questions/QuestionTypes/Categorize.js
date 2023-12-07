import React, { useState, useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux'
import { questionActions } from '../../../../store/slice/question';
import { Button } from '@mui/material';

const ItemType = 'CATEGORY';
const ItemsType = 'ITEM';

const DraggableCategory = ({ category, index, moveCategory, updateCategory, placeholder, removeCategory }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCategory(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ marginBottom: '4px' }}>
      <input
        type="text"
        value={category}
        placeholder={`Category ${index + 1}`}
        onChange={(e) => updateCategory(index, e.target.value)}
        style={{ padding: '8px', border: '1px solid #ddd', width: '200px', cursor: 'grabbing' }}
      />
      <CloseIcon sx={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => removeCategory(index)} />

    </div>
  );
};



const DraggableInput = ({ index, value, updateValue, moveInput }) => {

  const [, ref] = useDrag({
    type: ItemsType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemsType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveInput(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drop(node)} style={{ marginBottom: '10px' }}>
      <input
        type="text"
        placeholder={`Item ${index + 1}`}
        value={value}
        onChange={(e) => updateValue(index, e.target.value)}
        style={{ marginLeft: '8px', padding: '8px', border: '1px solid #ddd', margin: '10px', width: '200px', cursor: 'grabbing' }}
        ref={ref}
      />
    </div>
  );
};


const Categorize = () => {

  const [categories, setCategories] = useState(['', '']);
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategory1, setSelectedCategory1] = useState('');
  const [image, setImage] = useState(null)

  const [imagePreview, setImagePreview] = useState(null);

  const [items, setItems] = useState(['', '']);
  const [itemDetail, setItemDetail] = useState([])
  const dispatch = useDispatch()

  const moveInput = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const updateValue = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  const moveCategory = (fromIndex, toIndex) => {
    const updatedCategories = [...categories];
    const [movedCategory] = updatedCategories.splice(fromIndex, 1);
    updatedCategories.splice(toIndex, 0, movedCategory);
    setCategories(updatedCategories);
  };

  const updateCategory = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = value;
    setCategories(updatedCategories);
  };

  const removeCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories)
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImage(e.target.files[0]);
    console.log(file)

  };
 
  const addCategory = () => {
    if (categories.length < 2) {
      setCategories([...categories, '']);
    }
  };


  const addItem = () => {

    if (selectedCategory && selectedCategory1 && items.length < 10) {
      const newItem1 = { category: selectedCategory, value: items[0] };
      const newItem2 = { category: selectedCategory1, value: items[1] };

      setItemDetail((prevItems) => [...prevItems, newItem1, newItem2]);

    }
  };

  const saveQuestion = () => {
    const newQuestion = {
      type: 'categorize',
      text: description,
      image: image,
      categoryData: {
        categories: [...categories],
        items: [...items],
        itemDetail: [{ category: selectedCategory, value: items[0] }, { category: selectedCategory1, value: items[1] }]
      },
    };

    dispatch(questionActions.handleAddQuestion(newQuestion));

    setItems([]);
    setItemDetail([])
    setSelectedCategory('');
    setSelectedCategory1('');
  }

  return (
    <div className='flex flex-col mt-5'>

      <div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="description-categorize"
                id="description-categorize"
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Add description (optional)'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Upload Image
            </label>
            <div className="  mt-2 flex justify-center rounded-lg border block w-full border-dashed border-gray-900/25 px-6 py-10  ">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a image</span>
                    <input
                    value={image}
                    className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div>
        <div>
          <h3>Categories</h3>

        </div>
        <div>
          <DndProvider backend={HTML5Backend}>
            <div>
              {categories.map((category, index) => {

                return (
                  <>
                    <DraggableCategory
                      key={index}
                      index={index}
                      category={category}
                      moveCategory={moveCategory}
                      updateCategory={updateCategory}
                      removeCategory={removeCategory}

                    />

                  </>
                )

              })}
              <button onClick={addCategory}>
                Add Category
              </button>

              <div style={{ marginTop: '20px' }}>
                <div className='flex justify-between w-80'>
                  <span>Add Items</span>
                  <span>Belong To</span>
                </div>

                <div className='flex'>
                  <div className='flex flex-col'>

                    {items.map((value, index) => (
                      <DraggableInput key={index} index={index} value={value} updateValue={updateValue} moveInput={moveInput} />
                    ))}
                    <button onClick={addItem}>Add Item</button>

                  </div>

                  <div className='flex flex-col'>
                    <select style={{ marginLeft: '8px', padding: '8px', border: '1px solid #ddd', width: '200px', margin: '10px' }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                      <option value="">Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <select style={{ marginLeft: '8px', padding: '8px', border: '1px solid #ddd', width: '200px', margin: '10px' }} value={selectedCategory1} onChange={(e) => setSelectedCategory1(e.target.value)}>
                      <option value="">Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>


                </div>

              </div>
              <Button onClick={saveQuestion}>Save Question</Button>
            </div>
          </DndProvider>
        </div>
      </div>


    </div>
  )
}

export default Categorize