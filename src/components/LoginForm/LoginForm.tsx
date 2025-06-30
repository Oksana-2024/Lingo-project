import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLoginForm } from "../../helpers/userSchema";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toasterCustomStyles } from "../../helpers/toasterCustomStyles";
import { FiEye, FiEyeOff } from "react-icons/fi";

import BaseButton from "../BaseButton/BaseButton";
import s from "./LoginForm.module.css";

interface ILoginForm {
  onClose: () => void;
}

const LoginForm = ({ onClose }: ILoginForm) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schemaLoginForm),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      toast.success(`Welcome back, ${user.displayName}!`);
      reset();
      onClose();
      navigate("/");
    } catch (error) {
      toast.error((error as Error).message, toasterCustomStyles);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form className={s.loginFotm} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={s.loginInput}
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      <div className={s.textError}>
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <input
        className={s.loginInput}
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

      <BaseButton name="Log In" type="submit" className={s.loginBtn} />
    </form>
  );
};
export default LoginForm;
