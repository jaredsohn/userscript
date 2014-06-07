// ==UserScript==
// @name          DiggAll
// @namespace     http://macprince.blogspot.com/
// @description   force Digg to display all comments
// @include       http://*digg.com/*
// ==/UserScript==
var expandbutton = document.getElementById('c-expand-all');
var all = window.location.href.search(/\/all$/);
if(expandbutton != null && all == -1){
	window.location.href = expandbutton;
}