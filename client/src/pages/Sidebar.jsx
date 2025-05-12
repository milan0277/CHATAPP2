import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../context/context";
import Image from "../assets/Innovation1.png";
import Image2 from "../assets/g.png";

const Sidebar = () => {
  const [otherUsers, setOtherUsers] = useState(null);

  const { setSelectedUsers } = useContext(store);

  const getOtherUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/app/api/otherusers`, {
        withCredentials: true,
      });
      res?.status == 200 ? setOtherUsers(res?.data) : setOtherUsers(null)
    } catch (err) {
      toast.error(err?.response?.data?.error || "Internal Server Error");
    }
  };

  useEffect(() => {
    getOtherUsers();
  }, []);

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4 "
      style={{ paddingBottom: "2%" }}
    >
      <Link
        className="brand-link logo-switch"
        style={{ backgroundColor: "whitesmoke" }}
      >
        <img
          src={Image2}
          alt="Cogent Logo"
          className="brand-image-xs logo-xl"
          style={{ opacity: "5", maxHeight: "43px", marginLeft: "3rem" }}
        />
        <img
          src={Image}
          alt="Cogent Small Logo"
          className="brand-image-xl logo-xs"
          style={{ opacity: "5", maxHeight: "43px" }}
        />
      </Link>

      <div className="sidebar">
        <div className="form-inline"></div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {otherUsers
              ? otherUsers?.map((users) => {
                  const u = users?.name
                    .split(" ")[0]
                    .split("")[0]
                    .toUpperCase();
                  return (
                    <li className="nav-link m31">
                      <div className="nav-icon fas m3">{u}</div>
                      <p
                        style={{ fontSize: "18px" }}
                        onClick={() => setSelectedUsers(users)}
                      >
                        {users?.name?.toUpperCase()}
                      </p>
                    </li>
                  );
                })
              : ""}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
