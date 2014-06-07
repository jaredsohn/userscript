// ==UserScript==
// @name        Varamexia
// @namespace   Varamexia
// @description Varamexia colour changes
// @include     http://www.varamexia.com/game.php
// @version     1.6
// ==/UserScript==

Tie = function () {}; // Just defining the object.

Tie.id = function (what) {
	// E.G: Tie.id("mainDiv").innerHTML = "Content";
	return document.getElementById(what);
}
    
    Tie.alterDiv = function(where,what) {
        if (Tie.id(where)) {
            // Changes the inner html of a div/span/font/something with in ID tag.
            Tie.id(where).innerHTML = what;
        }
    }
        Tie.id("body").style.color = "#00FFFF";
        colorLinks("#00FF00");

function colorLinks(hex)
{
    var links = document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        if(links[i])
        {
            links[i].style.color = hex;  
        }
        if(links[i].oncontextmenu)
        {
            links[i].style.color = hex;  
        }
    }  
}
        
document.bgColor = "#000000";
document.color = "#00FFFF";

Tie.id("body").style.color = "#00FFFF";
