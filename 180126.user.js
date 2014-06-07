// ==UserScript==
// @name        OSM History viewer
// @namespace   www.binaervarianz.de/chaos/OSM_History_Viewer
// @description Adds a OSM History viewer Link to the Changeset page of OSM
// @include     http://www.openstreetmap.org/browse/changeset/*
// @version     1
// @grant       none
// ==/UserScript==


// debug code to show if script is active
// var title = document.getElementById("history_tab");
// title.style.backgroundColor='red';

// base urls for the external services
var baseUrl = "http://osmhv.openstreetmap.de/changeset.jsp?id=";
var baseUrlHDYC = "http://hdyc.neis-one.org/?";
var baseUrlHeat = "http://yosmhm.neis-one.org/?"

// get changeset id
var map = document.getElementById('small_map');
var changeset = map.getAttribute('data-id');

// get object of link list on top
var linkLists = document.getElementsByClassName('secondary-actions clearfix');
var firstLinkList = linkLists[0];

// create history viewer link
var newLink = document.createElement('a');
newLink.href = baseUrl.concat(changeset);
newLink.appendChild(document.createTextNode("History Viewer"));
var newListEntry = document.createElement('li');
newListEntry.appendChild(newLink);

firstLinkList.appendChild(newListEntry);
     
// get the user name & object of username paragraph   
var baseSet = document.getElementsByClassName('browse-section common')[0];                           
var belongs = baseSet.getElementsByTagName('div')[2];
var userName = belongs.getElementsByTagName('p')[0];
var nameString = userName.childNodes[0].innerHTML

// create the how-did-you-contribute link
var newLink = document.createElement('a');
newLink.href = baseUrlHDYC.concat(nameString);
newLink.appendChild(document.createTextNode("HDYC-Link"));
var spaces = document.createTextNode(" | ");
userName.appendChild(spaces);
userName.appendChild(newLink);

// create heatmap link
var newLink = document.createElement('a');
newLink.href = baseUrlHeat.concat(nameString);
newLink.appendChild(document.createTextNode("Heatmap"));
var spaces = document.createTextNode(" | ");
userName.appendChild(spaces);
userName.appendChild(newLink);
