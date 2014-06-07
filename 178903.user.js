// ==UserScript==
// @name           Make Wikipedia sections collapsible
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version        2.0
// @namespace      0ae907d5c85684cc01041ad40d3053@gmail.com
// @author         0ae907d5c85684cc01041ad40d30537a
// @description    Attaches accordion behavior to rarely used/read sections of Wikipedia
// @include        http://en.wikipedia.org/wiki/*
// @include        http://sl.wikipedia.org/wiki/*
// @include        http://simple.wikipedia.org/wiki/*
// @run-at         document-end
// ==/UserScript==

// To edit which sections get collapsed modify the appropriate array for your language.

// To add a new language:
// 	1. create a new array
// 	2. add ids of sections you want to collapse 
//	3. update "languages" array with your newly created array

// English
var en = new Array( "#External_links",
		    "#Further_reading",
		    "#References",
		    "#Notes",
		    "#See_also");

// Slovene
var sl = new Array( "#Viri",
		    "#Glej_tudi",
		    "#Zunanje_povezave");	

// add a reference to any self-made array here
// combines languages into a single array
var languages = [en, sl];

// add a common class & collapse by default
for (i=0; i<languages.length; i++)
	for(j=0; j<languages[i].length; j++)
	{
		$(languages[i][j]).parent().addClass('collapsibleSection');
		$(languages[i][j]).parent().next().slideUp();
	}

// on click: toggle visibility
$('.collapsibleSection').on( "click", function(){ $(this).next().slideToggle('300ms'); });