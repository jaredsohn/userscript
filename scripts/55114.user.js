// ==UserScript==
// @name           FoxNewsFeaturesAndFacesRemover
// @namespace      http://userscripts.org/users/60414
// @description    FoxNews - Removes "Features and Faces" section
// @include        http://www.foxnews.com/*
// @include        http://foxnews.com/*
// ==/UserScript==

var featuresFacesDiv = document.getElementById('FnF');

if(featuresFacesDiv) { 
	featuresFacesDiv.parentNode.removeChild(featuresFacesDiv);
	var p = featuresFacesDiv.parentNode.parentNode;

}