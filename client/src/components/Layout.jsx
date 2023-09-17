import React from "react";
import "../styles/LayoutStyles.css";
import {  adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {message, Avatar, Badge, Space, Popover } from 'antd';

const Layout = ({ children }) => {
  const location = useLocation();
  const {user} = useSelector(state => state.user);
  const navigate = useNavigate();

  //rendering menu list
  const SidebarMenu = user?.isAdmin ? adminMenu : userMenu

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  }

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Logo</h6>
            </div>
            <div className="menu">
              {SidebarMenu?.map((menu) => {
                const isActive = location.path === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <h1>{location.path}</h1>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{cursor: 'pointer'}}>
                
                  <Badge count={user && user.notification.length} onClick={() => {navigate('/notification')}}>
                    <i className="fa-solid fa-bell"></i>
                  </Badge>
              
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
