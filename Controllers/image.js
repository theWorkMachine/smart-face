const Clarifai = require('clarifai');
const cors = require('cors');


app.use(cors());

const app = new Clarifai.App({
    apiKey: 'd2d89a3faa284b7a87cb2774a4bed289'
  });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with Api'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get entries!'))
}

module.exports = {
    handleImage,
    handleApiCall
}