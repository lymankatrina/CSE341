displayNoName = (req, res) => {
	const data = "Hello World!";
	res.status(200).send(data);
};
displayName = (req, res) => {
	const data = "Hello World, This is Matthew Lyman";
	res.status(200).send(data);
};

module.exports = {
	displayNoName,
	displayName,
};
