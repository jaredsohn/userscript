// ==UserScript==

// @name           Comparison Helper

// @namespace      http://goallinebliz.com

// @include        http://goallineblitz.com/game/compare_teams.pl?*

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
var teams = getElementsByClassName("ratings",document);
var team1 = teams[0];
var team2 = teams[1];

var ratings1=[];
var ratings2=[];


var ratingElements1 = getElementsByClassName("rating_bar",team1);

for (var i=0; i<ratingElements1.length; i++)
{
	ratings1[i]=ratingElements1[i].firstChild.innerHTML;
	//ratingElements1[i].firstChild.innerHTML="A";
}


var ratingElements2 = getElementsByClassName("rating_bar",team2);

for (var i=0; i<ratingElements2.length; i++)
{
	ratings2[i]=ratingElements2[i].firstChild.innerHTML;
	//ratingElements2[i].firstChild.innerHTML="A";
}

for (var i=0; i<ratings2.length; i++)
{
	var rating1 = parseFloat(ratings1[i]);
	var rating2 = parseFloat(ratings2[i]);

	if(rating1>rating2)
	{
		ratingElements1[i].style.background = "#A1F4FF";
		ratingElements2[i].style.background = "#FF9393";
	}
	else if(rating2>rating1)
	{
		ratingElements2[i].style.background = "#A1F4FF";
		ratingElements1[i].style.background = "#FF9393";
	}
	else
	{

	}
}



}, 100);