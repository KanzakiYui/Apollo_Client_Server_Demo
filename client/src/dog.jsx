import React from "react";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_DOGS = gql(`
    {
        dog (breed: "bluetick") {
            id
            breed,
            displayImage,
            subbreeds
            images {
                id
                url
            }
        }
    }
`);

const Dog = () => {
    const {data, loading, error} = useQuery(GET_DOGS);
    if(loading) return <h1>Loading...</h1>;
    else if(error) return <h1>Error!</h1>;
    else console.log(data);
    return <h1>Succeed!</h1>
};

export default Dog;