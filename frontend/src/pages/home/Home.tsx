import "./home.scss";
import { AddCircle, Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { IVidoe } from "../../types/global.typing";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const [videos, setVideos] = useState<IVidoe[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const redirect = useNavigate();

   useEffect(() => {
      setLoading(true);
      axios
         .get<IVidoe[]>(baseUrl)
         .then((response) => setVideos(response.data))
         .catch((error) => alert(JSON.stringify(error)))
         .finally(() => setLoading(false));
   }, []);

   //  console.log(videos);

   const redirectToEdit = (videoId: string) => {
      redirect(`/edit-video/${videoId}`);
   };

   const redirectToDelete = (videoId: string) => {
      redirect(`/delete-video/${videoId}`);
   };

   return (
      <div className="home">
         {/* heading */}
         <div className="heading">
            <h1>Videos List</h1>
            <span>
               <AddCircle onClick={() => redirect("/add-video")} />
            </span>
         </div>

         {/* Videos List */}
         <div className="cards">
            {loading && <h1>Loading...</h1>}
            {!loading && videos.length === 0 && <h1 className="no-video">No Videos Yet...</h1>}
            {videos.map((item) => (
               <div key={item.id} className="card">
                  <div className="left">
                     <div className="title">
                        <span>{item.title}</span>
                        <span className="time">{moment(item.createdAt).fromNow()}</span>
                     </div>
                     <div className="url">
                        <span>{item.url}</span>
                     </div>
                  </div>
                  <div className="right">
                     <div className="btns">
                        <Edit className="edit-btn" onClick={() => redirectToEdit(item.id)} />
                        <Delete className="delete-btn" onClick={() => redirectToDelete(item.id)} />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Home;
