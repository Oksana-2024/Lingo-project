import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { IoIosRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { schemaBookForm } from "../../helpers/bookSchema";
import BaseButton from "../BaseButton/BaseButton";
import s from "./BookForm.module.css";

interface IBookForm {
  onClose: () => void;
}

interface IBookFormData {
  name: string;
  email: string;
  phone: string;
  reason: "career" | "kids" | "abroad" | "exams" | "culture";
}

const options = [
  { value: "career", label: "Career and business" },
  { value: "kids", label: "Lesson for kids" },
  { value: "abroad", label: "Living abroad" },
  { value: "exams", label: "Exams and coursework" },
  { value: "culture", label: "Culture, travel or hobby" },
];

const BookForm = ({ onClose }: IBookForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IBookFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      reason: "career",
    },
    resolver: zodResolver(schemaBookForm),
  });

  const selectedReason = watch("reason");

  const onSubmit = async (data: {
    reason: string;
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      console.log(data);

      toast.success("Thank you! Your order has been submitted.");
      onClose();
      reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <fieldset className={s.fieldInput}>
        <legend className={s.legend}>
          What is your main reason for learning English?
        </legend>
        {options.map((option) => (
          <label key={option.value} className={s.radioOption}>
            <input
              type="radio"
              value={option.value}
              checked={selectedReason === option.value}
              {...register("reason")}
              className={s.radioInput}
            />
            {selectedReason === option.value ? (
              <IoMdRadioButtonOn className={s.radioIcon} size={24} />
            ) : (
              <IoIosRadioButtonOff className={s.icon} size={24} />
            )}
            {option.label}
          </label>
        ))}
      </fieldset>

      <input
        className={s.inputBook}
        type="text"
        placeholder="Full Name"
        {...register("name", { required: "Name is required" })}
      />
      <div className={s.textError}>
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <input
        className={s.inputBook}
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      <div className={s.textError}>
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <input
        className={s.inputBook}
        type="text"
        placeholder="Phone number"
        {...register("phone", { required: "Phone is required" })}
      />
      <div className={s.textError}>
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <BaseButton type="submit" className={s.bookBtn} name="Book" />
    </form>
  );
};

export default BookForm;
