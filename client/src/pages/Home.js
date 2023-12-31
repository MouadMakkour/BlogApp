import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const paragraphStyles = {
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
  transition: 'max-height 0.3s ease', // Add transition property
  lineHeight: '1.5', // Add line-height property
}

const Home = () => {
  //for load more button
  const [isOpenArray, setIsOpenArray] = useState([]);

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const toggleIsOpen = (index) => {
    // Toggle the isOpen state for the specific post
    setIsOpenArray((prevIsOpenArray) => {
      const newArray = [...prevIsOpenArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };


  return (
    <div className="home">
      <div className="posts">
        {posts.map((post,index) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p style={isOpenArray[index] ? null : paragraphStyles}>{getText(post.description)}</p>
              <button onClick={() => toggleIsOpen(index)}>
                {isOpenArray[index] ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;