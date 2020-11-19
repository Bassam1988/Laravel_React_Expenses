import React from 'react';

const Post = ({ body }) => {
    console.log(body);
    return (
      <div>
        {body.map(post => {
          const { _id, title, content } = post;
          return (
            <div key={_id}>
              <h2>{title}</h2>
              <p>{content}</p>
              <hr />
            </div>
          );
        })}
      </div>
    );
  };