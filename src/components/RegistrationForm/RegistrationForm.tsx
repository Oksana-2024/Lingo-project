import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { schemaRegisterForm } from "../../helpers/userSchema";
import BaseButton from "../BaseButton/BaseButton";
import s from "./RegistrationForm.module.css";

interface IRegistrationForm {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: IRegistrationForm) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schemaRegisterForm),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.name });
      toast.success("Registration successful!");
      reset();
      onClose();
      navigate("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={s.input}
        type="text"
        placeholder="Name"
        {...register("name", { required: "Name is required" })}
      />
      <div className={s.textError}>
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <input
        className={s.input}
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      <div className={s.textError}>
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <input
        className={s.input}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 6 characters long",
          },
        })}
      />
      <button
        type="button"
        className={s.togglePassButton}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <FiEye size={20} className={s.eyeIcon} />
        ) : (
          <FiEyeOff size={20} className={s.eyeIcon} />
        )}
      </button>

      <div className={s.textError}>
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <BaseButton name="Sign Up" type="submit" className={s.button} />
    </form>
  );
};

export default RegistrationForm;
