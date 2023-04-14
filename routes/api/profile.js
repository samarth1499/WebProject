const express = require('express')
const router = express.Router()

// Import Person schema
const Shipwreck = require('./../../models/Shipwreck')


router.get('/', (req, res) => res.send('Profile related routes'))


router.get('/get', async (req, res) => {

    // without cursor.
    const people = await Shipwreck.find({});
    try {
        res.send(people);
    } catch (error) {
        res.status(500).send(error);
    }


})

router.get("/getForm", (req, res) => {
    res.render("pageUI");
  });

//Getting all shipwrecks with pagination and optional depth filter
router.get('/data', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const depth = req.query.depth ||'';
  
    const query = depth ? { depth } : {};
  
    Shipwreck
      .find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec()
      .then(person => res.send(person))
      .catch(err => res.status(500).send(err.message));
  });

//Returning desired shipwreck to the client with _id param
router.get('/data/:_id', (req, res) => {
    Shipwreck
        .findOne({ _id: req.params._id })
        .then(person => res.send(person))
        .catch(err => console.log(err))
})


//Adding new record in shipwreck
router.post('/data', (req, res) => {

    const newShipwreck = Shipwreck({
        watlev: req.body.watlev,
        feature_type: req.body.feature_type
    })

    newShipwreck
        .save()
        .then(person => res.send(person))
        .catch(err => console.log(err))
})


//Updating shipwrecks
router.put('/data/:_id', (req, res) => {
    Shipwreck.updateMany(
        { _id: req.params._id },
        { $set: {feature_type: req.body.feature_type, recrd:req.body.recrd, vesslterms:req.body.vesslterms, chart:req.body.chart,
            latdec:req.body.latdec, londec:req.body.londec, gp_quality:req.body.gp_quality, depth:req.body.depth, sounding_type:req.body.sounding_type,
            history:req.body.history, quasou:req.body.quasou, watlev:req.body.watlev} })
        .exec()
        .then(() => {
            res.status(201).send('Updated.')
        })
        .catch((err) => {
            console.log(err);
        })
})


//Deleting Shipwreck
router.delete('/data/:_id', (req, res) => {
    Shipwreck.deleteOne({ _id: req.params._id})
        .exec()
        .then(() => {
            res.status(201).send('Deleted.')
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router