import React, { useState } from "react";
import avatar from "../../assets/user.jpg";
import { useSelector } from "react-redux";
import CustomButton from "../../custom/CustomButton";
import { MdOutlineArrowBackIos, MdSend } from "react-icons/md";
import ScrollToBottom from "react-scroll-to-bottom";
import { useNavigate, useParams } from "react-router-dom";
import { members } from "../../data/table/members";

const conversations = [
  {
    sender: "Alice",
    message: "Hi there!",
    timestamp: "2023-12-28T10:00:00",
  },
  {
    sender: "Jame Marker",
    message: "Hello!",
    timestamp: "2023-12-28T10:01:00",
  },
  {
    sender: "Alice",
    message: "How are you?",
    timestamp: "2023-12-28T10:02:00",
  },
  {
    sender: "Jame Marker",
    message: "I'm good, thanks! How about you?",
    timestamp: "2023-12-28T10:03:00",
  },
];

const IndividualChat = () => {
  const { id } = useParams();
  const navgate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [chatConversation, setChatConversation] = useState(conversations)
  const [message, setMessage] = useState("");

  const currentUser = members.find(user => user.id == id)
  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      sender: user.name,
      message,
      timestamp: new Date().toISOString(),
    };
    setChatConversation([...chatConversation, newMessage]);
    setMessage("");
  }
  return (
    <div className="card">
      <div className="header flex items-center bg-secondary-300 p-2 text-white">
        <CustomButton variant="btn" title={<MdOutlineArrowBackIos size={20}/>} onClick={() => navgate('/chat')} />
        <img src={avatar} alt="" className="avatar mr-4" />
        <div>
          <p className="font-bold">{currentUser.name}</p>
          <p className="text-success-100 text-xs">online</p>
        </div>
      </div>
      <div className="body my-2 relative overflow-y-auto">
        <ScrollToBottom className="h-[calc(100vh-14rem)]">
            {chatConversation.map((chat, i) => (
            <div
                key={i}
                className={`flex ${
                chat.sender === user.name ? "flex-row-reverse" : ""
                }`}
            >
                <img
                src={chat.sender === user.name ? user.image : avatar}
                alt=""
                className="avatar mr-4"
                />
                <div className={`flex flex-col mr-2 ${chat.sender === user.name ? 'items-end' : 'items-start'}`}>
                <p
                    className={`p-2 rounded-full ${
                    chat.sender === user.name
                        ? "bg-secondary-100 text-white"
                        : "bg-light-100 dark:bg-dark-100 dark:text-white"
                    }`}
                >
                    {chat.message}
                </p>
                <p className="text-xs">{chat.timestamp.substring(11, 16)}</p>
                </div>
            </div>
            ))}
        </ScrollToBottom>
      </div>
      <form className="footer flex align-baseline">
        <input type="text" placeholder="Send Message..." className="input w-full" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <CustomButton type="submit" variant="btn-secondary" title={<MdSend size={20}/>} onClick={e => handleSendMessage(e)}/>
      </form>
    </div>
  );
};

export default IndividualChat;
