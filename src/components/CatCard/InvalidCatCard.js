import React from "react";
import "./CatCard.css";
const InvalidCatCard = () => {
	return (
		<div className="cat_card_wrapper">
			<div className="cat_card_image">
				<img src="https://http.cat/400.jpg" />
			</div>

			<p className="cat__invalid__tag">No Tags for this cat</p>

			<br></br>
			<p
				className="cat__reset__button"
				onClick={() => window.location.reload(false)}
			>
				Click to reset
			</p>
		</div>
	);
};

export default InvalidCatCard;
