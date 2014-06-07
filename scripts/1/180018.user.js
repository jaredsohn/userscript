// ==UserScript==
// @author         	Boban Stajic
// @name           	FB Like Popup Remover
// @version			1.0.2
// @namespace      	bobans
// @require        	https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include			http://nesvesti.com/*
// @include			http://filip.pogledaj.org/*
// @include			http://zabavniklipovi.org/*
// @include			http://*.extraslike.com/*
// @description    	Removes Facebook Like popup from specified web sites.
// ==/UserScript==

var properties = {
	'sites' : {
		'nesvesti.com' : [
			'facebooktrafficdrivermask',
			'facebooktrafficdriver'
		],
		'filip.pogledaj.org' : [
			'spu-bg',
			'spu-main'
		],
		'zabavniklipovi.org' : [
			'spu-bg',
			'spu-main'
		],
		'extraslike.com' : [
			'spu-bg',
			'spu-main'
		]
	}
};

$(document).ready(function() {
	for(site in properties.sites) {
		debugger;
		if(window.location.href.indexOf(site) > 0) {
			for(id in properties.sites[site]) {
				debugger;
				$('#' + properties.sites[site][id]).remove();
			}
		}
	}
});