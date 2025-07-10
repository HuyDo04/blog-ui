import { useEffect, useState } from "react"
import topicService from "@/service/topic.service";
import postService from "@/service/post.service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./PostUpdate.module.scss"
function PostUpdate () {
    const navigate = useNavigate();
    const {id} = useParams();
    const {register,reset, handleSubmit, formState: {errors}} = useForm();
    const [originalPost, setOriginalPost] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const fetchData = async () => {
            const post = await postService.getOneById(id);
            setOriginalPost(post.data);
        }
        fetchData();
    },[id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [getTopic, getPost] = await Promise.all([
                    topicService.getAll(),
                    postService.getOneById(id)
                ]);

                const topic = getTopic.data;
                const post = getPost.data;
                
                setTopics(topic);
                
                reset({
                    title: post.title,
                    content: post.content,
                    topicId: post.topicId,
                })

                setLoading(false)
                
            } catch (error) {
                console.log(error)
                alert("Data do not exist")
            }
        }
        fetchData()
      }, [id, reset]);

    const onSubmit = async (data) => {
        
        try {
            if (
                data.title === originalPost.title &&
                data.content === originalPost.content &&
                parseInt(data.topicId) === originalPost.topicId
              ) {
                alert("Không có thay đổi nào để cập nhật.");
                return;
              }

            await postService.update(id, data);
            alert("Cập nhật thành công")
            navigate(`/posts/id/${id}/edit`)
        } catch (error) {
            alert("Cập nhật không thành công. Lỗi")
            console.log(error)
        }
    }
    
    if(loading) return <p>Loading...</p>

    return (
        <div className={styles.container}>
          <h1 className={styles.title}>Cập nhật bài viết</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tiêu đề</label>
              <input
                type="text"
                {...register("title", { required: "Tiêu đề không được bỏ trống" })}
                placeholder="Nhập tiêu đề"
                className={styles.input}
              />
              {errors.title && <p className={styles.error}>{errors.title.message}</p>}
            </div>
    
            <div className={styles.formGroup}>
              <label className={styles.label}>Nội dung</label>
              <input
                type="text"
                {...register("content", { required: "Nội dung không được bỏ trống" })}
                placeholder="Nhập nội dung"
                className={styles.input}
              />
              {errors.content && <p className={styles.error}>{errors.content.message}</p>}
            </div>
    
            <div className={styles.formGroup}>
              <label className={styles.label}>Chủ đề</label>
              <select
                {...register("topicId", { required: "Vui lòng chọn chủ đề" })}
                className={styles.select}
              >
                <option value="">Chọn chủ đề</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
              {errors.topicId && <p className={styles.error}>{errors.topicId.message}</p>}
            </div>
    
            <button type="submit" className={styles.button}>
              Cập nhật bài viết
            </button>
          </form>
        </div>
      );
}

export default PostUpdate

