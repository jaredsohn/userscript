// ==UserScript==
// @name        serie-dl - EmbedUploadDownloader
// @namespace   http://userscripts.org/users/masternag
// @include     https://docs.google.com/document/*
// @version     1
// @grant       none
// ==/UserScript==

var content=document.getElementById('contents');
var firstc=content.childNodes[1];
var span=firstc.childNodes[0];
var footer=document.getElementById('footer');

var embcode = span.innerHTML;
// var newembcode = embcode+'&nbsp;<a href="http://adf.ly/2848436/' + embcode +'">Lien</a>';
// span.innerHTML = newembcode;

var newembcode = '&nbsp;-&nbsp;<a href="http://adf.ly/2848436/' + embcode +'">Lien serie-dl</a>';
var p = document.createElement("span");
p.innerHTML = newembcode;
footer.appendChild(p);