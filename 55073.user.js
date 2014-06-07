// ==UserScript==
// @name           Metric Conversion
// @namespace      GLB
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==

window.setTimeout( function() 
{
	main();
}, 100);

function main() {
	var tdVitals = getElementsByClassName("vital_data",document);
	var playerHt = tdVitals[0].innerHTML.split("in")[0];
	var playerWt = tdVitals[1].innerHTML.split("lbs")[0];
	
	playerHt = playerHt * 2.54;
	playerWt = playerWt * 0.453592;
	
	tdVitals[0].innerHTML = Math.round(playerHt*10)/10 + " cm";
	tdVitals[1].innerHTML = Math.round(playerWt*10)/10 + " kg";
};

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