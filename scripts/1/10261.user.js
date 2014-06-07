// Basecamp - Coloured to-dos based on due dates
// Copyright (c) 2009,  Alex Burkhardt
// http://www.alex3d.de
// 10 January 2009 
//
// ==UserScript==
// @name        Basecamp - Coloured to-dos based on due dates
// @version     0.8.1
// @description Changes the Colour of To-Dos based on Dates [dd/mm/yy]
// @namespace   https://www.alex3d.de/
// @include     https://*.updatelog.*/*
// @include     https://*.clientsection.*/*
// @include     https://*.seework.*/*
// @include     https://*.grouphub.*/*
// @include     https://*.projectpath.*/*
// @include     https://*.basecamphq.*/*
// @include     http://*.updatelog.*/*
// @include     http://*.clientsection.*/*
// @include     http://*.seework.*/*
// @include     http://*.grouphub.*/*
// @include     http://*.projectpath.*/*
// @include     http://*.basecamphq.*/*
// ==/UserScript==
//
// How to use:
// When you have a to-do with a deadline, just add the date in the following format [dd/mm/yy].
// The script will then colour-code the to-do-item as follows:
// today -> orange
// within the next 7 days -> green
// more than seven days -> grey
// overdue - > red

var today = new Date();

textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var u = 0; u < textnodes.snapshotLength; u++) {
	 node = textnodes.snapshotItem(u);
	 s = node.data;
	
   var datum = s.match(/\[[\d]{2}\/[\d]{2}\/[\d]{2}\]/g);
   if(datum) {
       
       var datum1;
       var dateDisplayed;
       var future;
      	
       for (i=0;i<datum.length;i++) {
      		datum1 = datum[i].replace(/\[/g, "");
      		datum1 = datum1.replace(/\]/g, "");
      		datum1 = datum1.split(/\//g);
      		
      		dateDisplayed = new Date();
      		dateDisplayed.setYear( 20 + datum1[2]);
      		dateDisplayed.setMonth(datum1[1] - 1);
      		dateDisplayed.setDate(datum1[0]);

      		future = new Date();
      		future.setYear(today.getFullYear());  		
      		future.setMonth(today.getMonth());
      		future.setDate(today.getDate() + 7);
      

          toDostyle = getComputedStyle(node.parentNode, '');
          
          if (toDostyle.textDecoration == "line-through");
          
          else {

        		if(dateDisplayed.toString().substring(0,15) == today.toString().substring(0,15)) node.parentNode.setAttribute("style", "color: #FF8D1C"); //  today (in orange)	
        		else if(dateDisplayed > future) node.parentNode.setAttribute("style", "color: #A8A8A8"); // more than 7 day away (in grey)
        		else if(dateDisplayed > today && dateDisplayed <= future) node.parentNode.setAttribute("style", "color: #0EA93A"); //  within the next 7 days (in green)
  	 			  else if (dateDisplayed < today) node.parentNode.setAttribute("style", "color: #f00"); // overdue (in red)
               }
       }
	 }
}