import "./delete-video.scss";
import {  Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const DeleteVideo = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const redirect = useNavigate();
   const { videoId } = useParams();

   const handleClickDeleteBtn = () => {
      setLoading(true);
      axios
         .delete(`${baseUrl}/${videoId}`)
         .then((response) => redirect("/"))
         .catch((error) => alert("Error Ocuured"));
   };

   const handleClickBackBtn = () => {
      redirect("/");
   };

   return (
      <div className="delete-video">
         <h1>Delete Video</h1>
         {loading ? (
            <h1>Loading...</h1>
         ) : (
            <div className="inputs">
               <h3>Are You sure to delete this video?</h3>
               <Button variant="outlined" color="error" onClick={handleClickDeleteBtn}>
                  Yes, Delete IT !!!!!
               </Button>
               <Button variant="outlined" color="secondary" onClick={handleClickBackBtn}>
                  Back To List
               </Button>
            </div>
         )}
      </div>
   );
};

export default DeleteVideo;
