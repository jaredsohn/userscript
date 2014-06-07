// ==UserScript==
// @name           	Catify
// @namespace      	http://userscripts.org/users/238471
// @description    	Erstatt tabloidbilder med katter
// @include		http://dagbladet.no/*
// @include       	http://*.dagbladet.no/*
// @include       	http://vg.no/*
// @include       	http://*.vg.no/*
// @include		http://nettavisen.no/*
// @include       	http://*.nettavisen.no/*
// @include       	http://aftenposten.no/*
// @include       	http://*.aftenposten.no/*
// ==/UserScript==


function catify(){
var images = document.getElementsByTagName('img');
for(var i=0; i < images.length; i++) {
	images[i].src = "http://placekitten.com/" + images[i].width + "/" + images[i].height; }
	var f = function(){return}; f();
}

window.addEventListener("load", function() {
  catify()
}, false);