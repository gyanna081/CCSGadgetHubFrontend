import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('Good');
  const [image, setImage] = useState(null);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    if (!itemName || !description || !condition) {
      alert('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', itemName);
    formData.append('description', description);
    formData.append('condition', condition);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8080/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setItemName('');
      setDescription('');
      setCondition('Good');
      setImage(null);
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (item) => {
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('description', item.description);
    formData.append('condition', item.condition);
    formData.append('status', item.status);
    if (item.image) {
      formData.append('image', item.image);
    }

    try {
      await axios.put(`http://localhost:8080/api/items/${item.itemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditItemId(null);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (e, field, item) => {
    const updatedItems = items.map((i) =>
      i.itemId === item.itemId ? { ...i, [field]: e.target.value } : i
    );
    setItems(updatedItems);
  };

  const handleLogout = () => {
    // You can customize what happens here after logout
    localStorage.clear(); // example: clear tokens
    window.location.href = '/'; // redirect to login page or home
  };

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: '#e63946', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={{ padding: '8px', width: '120px' }}
        >
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
        <input
          type="file"
          onChange={handleImageChange}
          style={{ padding: '8px' }}
        />
        <button
          onClick={handleAddItem}
          style={{ backgroundColor: '#e76f51', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Add Item
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Description</th>
            <th style={{ padding: '10px' }}>Condition</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Image</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{item.itemId}</td>
              <td style={{ padding: '10px' }}>
                {editItemId === item.itemId ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleInputChange(e, 'name', item)}
                    style={{ padding: '5px', width: '100%' }}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td style={{ padding: '10px' }}>
                {editItemId === item.itemId ? (
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleInputChange(e, 'description', item)}
                    style={{ padding: '5px', width: '100%' }}
                  />
                ) : (
                  item.description
                )}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {editItemId === item.itemId ? (
                  <select
                    value={item.condition}
                    onChange={(e) => handleInputChange(e, 'condition', item)}
                    style={{ padding: '5px' }}
                  >
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                ) : (
                  item.condition
                )}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {editItemId === item.itemId ? (
                  <select
                    value={item.status}
                    onChange={(e) => handleInputChange(e, 'status', item)}
                    style={{ padding: '5px' }}
                  >
                    <option value="Available">Available</option>
                    <option value="Borrowed">Borrowed</option>
                  </select>
                ) : (
                  item.status
                )}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {item.imagePath ? (
                  <img
                    src={`http://localhost:8080/uploads/${item.imagePath}`}
                    alt="Item"
                    style={{ width: '50px', height: 'auto' }}
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {editItemId === item.itemId ? (
                  <>
                    <button onClick={() => handleUpdateItem(item)} style={{ marginRight: '5px', padding: '5px 10px' }}>Save</button>
                    <button onClick={() => setEditItemId(null)} style={{ padding: '5px 10px' }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditItemId(item.itemId)} style={{ marginRight: '5px', padding: '5px 10px' }}>Edit</button>
                    <button onClick={() => handleDeleteItem(item.itemId)} style={{ padding: '5px 10px' }}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
