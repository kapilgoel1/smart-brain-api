const handleRegister = (knex, bcrypt) => (req, res) => {
	const {email, name, password} = req.body;
	var hash = bcrypt.hashSync(password);
	if(!email || !name || !password) {
		return res.status(400).json('incorrect form submission');
	}
	knex.transaction(function(trx) {
		return trx
	    .insert({email: email, hash: hash })
	    .into('login')
	    .then(function() {	      
	    	return trx.insert({
	    		email: email,
				name: name,
				joined: new Date()
	    	})
	    	.into('users')
	    	.returning('*')
	    	}
	    )	    	
		.then(function(user) {
  			res.json(user[0])
			}
		)
		.catch(function(error) {
 			res.status(400).json('unable to register');
			}
		);
		}
	)
}

module.exports = {
	handleRegister: handleRegister
}