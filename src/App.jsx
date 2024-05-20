import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/petList';
import PetDetails from './components/petDetail';
import PetForm from './components/PetForm';

const App = () => {

const [petList, setPetList] = useState([]);
const [selected, setSelected] = useState(null);
const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {

    const fetchPets = async () => {
      const data = await petService.index();
      setPetList(data);
    };

    fetchPets();
  
  }, []);

  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <PetList {...{
        petList, 
        updateSelected, 
        handleFormView,
        isFormOpen}}/>
      {isFormOpen 
        ? <PetForm /> 
        : <PetDetails {...{selected}} />}
    </>
  )
};

export default App;