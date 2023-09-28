import React, { useState, useEffect } from "react";
import "./Projects.css";
import axios from "axios";
import { XMasonry, XBlock } from "react-xmasonry";
import FilterGroup from "../FilterGroup/FilterGroup";
import { projectsData, technologiesData } from "./hardcodedData";

function Projects(props) {
	const BACKEND_URL = "https://backend.irennalumbuun.com";
	const [projectsToDisplay, setProjectsToDisplay] = useState([]);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		getAllProjects();
		getTags();
	}, []);

	const getAllProjects = (url) => {
		axios
			.get(`${BACKEND_URL}/projects`)
			.then((response) => setProjectsToDisplay(response.data))
			.catch((e) => {
				// 9/27/2023 - having some issues deploying new cert to the backend
				// so, for now we're just gonna manually display the data when the frontend fail to contact the backend
				setProjectsToDisplay(projectsData);
			});
	};

	const getProjectsByTag = async (tag_id) => {
		return new Promise((resolve, reject) => {
			let projects = [];
			axios
				.get(`${BACKEND_URL}/technology/${tag_id}`)
				.then((response) => {
					for (let d of Object.values(response.data)) {
						if (typeof d === "object") {
							let promises = [];
							for (let project_id of d) {
								const promise = axios
									.get(`${BACKEND_URL}/projects/${project_id}`)
									.then((response) => {
										projects.push(response.data);
									});
								promises.push(promise);
							}

							// The for loop triggers the promise, but it doesn't wait until they finish
							// We need this chunk of code to wait for all calls to finish before returning the result
							Promise.all(promises).then(() => {
								resolve(projects);
							});
						}
					}
				})
				.catch((e) => {
					console.error(e);
					// 10/1/2023 - having some issues deploying new cert to the backend
					// so, for now we're just gonna manually display the data when the frontend fail to contact the backend
					const projects = [];
					const projectIds = technologiesData.find(
						(tech) => tech.id === tag_id
					).projects;
					for (const id of projectIds) {
						projects.push(
							projectsData.find((project) => project.projectId === id)
						);
					}
					resolve(projects);
				});
		});
	};

	const getTagColor = (tag_id) => {
		const frontend = ["react", "angular", "html-css", "html/css"]; // yellow
		const cloud = ["aws", "google-cloud", "docker"]; // blue
		const backend = ["javascript", "node.js", "python", "flask"]; // red
		const database = ["firebase-database", "mongodb", "dynamodb"]; // green
		const ml = ["machine-learning", "keras", "scikit", "computer-vision"]; // white
		const mobile = ["swift", "react-native"]; // orange
		const system = ["c"]; // gray
		const category = ["personal-project", "hackathon", "organization"];

		let color = "";
		let order = 0;
		if (frontend.includes(tag_id)) {
			color = "#FDFD96";
			order = 2;
		} else if (cloud.includes(tag_id)) {
			color = "#ABDEE6";
			order = 4;
		} else if (backend.includes(tag_id)) {
			color = "#FF968A";
			order = 1;
		} else if (database.includes(tag_id)) {
			color = "#D7ECD9";
			order = 3;
		} else if (ml.includes(tag_id)) {
			color = "#CDB7F6";
			order = 5;
		} else if (mobile.includes(tag_id)) {
			color = "#F5D5CB";
			order = 6;
		} else if (system.includes(tag_id)) {
			color = "#d3d3d3";
			order = 7;
		} else if (category.includes(tag_id)) {
			color = "#faf9f7";
			order = 0;
		}
		return [color, order];
	};

	const getTagsColorAndSort = (data) => {
		let tags = [];
		for (let d of data) {
			// manually remove some tags
			// - python and javascript is redundant
			// - so is keras and scikit
			// - DynamoDB is part of AWS
			// - for now, google-cloud only includes cloud vision project,
			// which are the same as the projects in "Computer Vision"
			if (
				d.id === "python" ||
				d.id === "javascript" ||
				d.id === "keras" ||
				d.id === "scikit" ||
				d.id === "google-cloud" ||
				d.id === "dynamodb"
			)
				continue;

			let color_order = getTagColor(d.id);
			tags.push({
				id: d.id,
				name: d.name,
				color: color_order[0],
				order: color_order[1],
			});

			// "sort" by color so it doesn't look messy in the front end side
			tags.sort(function (tag1, tag2) {
				return tag1.order - tag2.order;
			});
		}
		return tags;
	};

	const getTags = () => {
		// get each projects' tag, group them in an array
		axios
			.get(`${BACKEND_URL}/technologies/`)
			.then((response) => {
				setTags(getTagsColorAndSort(Object.values(response.data)));
			})
			.catch((e) => {
				// 10/1/2023 - having some issues deploying new cert to the backend
				// so, for now we're just gonna manually display the data when the frontend fail to contact the backend
				setTags(getTagsColorAndSort(Object.values(technologiesData)));
			});
	};

	const getTagStyle = (tag_id) => {
		return {
			borderColor: getTagColor(tag_id.replace(" ", "-").toLowerCase())[0],
			color: getTagColor(tag_id.replace(" ", "-").toLowerCase())[0],
		};
	};

	return (
		<section className="projects">
			<h1 id="project-title">Projects</h1>
			<h2 id="project-filter-title">Filter by Tag: </h2>
			<FilterGroup
				getTagColor={getTagColor}
				getAllProjects={getAllProjects}
				tags={tags}
				getProjectsByTag={getProjectsByTag}
				setProjectsToDisplay={setProjectsToDisplay}
			/>
			<XMasonry center={false}>
				{projectsToDisplay.map((project) => (
					<XBlock>
						<div className="project-component">
							<a href={project.url} rel="noreferrer" target="_blank">
								<h1 className="project-title">{project.title}</h1>
								<p className="project-description">{project.description}</p>
								{project.tags.map((tag) => {
									return (
										<ul className="project-tags">
											<li
												key={tag}
												className="project-tags-item"
												style={getTagStyle(tag)}
											>
												{tag}
											</li>
										</ul>
									);
								})}
							</a>
						</div>
					</XBlock>
				))}
			</XMasonry>
			{projectsToDisplay.length === 0 && (
				<p className="welp-2-14">
					<em>Well this is awkward...</em>
					<br></br>
					We failed to make a request to the backend.
				</p>
			)}
		</section>
	);
}

export default Projects;
