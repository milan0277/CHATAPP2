import React from "react";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import Footer from "../pages/Footer";
import ChatsPage from "../pages/ChatsPage";

const Chat = () => {
  return (
    <div className="wrapper">
      {/* navbar */}
      <Navbar />
      {/* sidebar */}
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div>
              {/* chats */}
              <ChatsPage />
            </div>
          </div>
        </section>
      </div>
      {/* footer */}
      <Footer />
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Chat;
