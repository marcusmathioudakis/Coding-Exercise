var expect = require("chai").expect;
const request = require("request");
var episodesController = require("../src/controllers/episodes");

const url = "http://localhost:3001/episodes";

describe("Episodes API", function() {
	it("with no season parameter, returns valid data for all episodes", function(
		done
	) {
		request(url, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			//episode data is correctly formatted
			let json = JSON.parse(body);
			expect(json).to.have.own.property("data");
			expect(json.data[0]).to.have.all.keys(
				"id",
				"url",
				"name",
				"season",
				"number",
				"airdate",
				"airtime",
				"airstamp",
				"runtime",
				"image",
				"summary",
				"_links"
			);
			// returns data for all episodes
			expect(json.data.length).to.equal(38);
			// done forces mocha to wait for the response
			// before checking expectations
			done();
		});
	});

	it(" with season parameter, returns valid data for episodes of that season only", function(
		done
	) {
		request(url + "/2", function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			let json = JSON.parse(body);
			expect(json).to.have.own.property("data");
			expect(json.data.length).to.equal(10);
			done();
		});
	});

	it("with invalid season parameter, returns no data", function(done) {
		request(url + "/fsdfsdf", function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			let json = JSON.parse(body);
			expect(json).to.have.own.property("data");
			expect(json.data.length).to.equal(0);
			done();
		});
	});
});
