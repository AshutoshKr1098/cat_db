import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search/Search";
import CatCard from "./components/CatCard/CatCard";
import ModalCat from "./components/ModalCat/ModalCat";

const App = () => {
	const [validTags, setValidTags] = useState([]);
	const [catImgUrl, setCatImgUrl] = useState(null);
	const [catTags, setCatTags] = useState([]);
	const [catImgDescription, setCatImgDescription] = useState("");
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		const fetchCatTags = async () => {
			const response = await axios.get("https://cataas.com/api/tags");
			const tagList = response.data;
			const emptyTag = "";
			const index = tagList.indexOf(emptyTag);
			if (index > -1) {
				tagList.splice(index, 1);
			}
			console.log(tagList);
			setValidTags(tagList);
		};
		const fetchCatData = async () => {
			const response = await axios.get("https://cataas.com/cat?json=true");
			const descriptionResponse = await axios.get("https://catfact.ninja/fact");
			// console.log(response.data);
			// console.log(descriptionResponse.data);
			setCatImgUrl(`https://cataas.com${response.data.url}`);
			setCatTags(response.data.tags);
			setCatImgDescription(descriptionResponse.data.fact);
		};
		fetchCatTags();
		fetchCatData();
	}, []);
	return (
		<>
			<Search
				setCatImgUrl={setCatImgUrl}
				setCatTags={setCatTags}
				setCatImgDescription={setCatImgDescription}
				validTags={validTags}
			/>
			{openModal && (
				<ModalCat
					setOpenModal={setOpenModal}
					catImgDescription={catImgDescription}
				/>
			)}
			<br></br>
			{catImgUrl !== null ? (
				<CatCard
					catImgUrl={catImgUrl}
					catImgDescription={catImgDescription}
					catTags={catTags}
					setOpenModal={setOpenModal}
				/>
			) : (
				<p>{catImgUrl}</p>
			)}
		</>
	);
};

export default App;
