import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search/Search";
import CatCard from "./components/CatCard/CatCard";
import InvalidCatCard from "./components/CatCard/InvalidCatCard";
import ModalCat from "./components/ModalCat/ModalCat";
import SkeletonFull from "./components/Skeletons/SkeletonFull";
import "./App.css";

const App = () => {
	// Setting up all states
	const [validTags, setValidTags] = useState([]);
	const [catImgUrl, setCatImgUrl] = useState(null);
	const [catTags, setCatTags] = useState([]);
	const [catImgDescription, setCatImgDescription] = useState("");
	const [openModal, setOpenModal] = useState(false);

	// Function to collect list of supported tags by the exposed API. This will be used, in case user inputs an invalid tag, then we will validate it using the list of supported tags we collected here.
	const fetchCatTags = async () => {
		const response = await axios.get("https://cataas.com/api/tags");
		const tagList = response.data;
		const emptyTag = "";
		const index = tagList.indexOf(emptyTag);
		// Remove the empty string tag
		if (index > -1) {
			tagList.splice(index, 1);
		}
		setValidTags(tagList);
	};

	const fetchCatData = async () => {
		const response = await axios.get("https://cataas.com/cat?json=true");
		const descriptionResponse = await axios.get("https://catfact.ninja/fact");

		setCatImgUrl(`https://cataas.com${response.data.url}`);
		setCatTags(response.data.tags);
		setCatImgDescription(descriptionResponse.data.fact);
	};

	useEffect(() => {
		fetchCatTags();
		fetchCatData();
	}, []);
	let cardComponent;
	if (catImgUrl === false) {
		cardComponent = <InvalidCatCard />;
	} else if (catImgUrl !== null && catImgUrl !== false) {
		cardComponent = (
			<CatCard
				catImgUrl={catImgUrl}
				catImgDescription={catImgDescription}
				catTags={catTags}
				setOpenModal={setOpenModal}
			/>
		);
	} else if (catImgUrl === null) {
		cardComponent = <SkeletonFull />;
	}
	return (
		<div className="container">
			<div className="search__container">
				<Search
					setCatImgUrl={setCatImgUrl}
					setCatTags={setCatTags}
					setCatImgDescription={setCatImgDescription}
					validTags={validTags}
				/>
			</div>
			<div className="card__container">
				{openModal && (
					<ModalCat
						setOpenModal={setOpenModal}
						catImgDescription={catImgDescription}
					/>
				)}
				{cardComponent}
			</div>
		</div>
	);
};

export default App;
