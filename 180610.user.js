// ==UserScript==
// @name        iRix - returnHome
// @namespace   http://dnk.nl/returnHome
// @description Terug naar hoofdpagina wanneer inactief
// @include     http://www.dnk.nl/*
// @include	http://10.86.210.8:9000/tms*
// @exclude	http://www.dnk/nl/beheer*
// @version     1.6
// @downloadURL https://userscripts.org/scripts/source/180610.user.js
// @updateURL   https://userscripts.org/scripts/source/180610.meta.js
// @icon        http://www.dnk.nl/favicon.png
// ==/UserScript==

var blured = false;
var home = "about:blank";
var blursec = 0;

function blurcount(){
	if(blured){
		if(blursec==120){
			document.location=home;
			blured=false;
			blursec=0;}
		else{
			blursec++;
			setTimeout(function(){blurcount()},1000);}}
	else{
		blursec=0;}}

document.onblur=function(){
	blured = true;
	if(document.URL.substr(0, 18)=="http://www.dnk.nl/"){
		if(document.URL!="http://www.dnk.nl/bioscoop/home"&&document.URL.substring(0,24)!="http://www.dnk.nl/beheer"){
			home="http://www.dnk.nl/algemeen/home";
			blurcount();}}
	else if(document.URL.substr(0, 28)=="http://10.86.210.8:9000/tms/"){
		if(window.location.hash!="#monitor_page#medium"){
			home="http://10.86.210.8:9000/tms/#monitor_page#medium";
			blurcount();}}}

document.onfocus=function(){
	blured = false;}