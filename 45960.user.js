// ==UserScript==

// @name           Instructables - Enable Allsteps

// @namespace      http://userscripts.org/scripts/show/45960

// @description    Enables the button for Allsteps when not signed in

// @include        http://www.instructables.com/id/*

// ==/UserScript==



d=document.getElementById('allsteps_top').parentNode

a=document.getElementById('allsteps_top').childNodes[0].cloneNode(true)



// force redirect onclick

d.addEventListener(

	"click", 

	function(event) {

		window.location.href+='?ALLSTEPS'	}, 

	true

);



// block login request by removing unneeded nodes

a.attributes[1].nodeValue=window.location.href+'?ALLSTEPS'

a.childNodes[0].style.border='4px solid #ffffff'

while (d.hasChildNodes()) {

	d.removeChild(d.firstChild)}

d.appendChild(a)