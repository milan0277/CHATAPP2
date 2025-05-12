import React, { useContext, useEffect, useState, useMemo } from "react";
import store from "../context/context";
import { io } from "socket.io-client";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const ChatsPage = () => {
  const serverUrl = import.meta.env.VITE_API_URL;

  //socket-io-client
  const socket = useMemo(() => io(`${serverUrl}`), []);

  const { selectedUsers } = useContext(store);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState("");


  const initial = selectedUsers?.name
    ?.split(" ")[0]
    ?.split("")[0]
    ?.toUpperCase();
  const selectedUserName = selectedUsers?.name?.toUpperCase();

  const loggedUserName = JSON.parse(localStorage.getItem("loggedUser"))?.name;
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));


  const getMessges = async () => {
    try {
      if (selectedUsers) {
        const res = await axios.get(
          `${serverUrl}/app/api/receivemessage/${selectedUsers?._id}`,
          {
            withCredentials: true,
          }
        );
        if (res?.status == 200) {
          setMessages(res?.data);
        }
      ;
      }
    } catch (err) {
            toast.error(err?.response?.data?.error || "Enable To Get Messages");
    }
  };


  const receivemessage = () => {
    return socket.on("data", ({ m, senderId }) => {
      if (selectedUsers?._id === senderId) {
        setMessages((prevMess) => [...prevMess, m]);
      }
    });
  };

  const handleAttachment = (e) => {
    setAttachment(e.target.files[0]);
    setAttachmentName(e.target.files[0].name);
  };

  const handleSend = async () => {
    try {
      if (selectedUsers && message?.length > 0) {
        const formData = new FormData();
        formData.append("message", message);
        const res = await axios.post(
          `${serverUrl}/app/api/sendmessage/${selectedUsers?._id}`,
          formData,
          { withCredentials: true }
        );
        if (res?.status == 200) {
          socket.emit("message", {
            m: res.data.convo,
            receiverId: selectedUsers?._id,
            senderId: loggedUser?._id,
          });

          setMessages((previousValue) => {
            return [...previousValue, res?.data?.convo];
          });
          setMessage("");
        }
      } else if (selectedUsers && attachment) {
        const formData = new FormData();
        formData.append("attachment", attachment);

        const res = await axios.post(
          `${serverUrl}/app/api/sendmessage/${selectedUsers?._id}`,
          formData,
          { withCredentials: true }
        );
        if (res?.status == 200) {
          socket.emit("message", {
            m: res.data.convo,
            receiverId: selectedUsers?._id,
            senderId: loggedUser?._id,
          });

          setMessages((previousValue) => {
            return [...previousValue, res?.data?.convo];
          });
           setAttachment(null);
          setAttachmentName("")
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Enable To Send Message/Attachment");
    }
  };

  useEffect(() => {
    getMessges();
  }, [selectedUsers]);

  useEffect(() => {
    // message()
    receivemessage();

    //socket connection
    socket.on("connect", () => {});

    const userId = loggedUser?._id;
    //register
    socket.emit("register", userId);

    // socket.off("data")
    socket.on("disconnect", () => {});

    //cleanup function
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("data");
      socket.off("register");
      socket.off("dMessage");
    };
  }, [selectedUserName]);

  return (
    <section className="col-lg-12 connectedSortable">
      <div className="card direct-chat direct-chat-primary hei">
        {selectedUsers ? (
          <div className="card-header sunb">
            <div className="sun">{initial}</div>
            <div className="sunbb">{selectedUserName}</div>
          </div>
        ) : (
          ""
        )}


        <div className="card-body cb">
          <div className="direct-chat-messages cb2">
            {selectedUsers ? (
              messages?.length > 0 ? (
                messages?.map((singleMessage, index) => {
                  return (
                    <>
                      {singleMessage?.senderId == loggedUser?._id ? (
                        <div className="direct-chat-msg right" key={index}>
                          <div className="direct-chat-infos clearfix">
                            <span className="direct-chat-name float-right">
                              {loggedUserName}
                            </span>
                            <span className="direct-chat-timestamp float-left">
                              {new Date(singleMessage?.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <FaCircleUser className="direct-chat-img" />

                          {singleMessage?.message ? (
                            <div className="direct-chat-text">
                              {singleMessage?.message}
                            </div>
                          ) : (
                            <div className="direct-chat-text">
                              <a href={`${serverUrl}/app/api/showimage/${singleMessage?.attachment}`} className="an" target="blank" download>Attachment</a>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="direct-chat-msg" key={index}>
                          <div className="direct-chat-infos clearfix">
                            <span className="direct-chat-name float-left">
                              {selectedUserName}
                            </span>
                            <span className="direct-chat-timestamp float-right">
                              {new Date(singleMessage?.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <FaRegUserCircle className="direct-chat-img" />

                        {singleMessage?.message ? (
                            <div className="direct-chat-text">
                              {singleMessage?.message}
                            </div>
                          ) : (
                            <div className="direct-chat-text">
                              <a href={`${serverUrl}/app/api/showimage/${singleMessage?.attachment}`} className="an" target="blank" download>Attachment</a>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                })
              ) : (
                <div className="emp">Send Your First Message</div>
              )
            ) : (
              <div className="emp">
                Welcome {loggedUserName}, Let's Start Chatting !
              </div>
            )}
          </div>
        </div>
 
        <div className="card-footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="input-group">
              <input
                type="text"
                name="message"
                placeholder="Type Message ..."
                className="form-control"
                value={attachmentName.length > 0 ? attachmentName : message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <span className="input-group-append">
                <label className="btn btn-secondary mb-0">
                  📎
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleAttachment(e)} 
                  />
                </label>
              </span>

              <span className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </span>
            </div>
          </form>
        </div>
  
      </div>
    </section>
  );
};

export default ChatsPage;
