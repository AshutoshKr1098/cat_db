import React from "react";
import "./CatCard.css";
const CatCard = ({ catImgUrl, catImgDescription, catTags, setOpenModal }) => {
	const displayCatTags = () => {
		const catTagList = catTags.map((tag, index) => {
			return (
				<li key={index} className="cat__tag">
					{tag}
				</li>
			);
		});

		return catTagList;
	};
	return (
		<div className="cat_card_wrapper" onClick={() => setOpenModal(true)}>
			<div className="cat_card_image">
				<img src={catImgUrl} />
			</div>
			<div className="cat_card_tags">
				{catTags.length > 0 ? (
					<ul className="cat__tags">{displayCatTags()}</ul>
				) : (
					<p className="cat__invalid__tag">No Tags for this cat ;(</p>
				)}
			</div>
			<div className="cat_card_description">
				<p>{catImgDescription}</p>
			</div>
		</div>
	);
};

export default CatCard;
