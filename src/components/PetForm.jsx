import { useState } from 'react';

const PetForm = ({handleAddPet, selected, handleUpdatePet}) => {

    const initialState = {
        name: '',
        age: '',
        breed: ''
    }
    
    const [formData, setFormData] = useState(selected ? selected : initialState)
  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = (evt) => {
        evt.preventDefault();
        if (selected) {
            handleUpdatePet(formData, selected._id);
        } else {
            handleAddPet(formData);
        }
    };
  
    return (
        <div>
        <form onSubmit={handleSubmitForm}>
            <label htmlFor="name"> Name </label>
            <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <label htmlFor="age"> Age </label>
            <input
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
            />
            <label htmlFor="breed"> Breed </label>
            <input
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
            />
            <button type="submit">{selected ? 'Update Pet' : 'Add New Pet'}</button>
        </form>
        </div>
    );
};

export default PetForm;
