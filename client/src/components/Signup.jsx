import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SiNamemc } from "react-icons/si";
import Image from "../assets/Innovation1.png";

const Signup = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      const signupRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/app/api/signup`,
        data,
        { withCredentials: true }
      );
      if (signupRes?.status == 201) {
        reset();
        toast.success(signupRes?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  }

  return (
    <center className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <img src={Image} />
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Create Your New Account</p>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
              {errors.name && (
                <span
                  style={{ display: "flex", color: "red", fontSize: "14px" }}
                >
                  {errors.name.message}
                </span>
              )}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name field is required",
                    },
                  })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <SiNamemc />
                  </div>
                </div>
              </div>
              {errors.email && (
                <span
                  style={{ display: "flex", color: "red", fontSize: "14px" }}
                >
                  {errors.email.message}
                </span>
              )}

              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email filed is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              {errors.password && (
                <span
                  style={{ display: "flex", color: "red", fontSize: "14px" }}
                >
                  {errors.password.message}
                </span>
              )}

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password field is required",
                    },
                  })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-8">
                  <div className="icheck-primary"></div>
                </div>

                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Toaster />
    </center>
  );
};

export default Signup;
