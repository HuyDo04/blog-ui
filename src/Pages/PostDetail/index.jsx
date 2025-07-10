import { useEffect, useState } from "react"
import postService from "@/service/post.service";
import { useParams } from "react-router-dom";
import styles from "./PostDetail.module.scss"

function PostDetail (darkMode = false ) {
    const {slug} = useParams();
    const [post, setPost] = useState([]);
    console.log(post);
    
    useEffect (() => {
        const fetchData = async () => {
            const data = await postService.getOneBySlug(slug);
            setPost(data.data)
        }
        fetchData();
    },[slug])

    if(!post) return <div>Loading.......</div>

    return (
        <div className={`${styles.postDetail} ${darkMode ? styles.darkTheme : ''}`}>
          <h1 className={styles.title}>{post.title}</h1>
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      );
}

export default PostDetail