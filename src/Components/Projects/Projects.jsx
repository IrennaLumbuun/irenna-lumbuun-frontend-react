import React, { useState, useEffect } from "react";
import "./Projects.css";
import axios from "axios";
import { XMasonry, XBlock } from "react-xmasonry";
import FilterGroup from "../FilterGroup/FilterGroup";

function Projects(props) {
	const BACKEND_URL = "https://irenna-lumbuun-backend.herokuapp.com";
	const [projectsToDisplay, setProjectsToDisplay] = useState([]);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		getAllProjects();
		getTags();
	}, []);

	const getAllProjects = (url) => {
		axios
			.get(`${BACKEND_URL}/projects`)
			.then((response) => setProjectsToDisplay(response.data));
	};

	const getProjectsByTag = async (tag_id) => {
		return new Promise((resolve, reject) => {
			let projects = [];
			axios.get(`${BACKEND_URL}/technology/${tag_id}`).then((response) => {
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

	const getTags = () => {
		// get each projects' tag, group them in an array
		axios.get(`${BACKEND_URL}/technologies/`).then((response) => {
			let tags = [];
			for (let d of Object.values(response.data)) {
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
			setTags(tags);
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
					You may wonder why this section is empty. The answer to that is
					because this website is failing to make requests to the backend. You
					see, the backend for this project is hosted in Heroku. And, for
					reasons that I haven't understand yet,
					<strong> my Heroku account magically disappeared</strong>. My
					assumption is because I haven't visited the account for the past 365
					days. Or, because I recently deactivated my github student developer
					pack.
					<br></br>
					Worry not, I'm planning to get the backend up and running by
					<strong> 2/20</strong>. You can visit this website again then. If
					you're really curious about my projects, you may visit my linkedin
					(https://www.linkedin.com/in/irenna-lumbuun)
				</p>
			)}
		</section>
	);
}

export default Projects;
