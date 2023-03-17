import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login.jsx";
import Post from "../pages/Post";
import SignUp from "../pages/SignUp";
import Update from "../pages/Update";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/post" element={<Post />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
