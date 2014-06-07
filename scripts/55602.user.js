// QSS Random Movie Button
// Made by Jeremy Neiman - docmarionum1
// version 0.0
// First Release: 2009-09-13
// Last Update: 2009-09-13
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// This script will create a button to pick a random movie from QSS and play it.
//
//
//
// ==UserScript==
// @name          QSSRandomMovieButton
// @namespace     
// @description   Creates a random movie button
// @include       http://quicksilverscreen.com/*
// @exclude      
// ==/UserScript==


var movies;
var doc = document.createElement("div");
var movieString;

xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=onResponse;
xmlhttp.open("GET","http://quicksilverscreen.com/videos?c=2&pt=list",true);
xmlhttp.send(null);

function getBody(content) 
{
   test = content.toLowerCase();  
   var x = test.indexOf("<body");
   if(x == -1) return "";

   x = test.indexOf(">", x);
   if(x == -1) return "";

   var y = test.lastIndexOf("</body>");
   if(y == -1) y = test.lastIndexOf("</html>");
   if(y == -1) y = content.length; 

   return content.slice(x + 1, y);   
} 


function onResponse()
{
	if(xmlhttp.readyState!=4) return;
	doc.innerHTML = getBody(xmlhttp.responseText);
	movies = doc.getElementsByTagName("a");
	assignMovie();
	writeLink();
}

function assignMovie()
{
	var randomnumber = Math.floor(Math.random() * (movies.length + 1));
	if (movies[randomnumber].href.indexOf("watch?video=") > -1)
	{
		movieString = movies[randomnumber].href;
	}
	else
	{
		assignMovie();
	}
}


function writeLink()
{
	var allHTMLTags=document.getElementsByTagName("*");

	var newText = '<ul><li class="firstItem"><a href="http://quicksilverscreen.com/videos?c=1">TV Shows</a><li><a href="http://quicksilverscreen.com/videos?c=2">Movies</a><li><a href="' + movieString + '">Random Movie</a><li><a href="http://quicksilverscreen.com/videos?c=112">Cartoons</a><li><a href="http://quicksilverscreen.com/videos?c=44">Documentaries</a><li><a href="http://quicksilverscreen.com/videos?c=30">Music Videos</a><li><a href="http://livesport.fm/" target="_blank">Live Sport</a><li><a href="http://openflv.com" target="_blank">OpenFlv</a><li><a href="http://quicksilverscreen.com/chat/" target="_blank">Chat</a><li><a href="http://qssgames.com" target="_blank">Qss Games</a><li class="lastItem"><a href="http://ipb.quicksilverscreen.com/">Forum</a></ul>';


	for (i=0; i<allHTMLTags.length; i++) 
	{
		if (allHTMLTags[i].className=="menu") 
		{
			allHTMLTags[i].innerHTML = newText;
			break;
		}
	}
}