import { useForm, Controller } from "react-hook-form";  
import topicService from "@/service/topic.service";
import Select from "react-select"; // import react-select
import styles from "./TopicCreate.module.scss";

import { useNavigate } from "react-router-dom";

function TopicCreate() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    await topicService.create(data)
    alert("Thêm topic thành công")
    navigate("/")
  };

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

export default TopicCreate;
