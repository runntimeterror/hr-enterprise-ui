import React, { useState, useRef } from "react";
import { Storage } from "aws-amplify";

Storage.configure({ level: 'private' });

function Upload() {
  const imageRef = useRef();
 const handleSubmit = async (e) => {
    e.preventDefault();
    var fileName = Date.now() + ".jpg";
    await Storage.put(fileName, imageRef.current.files[0])
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Book</h2>
      <input
      placeholder="Book Name"
      type="text"
      />
      <input
      placeholder="Author"
      type="text"
      
      />
      <input
      placeholder="Description"
      type="text"
      />
      <input
      placeholder="Score"
      type="number"
      />
      <input type="file" ref={imageRef} />
      <button type="submit">Add Book</button>
    </form>
  );
}
export default Upload;