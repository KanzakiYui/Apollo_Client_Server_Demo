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

const pollInterval = 1000;

const AllDogsOptions = () => {
    const {data, loading, error, refetch, startPolling, stopPolling} = useQuery(GET_ALL_DOGS, {
        displayName: 'QueryAllDogsInfo',    // in React-Devtool
        pollInterval: 0, // interval = 0 means no poll, poll can be used make cache up to date.
    });

    const [currentDogOption, updateDogOption ] = useState('');
    useEffect(()=>{
        if(data && !currentDogOption) {
            updateDogOption(data.dogs[0].breed)
        }
    }, [data, currentDogOption]);

    if(loading || !data) return <h1>Loading...</h1>;
    else if(error) return <h1>Error!</h1>;
    const allOptions = data.dogs.map(({id, breed}) =>
        <option key={id} value={breed}>{breed}</option>
    );

    const onChange = event => updateDogOption(event.target.value);
    const onStartPoll = () => startPolling(pollInterval);
    const onRefetch = () => refetch();

    return (
        <div id='all-dog-options'>
            <select value={currentDogOption} onChange={onChange}>
                {allOptions}
            </select>
            <DogPhoto breed={currentDogOption} />
            <div id='all-dog-options-actions'>
                <button onClick={onRefetch}>Refetch</button>
                <button onClick={onStartPoll}>Start Polling</button>
                <button onClick={stopPolling}>Stop Polling</button>
            </div>
        </div>
    )
};

export default AllDogsOptions;