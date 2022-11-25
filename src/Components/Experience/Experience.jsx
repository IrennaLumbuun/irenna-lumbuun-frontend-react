import React from "react";
import "./Experience.css";

function Experience(props) {
	if (props.experience) {
		return (
			<div className="experience-container">
				<h2 className="experience-title">
					{props.experience.title} at {props.experience.company}
				</h2>
				<p className="experience-tenure">{props.experience.tenure}</p>
				<ul className="experience-description-container">
					{props.experience.description.map((descriptionBulletPoint) => {
						return <li>{descriptionBulletPoint}</li>;
					})}
				</ul>
				<ul className="experience-technology-container">
					{props.experience.technologies.map((tech) => {
						return <li>{tech}</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default Experience;
