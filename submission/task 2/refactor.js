// overall idea is that each function returns an object representing a succesful request,
// or an error object with details. This is then propagated up to the invite user function,
// which can actually send the response to the client. Due to the time limited nature of the task,
// I have not actually implemented this but rather outlined the approach below. Breaking up
// functionality into methods in this way not only makes the code more readable, but makes it
// a lot easier to test.

exports.inviteUser = function(req, res) {
	var invitationBody = req.body;
	var shopId = req.params.shopId;
	var authUrl = " https://url.to.auth.system.com/invitation ";
	superagent
		.post(authUrl)
		.send(invitationBody)
		.end(function(err, invitationResponse) {
			var response = handleInvitationResponse(
				err,
				invitationResponse,
				shopId
			);
			res.json(response);
		});
};

// breaking this out into it's own method makes it easier to mock the response
// and test the funcionality.
exports.handleInvitationResponse = function(err, invitationResponse, shopId) {
	if (err || invitationResponse.status != 201 || !shopId) {
		//handle different error cases appropriately
	}
	return User.findOneAndUpdate(
		{
			authId: invitationResponse.body.authId
		},
		{
			authId: invitationResponse.body.authId,
			email: invitationBody.email
		},
		{
			upsert: true,
			new: true
		},
		function(err, createdUser) {
			if (err || !createdUser) {
				//handle different error cases appropriately
			}
			return updateShop(
				shopId,
				createdUser,
				invitationResponse.body.invitationId
			);
		}
	);
};

exports.updateShop = function(shopId, createdUser, invitationId) {
	Shop.findById(shopId).exec(function(err, shop) {
		if (err || !shop) {
			//need to add a meaningful error code here  
			return { 
				message: "No shop found" 
			};
		}
		if (shop.invitations.indexOf(invitationId)) {
			shop.invitations.push(invitationId);
		}
		if (shop.users.indexOf(createdUser._id) === -1) {
			shop.users.push(createdUser);
		}
		shop.save();
		// TODO: return a response indicating success
	});
};
