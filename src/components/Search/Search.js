import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";

const Search = ({
	setCatImgUrl,
	setCatTags,
	setCatImgDescription,
	validTags,
}) => {
	const [term, setTerm] = useState("");

	const handleInputChange = (e) => {
		setTerm(e.target.value);
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const index = validTags.indexOf(term);
		if (index === -1) {
			setTerm("");
			setCatImgUrl(false);
			return;
		}
		const searchTerm = term;
		const descriptionResponse = await axios.get("https://catfact.ninja/fact");
		setCatImgUrl(`https://cataas.com/cat/${term}`);
		setCatTags([...[], searchTerm]);
		setCatImgDescription(descriptionResponse.data.fact);
		setTerm("");
	};
	return (
		<form onSubmit={handleFormSubmit} className="search__form">
			<input
				type="text"
				value={term}
				placeholder="Enter the search tag"
				onChange={(e) => handleInputChange(e)}
			/>
			<button type="submit">Search Tag</button>
		</form>
	);
};

export default Search;
