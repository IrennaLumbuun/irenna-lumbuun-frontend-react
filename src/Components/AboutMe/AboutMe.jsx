import React, { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./AboutMe.css";
import AvatarView from "@sarge/avatar-view";
import { Model } from "./Model";

function AboutMe(props) {
	return (
		<section id="AboutMe">
			<div id="AboutMeText">
				<h1>Hello,</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
			<Canvas
				camera={{ position: [2, 0, 12.25], fov: 15 }}
				style={{
					backgroundColor: "#111a21",
				}}
			>
				<ambientLight intensity={1.25} />
				<ambientLight intensity={0.1} />
				<directionalLight intensity={0.4} />
				<Suspense fallback={null}>
					<Model position={[0.025, -0.9, 0]} />
				</Suspense>
				<OrbitControls />
			</Canvas>
		</section>
	);
}

export default AboutMe;
