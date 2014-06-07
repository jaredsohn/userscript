// Lol* Images Only, a Greasemonkey user script
// Version 1.8  -- June 10 2009
// by Matthew R. Blissett <matthew.r.blissett@gmail.com>
//
// modified from Ben McMath's ichc images only script, which was
// modified from Jordon Kalilich's comment remover script
//
// further modified from ICHC Simplifier
// ==UserScript==
// @name          Lol* Images Only
// @namespace     http://userscripts.org/
// @description   Shows only the images and navigation, from the I Can Has Cheezburger family of websites
// @include       http://icanhascheezburger.com/*
// @include       http://totallylookslike.com/*
// @include       http://graphjam.com/*
// @include       http://punditkitchen.com/*
// @include       http://engrishfunny.com/*
// @include       http://failblog.org/*
// @include       http://roflrazzi.com/*
// @include       http://ihasahotdog.com/*
// ==/UserScript==

// figure out what page we are on for later
function whatPage()
{
	var locationString = window.location.toString();

/*	// if there is a www
	if(locationString.indexOf("www") != -1)
	{
		var startPoint = document.domain.length.toString()+13;
	}
	else
	{
		var startPoint = document.domain.length.toString()+17;
	}
*/
	var startPoint = parseInt(document.domain.length.toString()) + 13;

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
var navHTML = "<span style='font-size:60px;'><a href='http://" + document.domain.toString() + "/page/"+ (previousPageNum) +"'>&laquo; Prev</a>&nbsp;|&nbsp;<a href='http://" + document.domain.toString() + "/page/" + (nextPageNum) +"'>Next &raquo;</a></span>";
var bodies = document.getElementsByTagName("body");
bodies[0].innerHTML = "<center>" + "<br>" + outputString + navHTML + "</center>";