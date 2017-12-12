import React from "react";

export default function TileGrid(props) {
	return (
		<div className="flex-container-row TileGrid">
			{props.episodes.map(episode => (
				<div key={episode.id} className="Tile">
					<img src={episode.image.medium} alt="" />
					<h2>
						<span>{episode.name}</span>
					</h2>
				</div>
			))}
		</div>
	);
}
