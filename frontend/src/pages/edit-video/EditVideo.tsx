import "./edit-video.scss";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { IVidoe } from "../../types/global.typing";

const EditVideo = () => {
   const [title, setTitle] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const redirect = useNavigate();
   const { videoId } = useParams();

   useEffect(() => {
      setLoading(true);
      axios
         .get<IVidoe>(`${baseUrl}/${videoId}`)
         .then((response) => {
            setTitle(response.data.title);
            setLoading(false);
         })
         .catch((error) => alert("ERror Ocuured"));
   }, []);

   const handleClickSaveBtn = () => {
      if (title === "") {
         alert("Please Enter Something");
         return;
      }
      const data = {
         title,
      };

      axios
         .patch(`${baseUrl}/${videoId}`, data)
         .then((response) => redirect("/"))
         .catch((error) => alert("Error Ocuured"));
   };

   const handleClickBackBtn = () => {
      redirect("/");
   };

   return (
      <div className="edit-video">
         <h1>Edit Video</h1>
         {loading ? (
            <h1>Loading...</h1>
         ) : (
            <div className="inputs">
               <TextField
                  autoComplete="off"
                  label="Video Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
               />
               <Button variant="outlined" onClick={handleClickSaveBtn}>
                  Save
               </Button>
               <Button variant="outlined" color="secondary" onClick={handleClickBackBtn}>
                  Back To List
               </Button>
            </div>
         )}
      </div>
   );
};

export default EditVideo;
