import "./add-video.scss";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const AddVideo = () => {
   const [title, setTitle] = useState<string>("");
   const redirect = useNavigate();

   const handleClickSaveBtn = () => {
      if (title === "") {
         alert("Please Enter Something");
         return;
      }
      const data = {
         title,
      };

      axios
         .post(baseUrl, data)
         .then((response) => redirect("/"))
         .catch((error) => alert("Error Ocuured"));
   };

   const handleClickBackBtn = () => {
      redirect("/");
   };

   return (
      <div className="add-video">
         <h1>Add Video</h1>
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
      </div>
   );
};

export default AddVideo;
