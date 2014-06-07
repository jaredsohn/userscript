// ICHC Images Only, a Greasemonkey user script
// Version 0.2 - Mar 18, 2008
// by Ben McMath
//
// modified from Jordon Kalilich's comment remover script
//
// further modified from ICHC Simplifier
// ==UserScript==
// @name          ICHC images only
// @namespace     http://userscripts.org/
// @description   Removes all but the images from icanhascheezburger.com.
// @include       http://icanhascheezburger.com/
// @include       http://icanhascheezburger.com/page/*

// ==/UserScript==

// figure out what page we are on for later
function whatPage()
{
	var locationString = window.location.toString();
	var startPoint = 0;
	// if there is a www
	if(locationString.indexOf("www") != -1)
	{
		startPoint = 39;
	}
	else
	{
		startPoint = 35;
	}	
	
	var stopPoint = locationString.length-1;
	
	var pageNum = locationString.substring(startPoint,stopPoint);
	
	// if we get back "/" then we are on the first page (ie http://icanhascheezburger.com/)
	if(pageNum != "/")
	{
		return pageNum;
	}
	else 
	{
		return 1;
	}
}

var imgsrc = document.getElementsByName("easyshare2");

var outputString = "";

// gather all the image locations
for(var i=0; i<imgsrc.length; i++)
{
	 outputString += imgsrc[i].value + "<BR><BR>";
}

// get what page we are on
var pageNum = parseInt(whatPage());

// if we are on page one, then set previous to page one
if(pageNum == 1)
{
	var previousPageNum = 1;
}
else // else previous page is one less
{
	var previousPageNum = pageNum-1;
}

// next page is always +1 (*1 to convert string to num)
var nextPageNum = (pageNum*1) + 1;

// build navigation for bottom
var navHTML = "<span style='font-size:60px;'><a href='http://www.icanhascheezburger.com/page/"+ (previousPageNum) +"'>&laquo; Prev</a>&nbsp;|&nbsp;<a href='http://www.icanhascheezburger.com/page/"+ (nextPageNum) +"'>Next &raquo;</a></span>";
var bodies = document.getElementsByTagName("body");
bodies[0].innerHTML = outputString + navHTML;