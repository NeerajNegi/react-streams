import React, { useEffect } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const StreamDelete = (props) => {
    const dispatch = useDispatch();
    const stream = useSelector((state) => state.streams[props.match.params.id])

    useEffect(() => {
        dispatch(fetchStream(props.match.params.id));
    }, []);

    const renderContent = () => {
        if (!stream) {
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete the stream with title: ${stream.title}?`
    }

    const renderActions = () => {
        return (
            <>
                <button onClick={() => dispatch(deleteStream(props.match.params.id))} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        );
    }

    return (
        <Modal 
            title="Delete Stream"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => history.push('/')}
        />
    )
}

export default StreamDelete;