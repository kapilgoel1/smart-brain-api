const handleSignin = (knex, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if(!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	knex('login').where({
		  email: email
	}).select('hash')
	.then( (hash) => {
		var matched = bcrypt.compareSync(password, hash[0].hash);
		if(matched) {
			return knex('users').where({
				email: email
			}).select()
			.then(user => {
				res.json(user[0]);			})
			.catch((err) => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('Wrong password')
		}
	})
	.catch((err) => {
		res.status(400).json('Wrong email')
	})

}

module.exports = {
	handleSignin: handleSignin
}