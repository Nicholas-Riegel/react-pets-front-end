import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/petList';
import PetDetails from './components/petDetail';


const App = () => {

const [petList, setPetList] = useState([]);
const [selected, setSelected] = useState(null);

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

  return (
    <>
      <PetList {...{petList, updateSelected}}/>
      <PetDetails {...{selected}} />
    </>
  )
};

export default App;
