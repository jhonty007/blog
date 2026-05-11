import React, { useContext, useEffect, useState } from "react";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [postId]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`/api/likes/${postId}`);
        setLikes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLikes();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await axios.post(
        "/api/comments",
        { text: commentText, postId },
        { withCredentials: true }
      );
      setCommentText("");
      const res = await axios.get(`/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`, {
        withCredentials: true,
      });
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      await axios.post(
        "/api/likes",
        { postId },
        { withCredentials: true }
      );
      const res = await axios.get(`/api/likes/${postId}`);
      setLikes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const isLiked = currentUser && likes.includes(currentUser.id);

  return (
    <div className="single">
      <div className="content">
        <img
          src={
            post.img
              ? post.img.startsWith("http")
                ? post.img
                : `/upload/${post.img}`
              : "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt=""
        />
        <div className="user">
          <img
            src={
              post.user_img
                ? post.user_img.startsWith("http")
                  ? post.user_img
                  : `/upload/${post.user_img}`
                : "https://via.placeholder.com/50"
            }
            alt=""
          />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.id === post.uid && (
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>

        <div className="interactions">
          <button
            className={`like-btn ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {isLiked ? "\u2764" : "\u2661"} {likes.length}
          </button>
        </div>

        <div className="comments">
          <h2>Comments</h2>
          {currentUser && (
            <form className="comment-form" onSubmit={handleComment}>
              <textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit">Post Comment</button>
            </form>
          )}
          {comments.length === 0 && (
            <p className="no-comments">No comments yet.</p>
          )}
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="comment-header">
                <span className="comment-user">{comment.username}</span>
                <span className="comment-date">
                  {moment(comment.created_at).fromNow()}
                </span>
                {currentUser?.id === comment.user_id && (
                  <span
                    className="comment-delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    X
                  </span>
                )}
              </div>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Menu cat={post.cat} currentPostId={post.id} />
    </div>
  );
};

export default Single;
