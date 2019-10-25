import React from "react";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_ALL_DOGS = gql(`
    {
        dogs {
            id
            breed
        }
    }
`);

const AllDogsOptions = () => {
    const {data, loading, error} = useQuery(GET_ALL_DOGS);
    if(loading) return <h1>Loading...</h1>;
    else if(error) return <h1>Error!</h1>;
    const allOptions = data.dogs.map(({id, breed}) =>
        <option key={id} value={breed}>{breed}</option>
    );
    return (
        <select>
            {allOptions}
        </select>
    )
};

export default AllDogsOptions;