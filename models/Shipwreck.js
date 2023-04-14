const { Double, Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    
    recrd: {
        type: String,
        required: false
    },
    vesslterms: {
        type: String,
        required: false
    },
    feature_type: {
        type: String,
        required: false
    },
    chart: {
        type: String,
        default: 'US,U1,graph,DNC H1409860'
    },
    latdec: {
        type: String,
        required: false
    },
    londec: {
        type: String,
        required: false
    },
    gp_quality: {
        type: String,
        required: false
    },
    depth: {
        type: String,
        required:false
    },
    sounding_type: {
        type: String,
        required: false
    },
    history: {
        type: String,
        required: false
    },
    quasou: {
        type: String,
        required: false
    },
    watlev: {
        type: String,
        required: false
    },
    coordinates: {
        type: Array,
        required: false
    }
})

module.exports = Person = mongoose.model('shipwreck', PersonSchema)
