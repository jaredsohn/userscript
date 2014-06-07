// ==UserScript==
// @name        Global Fame Media for Popmundo
// @namespace   http://germana-ex.tumblr.com/
// @description Global fame and media coverage to Popmundo V2. Also adds base prive to clube tickets. Any problems, contact German Ex (charId=1296241)
// @include     http://*.popmundo.com/World/Popmundo.aspx/Artist/Popularity/*
// @version     1.1.4
// @downloadURL    https://userscripts.org/scripts/source/135551.user.js
// @updateURL      https://userscripts.org/scripts/source/135551.meta.js
// @grant       none
// ==/UserScript==

const numCities = 49;
var mediaFame = 0;
var mediaMC = 0;

//Calc world fame media
jQuery("a[href^='/World/Popmundo.aspx/Help/Scoring/']")
.each(function()
{
	//media value;
	var tmpVal = jQuery(this).attr('title');
	tmpVal = tmpVal.replace('/26','');
	//Increases the media
	mediaFame += parseInt(tmpVal);
});

//Calc world media coverage
jQuery("#tablefame div[class$='ProgressBar']")
.each(function()
{
	//media value;
	var tmpVal = jQuery(this).attr('title');
	tmpVal = tmpVal.replace('%','');
	
	//Increases the media
	mediaMC += parseInt(tmpVal);
});

//Add global line to table
jQuery("tr:first")
.after(function()
{
	var mediaFame_val = mediaFame / numCities;
	mediaFame_val = mediaFame_val.toFixed(2);
	
	var mediaMC_val = mediaMC / numCities;
	mediaMC_val = mediaMC_val.toFixed(2)	
		
	var tmpVal = '<tr class="even" style="font-weight:bold;"><td>Global</td><td>'+mediaFame_val+'</td><td>'+mediaMC_val+'%</td></tr>';
	jQuery(this).after(tmpVal);
});

//Adds number to quality
jQuery("a[href^='/World/Popmundo.aspx/Help/Scoring/']")
.each(function()
{
	//media value;
	var tmpVal = jQuery(this).attr('title');
	tmpVal = tmpVal.replace('/26','');
	
	switch(parseInt(tmpVal))
	{
		case(0): tmpVal = tmpVal+' - 5$'; break;
		case(1): tmpVal = tmpVal+' - 5$'; break;
		case(2): tmpVal = tmpVal+' - 5$'; break;
		case(3): tmpVal = tmpVal+' - 7$'; break;
		case(4): tmpVal = tmpVal+' - 9$'; break;
		case(5): tmpVal = tmpVal+' - 12$'; break;
		case(6): tmpVal = tmpVal+' - 15$'; break;
		case(7): tmpVal = tmpVal+' - 18$'; break;
		case(8): tmpVal = tmpVal+' - 20$'; break;
		case(9): tmpVal = tmpVal+' - 25$'; break;
		case(10): tmpVal = tmpVal+' - 30$'; break;
		case(11): tmpVal = tmpVal+' - 35$'; break;
		case(12): tmpVal = tmpVal+' - 40$'; break;
		case(13): tmpVal = tmpVal+' - 45$'; break;	
		case(14): tmpVal = tmpVal+' - 50$'; break;	
		case(15): tmpVal = tmpVal+' - 65$'; break;		
		case(16): tmpVal = tmpVal+' - 70$'; break;
	}		
	
	jQuery(this).text(jQuery(this).text()+' ('+tmpVal+')');
});


