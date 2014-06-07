// ==UserScript==
// @name           INNTV
// @namespace      http://www.inn.co.il/*
// @include        http://www.inn.co.il/*
// ==/UserScript==

window.addEventListener(
    'load', 
    function() {var URLscript=document.createTextNode('Play=function Play(video) { document.location.href=\'mms://media.a7.org/\' + video.url;}; Players[0].Play=function Play(video) { document.location.href=Players[0].video.url;}')
var Uscript = document.createElement('script');
	Uscript.setAttribute('language','javascript');
	Uscript.setAttribute('id','Ujs');
	document.body.appendChild(Uscript);
document.getElementById('Ujs').appendChild(URLscript);},
    true);

