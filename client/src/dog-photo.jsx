import React from "react";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// query is operation type (query, mutation, subscription)
// QueryDogPhotoByBreed is operation name (custom label)
const GET_DOG_PHOTO = gql(`
    query GetDogPhotoByBreed ($breed : String!) {
        dog(breed: $breed) {
            id
            displayImage
        }
    }
`);

const DogPhoto = ({ breed }) => {
    const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
        variables: { breed },       // variables will be passed into query string
        displayName: 'QueryDogPhotoByBreed',
        skip: !breed  // skip the entrie query when !breed = ture => breed undefined
    });

    if (loading || !data) return null;
    if (error) return `Error! ${error}`;

    return (
        <img src={data.dog.displayImage} alt='' />
    );
}

export default DogPhoto;