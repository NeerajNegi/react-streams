import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = props => {

    const dispatch = useDispatch();
    const stream = useSelector(state => state.streams[props.match.params.id]);

    useState(() => {
        dispatch(fetchStream(props.match.params.id))
    }, []);

    if (!stream) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    )
}

export default StreamShow;