var fs = require("fs");

/**
	get episodes (optionally filtered by season)

	as we are just serving a static list of episodes we just store the JSON in a file.
	Clearly if we had more episodes or needed to edit the data we would use a database.

**/
exports.get = function(req, res) {
	let season = req.params.season;
	fs.readFile("./data/silicon-valley.json", (err, data) => {
		if (err) throw err;
		let episodes = (JSON.parse(data))._embedded.episodes;
		if (season) {
			episodes = (Array.from(episodes)).filter(element => element.season == season );
		}
		response = {
			success: true,
			data: episodes
		};
		res.send(response);
	});
};
