const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '11d9c01c951f4a2596020314da8a1699'
});

const handleApiCall = (req, res) => {
app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (knex) => (req, res) => {
	const {id} = req.body;
	knex('users')
  	.where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => res.json(entries[0]))
  	.catch(err => {
  		res.status(400).json('Unable to get count')
  	})
}

module.exports = {
	handleImage,
	handleApiCall
}