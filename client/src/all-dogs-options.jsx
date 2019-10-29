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
    const {
        data,
        loading,
        error,
        refetch,
        startPolling,
        stopPolling,
        networkStatus
    } = useQuery(GET_ALL_DOGS, {
        // interval = 0 means no poll, poll can be used make cache up to date.
        pollInterval: 0,
        // will re-render component every time network status changed
        notifyOnNetworkStatusChange: true 
    });

    const [currentDogOption, updateDogOption ] = useState('');
    useEffect(()=>{
        if(data && !currentDogOption) {
            updateDogOption(data.dogs[0].breed)
        }
    }, [data, currentDogOption]);

    let content = null;

    if(loading || !data) {
        if (networkStatus === 4) content = <h1>Refetching...</h1>;
        else content = <h1>Loading...</h1>;
    }
    else if(error) content = <h1>Error!</h1>;
    else {
        const allOptions = data.dogs.map(({id, breed}) =>
            <option key={id} value={breed}>{breed}</option>
        );
        const onChange = event => updateDogOption(event.target.value);
        const onStartPoll = () => startPolling(pollInterval);
        const onRefetch = () => refetch();
        content = (
            <React.Fragment>
                <select value={currentDogOption} onChange={onChange}>
                    {allOptions}
                </select>
                <DogPhoto breed={currentDogOption} />
                <div id='all-dog-options-actions'>
                    <button onClick={onRefetch}>Refetch</button>
                    <button onClick={onStartPoll}>Start Polling</button>
                    <button onClick={stopPolling}>Stop Polling</button>
                </div>
            </React.Fragment>
        );
    }
    return (
        <div id='all-dog-options'>
            {content}
        </div>
    )
};

export default AllDogsOptions;