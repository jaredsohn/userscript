// ==UserScript==
// @name			Bahn.de Swap Departure/Destination
// @namespace		q
// @include			https://fahrkarten.bahn.de/*
// @include			https://www.bahn.de/*
// @grant			none
// @description		Adds a "swap" button to the departure/destination fields on bahn.de
// ==/UserScript==

var bahn_departure = document.getElementById('qf-departure-point');
var bahn_destination = document.getElementById('qf-destination-point');

function bahn_depdesttauschen() {
	var bahn_depdesttmp = bahn_destination.value;
	bahn_destination.value = bahn_departure.value;
	bahn_departure.value = bahn_depdesttmp;
	return false;
}

if( bahn_departure != null && bahn_destination != null ) {
	var button = document.createElement("input");
	button.type = "button";
	button.value = "↕";
	button.addEventListener("click",bahn_depdesttauschen,false);
	button.style.position = "absolute";
	button.style.right = "0";
	button.style.top = "1em";
	bahn_destination.parentNode.appendChild(button);
	bahn_destination.parentNode.style.position = "relative";
}