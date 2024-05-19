
const PetList = ({petList, updateSelected}) => {

    const pets = petList.map((pet, i)=>(
        <a key={i} onClick={()=>updateSelected(pet)}>
            <li >{pet.name}</li>
        </a>
    ))

    return (
        <>
            <h1>Pet List</h1>
            <ul>
                {petList.length > 0 ? <ul>{pets}</ul> : <h2>No Pets Yet!</h2>}
            </ul>
        </>
    )
};

export default PetList;