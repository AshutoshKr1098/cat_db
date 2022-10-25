import React from "react";
import "./Skeleton.css";
const Skeleton = () => {
	return (
		<div className="skeleton__wrapper">
			<div className="skeleton__image"></div>
			<div className="skeleton__tags">
				<div className="skeleton__tag"></div>
				<div className="skeleton__tag"></div>
				<div className="skeleton__tag"></div>
			</div>

			<div className="skeleton__desc"></div>
		</div>
	);
};

export default Skeleton;
