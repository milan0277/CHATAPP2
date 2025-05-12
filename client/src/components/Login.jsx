import React, { useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import store from "../context/context";
import loginImage from "../assets/Innovation1.png";

const Login = () => {
  //navigation
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      const loginRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/app/api/login`,
        data,
        { withCredentials: true }
      );
      if (loginRes?.status == 200) {
        reset();
        toast.success(loginRes?.data?.message);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(loginRes?.data?.existUser)
        );
        navigate("/chatPage");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <center className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <img src={loginImage} />
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
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
                <div className="col-7">
                  <Link to={"/signup"}>Create New Acoount</Link>
                </div>
                {/* /.col */}
                <div className="col-5">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
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

export default Login;
