import React, { useState, useEffect } from "react";
import axios from "axios";

import { RotatingTriangles } from "react-loader-spinner";

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
	const [loader, setLoader] = useState(true);

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

	// Function to collect cat's data by hitting the endpoint

	const fetchCatData = async () => {
		const response = await axios.get("https://cataas.com/cat?json=true");
		const descriptionResponse = await axios.get("https://catfact.ninja/fact");
		let descriptionData = descriptionResponse.data.fact;

		// Lower the description length to keep description size intact
		descriptionData =
			descriptionData.length > 120
				? descriptionData.substring(0, 120 - 3) + "..."
				: descriptionData;

		setCatImgUrl(`https://cataas.com${response.data.url}`);
		setCatTags(response.data.tags);
		setCatImgDescription(descriptionData);
	};

	// When component loads for the first tine, we need to collect all the relevant tags and also the first time cat's detail to show in card.
	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
			fetchCatTags();
			fetchCatData();
		}, 2000); // just to bring a nice loading spinny.
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

	let renderedAppComponent =
		loader === true ? (
			<div className="app__loading__container">
				<div className="spinny">
					<RotatingTriangles
						visible={true}
						height="80"
						width="80"
						ariaLabel="rotating-triangels-loading"
						wrapperStyle={{}}
						wrapperClass="rotating-triangels-wrapper"
					/>
				</div>
			</div>
		) : (
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
	return renderedAppComponent;
};

export default App;
