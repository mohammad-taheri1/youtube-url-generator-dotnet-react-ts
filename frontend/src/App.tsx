import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AddVideo from "./pages/add-video/AddVideo";
import EditVideo from "./pages/edit-video/EditVideo";
import DeleteVideo from "./pages/delete-video/DeleteVideo";

const App = () => {
   return (
      <div>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-video" element={<AddVideo />} />
            <Route path="/edit-video/:videoId" element={<EditVideo />} />
            <Route path="/delete-video/:videoId" element={<DeleteVideo />} />
         </Routes>
      </div>
   );
};

export default App;
