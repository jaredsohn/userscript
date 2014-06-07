// ==UserScript==

// @name           Scouting Report Numbers (Test Server)

// @namespace      http://test.goallinebliz.com

// @description    Adds numbers to the scouting report bars

// @include        http://test.goallineblitz.com/game/player.pl?player_id=*

// ==/UserScript==

window.setTimeout( function() 
{


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var bars = getElementsByClassName("rating_bar",document);
for(var i=0; i<bars.length; i++)
{
	var element = bars[i].firstChild;
	var number = element.style.width;
	element.innerHTML = parseInt(element.style.width,10);
}
}, 100);