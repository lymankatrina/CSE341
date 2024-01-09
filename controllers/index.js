displayNoName = (req, res) => {
	const greeting = "Hello World!";
	res.status(200).send(greeting);
};
displayName = (req, res) => {
	const data = "Someone I Know";
	res.status(200).send(data);
};

module.exports = {
	displayNoName,
	displayName,
};
