import React, { useEffect } from 'react';
import flv from 'flv.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = props => {

    const dispatch = useDispatch();
    let player = null;
    const stream = useSelector(state => state.streams[props.match.params.id]);
    const videoRef = React.createRef();

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(fetchStream(id));
        buildPlayer();
    }, []);

    useEffect(() => {
        buildPlayer();
        return function cleanup() {
            player.destroy();
        };
    });

    function buildPlayer() {
        if (player || !stream) {
            return;
        }
        const { id } = props.match.params;
        player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        player.attachMediaElement(videoRef.current);
        player.load();
    }

    if (!stream) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }} controls/>
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    )
}

export default StreamShow;