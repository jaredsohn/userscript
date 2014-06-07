// ==UserScript==
// @name        Highlight Players
// @namespace   Highlight Players
// @description Highlight players based on their game status
// @grant 	none
// @include     http://games.espn.go.com/ffl/boxscorequick*
// @version     1.0
// ==/UserScript==
function onLoad ()
{
    var colorMap = {
	over: "darkred",
	happening: "darkblue",
	scheduled: "darkgreen"
    };

    var getPlayerDivs = function ()
    {
	return document.getElementsByClassName("pncPlayerRow");
    };
    
    var getGameColor = function  (div)
    {
	var j = div.getElementsByClassName("gameStatusDiv");
	if (!(j && j[0])) {
	    return undefined;
	}
	
	var a = j[0].getElementsByTagName("a");

	if (!(a && a[0]))
	{
	    return undefined;
	}

	var text = a[0].innerHTML;
	console.log(text);
	if(/[WL]/.test(text))
	{
	    return colorMap.over;
	}
	else if (/(Sun|Mon|Thu)/.test(text))
	{
	    return colorMap.scheduled;
	}
	else
	{
	    return colorMap.happening;
	}
    };

    var divs = getPlayerDivs();
    for(var i = 0; i < divs.length; i++)
    {
	var div = divs.item(i);
	var color = getGameColor(div);

	if(color)
	    div.style.color = color;	    
    }
}

document.addEventListener( "DOMContentLoaded", 
			   function(){
			       document.removeEventListener("DOMContentLoaded",
							    arguments.callee,
							    false );
			       onLoad();
			   }, false );
