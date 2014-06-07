// ==UserScript==
// @name Scroll to top
// @namespace created by gala 
// @description Ugrás a lap tetjére
// @include http://ncore.cc/*
// @include https://ncore.nu/*
// @include https://ncore.cc/*
// @include http://ncore.nu/*
// ==/UserScript==
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  'function dothat() { window.scrollTo(0,0); }';
document.getElementsByTagName("head")[0].appendChild(scriptElement);
var styleelem = document.createElement('style');
styleelem.type = 'text/css';
styleelem.innerHTML =  '  #totop { position: fixed; bottom: 0;  right: 0; cursor: crosshair;  } .top { 	-moz-box-shadow:inset 0px 1px 0px 0px #ffffff; 	-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff; 	box-shadow:inset 0px 1px 0px 0px #ffffff; 	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf) ); 	background:-moz-linear-gradient( center top, #ededed 5%, #dfdfdf 100% ); 	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ededed", endColorstr="#dfdfdf"); 	background-color:#ededed; 	-moz-border-radius:1px; 	-webkit-border-radius:1px; 	border-radius:1px; 	border:1px solid #dcdcdc; 	display:inline-block; 	color:#777777; 	font-family:Arial Black; 	font-size:11px; 	font-weight:bold; 	padding:0px 4px; 	text-decoration:none; 	text-shadow:1px 1px 0px #ffffff; }.top:hover { 	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #dfdfdf), color-stop(1, #ededed) ); 	background:-moz-linear-gradient( center top, #dfdfdf 5%, #ededed 100% ); 	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#dfdfdf", endColorstr="#ededed"); 	background-color:#dfdfdf; }.top:active { 	position:relative; 	top:1px; } ';
document.getElementsByTagName("head")[0].appendChild(styleelem);
window.addButton = function () {
	var targetDiv = document.getElementById('container');
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'totop');
	var inputButton = document.createElement('div');
	inputButton.innerHTML = 'Lap tetejére';
	inputButton.setAttribute("class", "top");
	inputButton.setAttribute("onclick", "dothat();");
	newDiv.appendChild(inputButton); 
	targetDiv.appendChild(newDiv);
}
addButton();