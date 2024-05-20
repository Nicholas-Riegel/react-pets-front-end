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

	const handleFormView = (pet) => {
		if (!pet.name) setSelected(null);
		setIsFormOpen(!isFormOpen);
	};

	const handleAddPet = async (formData) => {
		try {
			const newPet = await petService.create(formData);
			setPetList([newPet, ...petList]);
			setIsFormOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdatePet = async (formData, petId) => {
		try {
			const updatedPet = await petService.updatePet(formData, petId);
	
			if (updatedPet.error) {
				throw new Error(updatedPet.error);
			}
	
			const updatedPetList = petList.map((pet) =>
				pet._id !== updatedPet._id ? pet : updatedPet
			);
			setPetList(updatedPetList);
			// If we don't set selected to the updated pet object, the details page will reference outdated data until the page reloads.
			setSelected(updatedPet);
			setIsFormOpen(false);
		} catch (error) {
			console.log(error);
		}
	};
  
	const handleRemovePet = async (petId) => {
		try {
			const deletedPet = await petService.deletePet(petId);
	
			if (deletedPet.error) {
				throw new Error(deletedPet.error);
			}
	
			const updatedPetList = petList.filter((pet) =>
				pet._id !== petId
			);
			setPetList(updatedPetList);
			setSelected(null);
			setIsFormOpen(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<PetList {...{
				petList, 
				updateSelected, 
				handleFormView,
				isFormOpen}} />
			{isFormOpen 
				? <PetForm {...{
					handleAddPet,
					selected,
					handleUpdatePet}} /> 
				: <PetDetails {...{
					selected, 
					handleFormView,
					handleRemovePet}} />}
		</>
	)
}

export default App;