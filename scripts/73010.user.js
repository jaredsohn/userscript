// ==UserScript==

// @name         twitter fav
// @namespace    http://twitter.com
// @description  this script adds favorited botton on twitter home sidebar below favorites
// @include      http://twitter.com/*
// ==/UserScript==

var primary_nav = document.getElementById("primary_nav");
var newElement = document.createElement('li');
var tmp_string = primary_nav.innerHTML;
var screen_name = tmp_string.match(/twitter\.com\/([^/]+)\/favorites/)[1];

newElement.setAttribute("id", "profile_favorites_tab");
newElement.innerHTML = '<a href="http://favotter.net/user.php?user=' + screen_name + '><span>Favorited</span></a>';

primary_nav.appendChild(newElement);
