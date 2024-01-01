import React, { useState } from "react";
import { members } from "../../data/table/members";
import avatar from "../../assets/user.jpg";
import IndividualChat from "./IndividualChat";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { slideAnimation, fadeAnimation } from "../../config/motion";

const Chat = () => {
  const navigate = useNavigate();
  const loacation = useLocation();
  const handleClick = (chatUser) => {
    navigate("/chat/" + chatUser.id);
  };
  const { device } = useSelector((state) => state.toggle);
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="grid grid-cols-12">
        <motion.div
          {...slideAnimation("up")}
          className={`lg:col-span-3 col-span-12 ${
            device === "laptop" || loacation.pathname === "/chat"
              ? "block"
              : "hidden"
          }`}
        >
          <div className="relative overflow-y-auto h-[calc(100vh-5rem)]">
            <div className="card">
              <div className="me flex items-center py-2 border-b border-light-300 dark:border-dark-300">
                <img src={user.image} alt="" className="avatar-md mr-4" />
                <p className="font-bold text-xl">{user.name}</p>
              </div>
              <div className="users">
                {members.map((member) => (
                  <div
                    onClick={() => handleClick(member)}
                    key={member.id}
                    className={`flex items-center transition-all duration-300 p-2 hover ${
                      location.pathname === "/chat/" + member.id ? "active" : ""
                    }`}
                  >
                    <img src={avatar} alt="" className="avatar mr-4" />
                    <div>
                      <p>{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          {...slideAnimation("right")}
          className="lg:col-span-9 col-span-12 mx-2"
        >
          <Outlet />
        </motion.div>
      </div>
    </>
  );
};

export default Chat;
