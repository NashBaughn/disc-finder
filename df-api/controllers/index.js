'use strict';

const Discs = require('../database/schemas').discs;
const _region = {
	latitude: 45.52220671242907,
	longitude: -122.6653281029795,
	latitudeDelta: 0.2,
	longitudeDelta: 0.2
}
exports.add_new_disc = function(req, res){
    Discs.create({
		hole: req.body.hole,
		disctype: req.body.disctype,   
		brand: req.body.discbrand,                                             
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		course: req.body.course
	}).then((disc) => {
		console.log("disc: "+ disc.id +" created!")	
		res.status(200).send({status:"success", discId:disc.id});	
	}).catch((err) => {
		res.status(400).send({error:err});
		throw err;
	});
}

exports.get_discs = function(req, res){
	Discs.findAll({
		where:{
			course: req.body.course
		}
	}).then((discs) => {		
		res.status(200).send({
			"status":"success", 
			markers:discs, 
			region:_region
		})
	}).catch((err) => {
		console.log(err)
	});
}

