import React, { useRef, useState } from "react";
import "./Image.css";
import default_image from "../assests/default_image.svg";

export const Image = () => {

    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    const[loading,setLoading] = useState(false);

    const imageGern = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{ 
                    "Content-Type": "application/json",
                    Authorization: 
                    "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),

            }
            );
            let data = await response.json();
            let data_array = data.data;
            setImage_url(data_array[0].url);

    }

  return (
    <div className="ai-image-gen">
      <div className="header">
        AI Image <span>generator</span>
        <div className="img-loading">
          <div className="image">
            <img src={image_url==="/"?default_image:image_url} alt="" />
            {/* <div className="loading">
                <div className={"loading-bar"}>
                    <div className="loading-text">Loading...</div>
                </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text" ref={inputRef}
          className="search-input"
          placeholder="Describe What you want to see"
        />
        <div className="generate-btn" onClick={() => {imageGern()}}>Generate</div>
      </div>
    </div>
  );
};

export default Image;
