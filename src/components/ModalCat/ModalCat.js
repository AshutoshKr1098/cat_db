import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModalCat.css";

const ModalCat = ({ setOpenModal, catImgDescription }) => {
	const [catGif, setCatGif] = useState(null);
	useEffect(() => {
		const getCatGif = () => {
			axios
				.get(`https://cataas.com/cat/gif/says/${catImgDescription}?json=true`)
				.then((response) => {
					console.log(response.data);
					setTimeout(() => {
						setCatGif(`https://cataas.com${response.data.url}`);
					}, 2000);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		getCatGif();
	}, []);

	let catGifTag;
	if (catGif === null) {
		catGifTag = <div className="modal__skeleton">Loading...</div>;
	} else if (catGif === false) {
		catGifTag = (
			<div className="modal__skeleton">
				Error loading the GIF, please close the modal and refresh the page.
			</div>
		);
	} else {
		catGifTag = <img src={catGif} alt="Cat Gif" />;
	}
	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button onClick={() => setOpenModal(false)}>X</button>
				</div>
				<div className="title">
					<h1>Cat Gif</h1>
				</div>
				<div className="body">{catGifTag}</div>
				<div className="footer"></div>
			</div>
		</div>
	);
};

export default ModalCat;
