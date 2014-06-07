// Basecamp - Colour Due Dates in To-Do Lists
// Copyright (c) 2009,  Alex Burkhardt
// http://www.alex3d.de
// 10 January 2009 
//
// Original script created by Alex Burkhardt
// 
// 28 February 2011 - Modified by sonar_m to handle new Bascamp format
// 06 February 2012 - Modified by Markp to give different colour scheme
// 07 February 2012 - Modified by Markp to exclude colours on the "Today" view page, as they are all the same (all green)
// 08 February 2012 - Modified by Markp to exclude colours on "Messages" and "Calendar" pages, where they are not appropriate
// 17 February 2012 - Modified by Markp to exclude colours on "Account" page, where they are not appropriate
// 30 March 2012 - Modified by Markp to put back colours on the "Today" page; in retrospect it seems better that way!
// 19 April 2012 - Modified by Markp to experiment with revised colour scheme to highlight tasks due yesterday in yellow and next week's tasks in light green
// 20 April 2012 - Modified by Markp to tweak the light green and grey colors (future tasks) to make them lighter and less obtrusive
// 14 May 2012 - Modified by Markp to exclude colours on "Files" page, where they are not appropriate
//
// ==UserScript==
// @name        Basecamp - Coloured to-dos based on due dates
// @version     1.0.10
// @description Changes the Colour of To-Dos based on Dates
// @namespace   https://www.posen.net/
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
// @exclude	https://*.basecamphq.*/*/posts/*
// @exclude	https://*.basecamphq.*/*/posts
// @exclude	https://*.basecamphq.*/*/milestones/*
// @exclude	https://*.basecamphq.*/account
// @exclude	https://*.basecamphq.*/projects/*/files
//
// ==/UserScript==
//
// How to use:
// When you have a to-do with a deadline, just set the date in Basecamp
// The script will then colour-code the to-do-item dates as follows:
// More than 1 week Old - > red
// Within the past 7 days -> orange
// Yesterday -> yellow
// Today -> green
// In the next 7 days -> light green
// In the future by more than 7 days -> grey

var today = new Date();

textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var u = 0; u < textnodes.snapshotLength; u++) {
	 node = textnodes.snapshotItem(u);
	 s = node.data;
	
   var datum = s.match(/\[[\d]{2}\/[\d]{2}\/[\d]{2}\]/g);
   var datum = s.match(/[\d]{1,2} [\w]{3} [\d]{4}/);
   if(datum) {
       
       var datum1;
       var dateDisplayed;
       var future;
	   node.parentNode.setAttribute("style", "color: black;background-color: #d8d8d8"); //Default format is black on grey
       for (i=0;i<datum.length;i++) {
      		datum1 =  datum[i].split(' ');
      		
      		dateDisplayed = new Date();
      		dateDisplayed.setYear(datum1[2]);
			var month = datum1[1]; 
			var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
			for(j=0;j<12;j++)
			{
				if(month == m_names[j])
				{
					dateDisplayed.setMonth(j);
					break;
				}
			}
      		dateDisplayed.setDate(datum1[0]);
      		future = new Date();
      		future.setYear(today.getFullYear());  		
      		future.setMonth(today.getMonth());
      		future.setDate(today.getDate() +1);

      		LastWeek = new Date();
      		LastWeek.setYear(today.getFullYear());  		
      		LastWeek.setMonth(today.getMonth());
      		LastWeek.setDate(today.getDate() -7);

      		NextWeek = new Date();
      		NextWeek.setYear(today.getFullYear());  		
      		NextWeek.setMonth(today.getMonth());
      		NextWeek.setDate(today.getDate() +7);

      		Yesterday = new Date();
      		Yesterday.setYear(today.getFullYear());  		
      		Yesterday.setMonth(today.getMonth());
      		Yesterday.setDate(today.getDate() -1);

            

          toDostyle = getComputedStyle(node.parentNode, '');
          
          if (toDostyle.textDecoration == "line-through");
          
          else {

       		if(dateDisplayed.toString().substring(0,15) == today.toString().substring(0,15)) node.parentNode.setAttribute("style", "color: white;background-color: #0EA93A"); //today (in green)
        	else if(dateDisplayed < today && dateDisplayed >= Yesterday) node.parentNode.setAttribute("style", "color: black;background-color: #FFFF00"); //yesterday (in yellow)
        	else if(dateDisplayed < Yesterday && dateDisplayed >= LastWeek) node.parentNode.setAttribute("style", "color: white;background-color: #FF8D1C"); //within the past 7 days (in orange)
  	 	else if(dateDisplayed < LastWeek) node.parentNode.setAttribute("style", "color: white;background-color: #f00"); //more than a week old (in red)
        	else if(dateDisplayed > today && dateDisplayed < NextWeek) node.parentNode.setAttribute("style", "color: black;background-color: #BCF5A9"); //Next week (in pale green)

// Orange: #FF8D1C - Grey: #d8d8d8 - Green: #0EA93A - Red: #f00 - Yellow: #FFFF00 - Blue: #0000ff - Pale Green: #BCF5A9
               }
        }
	 }
}