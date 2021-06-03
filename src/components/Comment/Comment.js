import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="border p-3 my-2 rounded">
            <h6>{comment.name}</h6>
            <p>{comment.body}</p>
        </div>
    );
};

export default Comment;