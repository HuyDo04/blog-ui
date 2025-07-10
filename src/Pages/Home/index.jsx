import topicService from "@/service/topic.service";
import { useEffect, useState } from "react";
import styles from './Home.module.scss';
import { useNavigate } from "react-router-dom";
function Home () {
    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await topicService.getAllTopicPost();
            setTopics(data.data)
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
          <h1>All Topics</h1>
            <div className={styles.actions}>
              <button className={styles.createTopicButton} onClick={() => navigate("/topics/create")}>
                + Tạo mới Topic
              </button>
              <button className={styles.createPostButton} onClick={() => navigate("/posts/create")}>
                + Tạo mới Post
              </button>
            </div>
          {topics.length === 0 && <p>Loading...</p>}
          <ul>
            {topics.map((topic) => (
              <li key={topic.id} 
              className={styles.topic}
              >
                <h2 className={styles.topicTitle}>TIêu đề: {topic.name}</h2>
                {topic.posts && topic.posts.length > 0 ? (
                  <ul className={styles.postList}>
                    {topic.posts.map((post) => (
                  <li
                    key={post.id}
                    className={styles.postItem}
                    onClick={() => navigate(`/posts/${post.slug}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <h3 className={styles.postTitle}>Tiêu đề bài đăng: {post.title}</h3>
                    <p className={styles.postContent}>Nội dung: {post.content}</p>
                  </li>
                ))}

                  </ul>
                ) : (
                  <p>No posts for this topic.</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Home