import React, { useState } from "react";
import "./FilterGroup.css";
import { ToggleButton } from "@mui/material";

function FilterGroup(props) {
	// Begin by displaying all projects
	const [selectedTag, setSelectedTag] = useState("all");

	return (
		<div id="filter-container">
			<ToggleButton
				value="all"
				className="filter-option"
				selected={selectedTag === "all"}
				onChange={() => {
					setSelectedTag("all");
					props.getAllProjects();
				}}
				style={{ backgroundColor: "white", color: "black" }}
				id="all"
			>
				<strong>All Projects</strong>
			</ToggleButton>

			{props.tags.map((tag) => {
				return (
					<ToggleButton
						key={tag.id}
						value={tag.name}
						selected={selectedTag === tag.name}
						className="filter-option"
						style={{
							backgroundColor: props.getTagColor(
								tag.id.replace(" ", "-").toLowerCase()
							)[0],
							color: "black",
						}}
						onChange={() => {
							setSelectedTag(tag.name);
							// We basically replace any " " and "/" with a "-"
							// This is because for a tag like React Native,
							// the tag id should be "react-native"
							// But for HTML/CSS, it should be "html-css"
							props
								.getProjectsByTag(tag.name.replace(/ |\//, "-").toLowerCase())
								.then((projects) => props.setProjectsToDisplay(projects));
						}}
					>
						{tag.name.replace("-", " ")}
					</ToggleButton>
				);
			})}
		</div>
	);
}

export default FilterGroup;
