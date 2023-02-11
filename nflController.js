const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { NFL } = require('../models/nfl');

// => localhost:3000/NFL
router.get('/', (req, res) => {
    NFL.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving NFLs :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    NFL.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving NFL :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var nfl1 = new NFL({
    Player_Name: req.body.Player_Name,
    Team: req.body.Team,
    Rushing_Yards: req.body.Rushing_Yards,
    Touchdowns_thrown: req.body.Touchdowns_thrown,
    Sacks: req.body.Sacks,
    Field_goal: req.body.Field_goal,
    Catches: req.body.Catches,
    });
    nfl1.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in NFL Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var nfl1 = {
    Player_Name: req.body.Player_Name,
    Team: req.body.Team,
    Rushing_Yards: req.body.Rushing_Yards,
    Touchdowns_thrown: req.body.Touchdowns_thrown,
    Sacks: req.body.Sacks,
    Field_goal: req.body.Field_goal,
    Catches: req.body.Catches,
    };
    NFL.findByIdAndUpdate(req.params.id, { $set: nfl1 }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in NFL Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    NFL.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in NFL Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;