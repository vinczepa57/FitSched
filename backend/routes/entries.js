const router = require('express').Router();
let Entry = require('../models/entry.model');

router.route('/').get((req,res) => {
    Entry.find()
        .then(entries => res.json(entries))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const day = req.body.day;
    const categoryName = req.body.categoryName;
    const videoID = req.body.videoID;

    const newEntry = new Entry({
        day,
        categoryName,
        videoID
    });
    
    newEntry.save()
    .then(() => res.json('Entry added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Entry.findById(req.params.id)
        .then(entry => res.json(entry))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Entry.findByIdAndDelete(req.params.id)
        .then(() => res.json('Entry deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Entry.findById(req.params.id)
        .then(entry => {
            entry.day = req.body.day;
            entry.categoryName = req.body.categoryName;
            entry.videoID = req.body.videoID;

            entry.save()
                .then(() => res.json('Entry updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;