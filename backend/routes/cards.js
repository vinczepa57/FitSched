const router = require('express').Router();
let Card = require('../models/card.model');

router.route('/').get((req,res) => {
    Card.find()
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const category = req.body.category;
    const videoID = req.body.videoID;

    const newCard = new Card({
        category,
        videoID
    });
    
    newCard.save()
    .then(() => res.json('Card added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Card.findById(req.params.id)
        .then(card => res.json(card))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Card.findByIdAndDelete(req.params.id)
        .then(() => res.json('Card deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Card.findById(req.params.id)
        .then(card => {
            card.category = req.body.category;
            card.videoID = req.body.videoID;

            card.save()
                .then(() => res.json('Card updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;