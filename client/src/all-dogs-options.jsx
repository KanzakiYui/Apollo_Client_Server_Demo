import React, {useState, useEffect} from "react";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import DogPhoto from './dog-photo';

const GET_ALL_DOGS = gql(`
    query GetAllDogsInfo {
        dogs {
            id
            breed
        }
    }
`);

const AllDogsOptions = () => {
    const {data, loading, error} = useQuery(GET_ALL_DOGS);
    const [currentDogOption, updateDogOption ] = useState('');
    const onChange = event => updateDogOption(event.target.value);
    useEffect(()=>{
        if(data && !currentDogOption) {
            updateDogOption(data.dogs[0].breed)
        }
    }, [data, currentDogOption]);

    if(loading) return <h1>Loading...</h1>;
    else if(error) return <h1>Error!</h1>;
    const allOptions = data.dogs.map(({id, breed}) =>
        <option key={id} value={breed}>{breed}</option>
    );

    return (
        <div id='all-dog-options'>
            <select value={currentDogOption} onChange={onChange}>
                {allOptions}
            </select>
            <DogPhoto breed={currentDogOption} />
        </div>
    )
};

export default AllDogsOptions;