import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModalCat.css";

const ModalCat = ({ setOpenModal, catImgDescription }) => {
	const [catGif, setCatGif] = useState(null);
	useEffect(() => {
		const getCatGif = () => {
			const response = axios
				.get(`https://cataas.com/cat/gif/says/${catImgDescription}?json=true`)
				.then((response) => {
					console.log(response.data);
					setCatGif(`https://cataas.com${response.data.url}`);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		getCatGif();
	}, []);

	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button onClick={() => setOpenModal(false)}>X</button>
				</div>
				<div className="title">
					<h1>Cat Gif</h1>
				</div>
				<div className="body">
					{catGif === null ? <p>No Gif</p> : <img src={catGif} />}
				</div>
				<div className="footer"></div>
			</div>
		</div>
	);
};

export default ModalCat;
