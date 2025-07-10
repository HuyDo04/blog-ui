import { useEffect, useState } from "react"
import postService from "@/service/post.service";
import { useParams } from "react-router-dom";
import styles from "./PostDetail.module.scss"
import { useNavigate } from "react-router-dom";

function PostDetail (darkMode = false ) {
    const {slug} = useParams();
    const navigate = useNavigate()

    const [post, setPost] = useState([]);
  console.log(post.id);
  
    useEffect (() => {
        const fetchData = async () => {
            const data = await postService.getOneBySlug(slug);
            setPost(data.data)
        }
        fetchData();
    },[slug])

    const handleDelete = async (id) => {
      if(window.confirm("Bạn có muôn xóa bài viết này?")) {
        await postService.del(id);
        navigate("/")
      }
    }

    if(!post) return <div>Loading.......</div>

    return (
      <div className={`${styles.postDetail} ${darkMode ? styles.darkTheme : ''}`}>
      <h1 className={styles.title}>{post.title}</h1>
      
      <div 
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={() => navigate(`/posts/id/${post.id}/edit`)}>
          Chỉnh sửa
        </button>
        <button className={styles.deleteButton} onClick={() => handleDelete(post.id)}>
          Xóa
        </button>
      </div>
    </div>
    
      );
}

export default PostDetail