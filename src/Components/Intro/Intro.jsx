import React, { useEffect } from "react";
import "./Intro.css";

function Intro(props) {
	const PRINT_SPEED_MS = 50;
	const INTRO_TEXT = "<I am a software engineer. />";

	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	useEffect(() => {
		const animateIntro = async (PRINT_SPEED_MS, INTRO_TEXT) => {
			let i = 0;
			let tagline = document.getElementById("tagline");
			tagline.innerHTML = "";

			while (i < INTRO_TEXT.length) {
				tagline.innerHTML += INTRO_TEXT.charAt(i);
				i++;
				await sleep(PRINT_SPEED_MS);
			}
		};
		animateIntro(PRINT_SPEED_MS, INTRO_TEXT);
	}, []);

	return (
		<section id="home">
			<h1 id="title">Irenna Lumbuun</h1>
			<div id="home-text-container">
				<p id="tagline"></p>
				<p className="blink_me" id="blink">
					I
				</p>
			</div>
			<div id="home-button-container">
				<a
					href="https://drive.google.com/file/d/1KW1qMF1iUpsOY97zndTpx5_h7dZ-utU8/view?usp=sharing"
					rel="noreferrer"
					target="_blank"
					className="contact-button"
					id="resume-contact-button"
				>
					Resume
				</a>
				<a
					href="https://www.linkedin.com/in/irenna-lumbuun"
					rel="noreferrer"
					target="_blank"
					className="contact-button"
					id="linkedin-contact-button"
				>
					LinkedIn
				</a>
				<a
					href="http://github.com/irennalumbuun"
					rel="noreferrer"
					target="_blank"
					className="contact-button"
					id="github-contact-button"
				>
					Github
				</a>
			</div>
		</section>
	);
}

export default Intro;
