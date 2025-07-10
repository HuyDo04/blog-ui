import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";  
import topicService from "@/service/topic.service";
import postService from "@/service/post.service";
import Select from "react-select"; // import react-select
import styles from "./PostCreate.module.scss";

import { useNavigate } from "react-router-dom";

function PostCreate() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      const data = await topicService.getAll();
      setTopics(data.data);
    };
    fetchTopic();
  }, []);

  const onSubmit = async (data) => {
    try {
      // data.topicId sẽ là object { value, label } khi dùng react-select
      const postData = {
        ...data,
        topicId: data.topicId.value
      };
      await postService.create(postData);
      alert("Tạo bài viết thành công");
      reset();
      navigate("/");
    } catch (error) {
      console.log("Lỗi tạo bài viết:", error);
      alert("Tạo bài viết không thành công");
    }
  };

  const topicOptions = topics.map((topic) => ({
    value: topic.id,
    label: topic.name
  }));

  return (
    <div className={styles.createPostContainer}>
      <h1 className={styles.title}>Tạo bài viết mới</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tiêu đề</label>
          <input
            type="text"
            className={`${styles.input} ${errors.title ? styles.error : ''}`}
            {...register("title", { 
              required: "Tiêu đề là bắt buộc",
              minLength: {
                value: 5,
                message: "Tiêu đề phải có ít nhất 5 ký tự"
              }
            })}
            placeholder="Nhập tiêu đề bài viết"
          />
          {errors.title && (
            <span className={styles.errorMessage}>
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Content Field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Nội dung</label>
          <textarea
            className={`${styles.textarea} ${errors.content ? styles.error : ''}`}
            {...register("content", { 
              required: "Nội dung là bắt buộc",
              minLength: {
                value: 20,
                message: "Nội dung phải có ít nhất 20 ký tự"
              }
            })}
            placeholder="Nhập nội dung bài viết"
          />
          {errors.content && (
            <span className={styles.errorMessage}>
              {errors.content.message}
            </span>
          )}
        </div>

        {/* Topic Field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Chủ đề</label>
          <Controller
            name="topicId"
            control={control}
            rules={{ required: "Vui lòng chọn chủ đề" }}
            render={({ field }) => (
              <Select
                {...field}
                options={topicOptions}
                placeholder="Chọn chủ đề"
                classNamePrefix="react-select"
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: "150px",
                  })
                }}
              />
            )}
          />
          {errors.topicId && (
            <span className={styles.errorMessage}>
              {errors.topicId.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className={styles.submitButton}
        >
          Tạo bài viết
        </button>
      </form>
    </div>
  );
}

export default PostCreate;
