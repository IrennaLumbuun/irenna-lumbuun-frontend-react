import React, { useEffect, Suspense, useState } from "react";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import "./AboutMe.css";
import Model from "./Waving";
import Slider from "@mui/material/Slider";
import Experience from "../Experience/Experience";

function AboutMe(props) {
	const BACKEND_URL = "/experiences.json";
	const [allExperiences, setAllExperiences] = useState([]);

	// Initial data getter to retrieve all experiences from db
	useEffect(() => {
		getAllExperiences();
	}, []);

	const getAllExperiences = () => {
		axios
			.get(BACKEND_URL)
			.then((res) => {
				// TODO: We should check whether res.data.experience
				// is always ordered by date
				// If not, we need to implement sorting
				setAllExperiences(res.data.experiences);
			})
			.catch((err) => console.log(err));
	};

	return (
		<fieldset id="AboutMe">
			<legend id="AboutMeLegend">Work Experience</legend>
			<div id="AboutMeContainer">
				<section id="AboutMeText">
					{allExperiences.map((experience) => (
						<Experience experience={experience} />
					))}
				</section>
				<section id="AboutMeAvatar">
					<Canvas
						id="AboutMeAvatarCanvas"
						camera={{ position: [5, 6, 10], fov: 15 }}
					>
						<ambientLight intensity={1.25} />
						<ambientLight intensity={0.1} />
						<directionalLight intensity={0.4} />
						<Suspense fallback={null}>
							<Model position={[0, 0, 0]} />
						</Suspense>
					</Canvas>
				</section>
			</div>
		</fieldset>
	);
}

export default AboutMe;
