// ==UserScript==
// @name 	Ikariam: resource_littleimg
// @author 	snchun
// @version	1.0
// @description	A script for Ikariam
// @include		http://s*.ikariam.*/*
// @exclude		http://board.ikariam.*/*
// @require 	http://www.betawarriors.com/bin/gm/57756user.js
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js
// @require     http://flot.googlecode.com/svn/trunk/jquery.flot.js
// ==/UserScript==

var  page,opt

page = $('body:first').attr('id');

addlinkResource();
function addlinkResource()
{ 
try
{
	var mainNode = $('#cityNav li.viewIsland')
	for(var j=0 ; j< scriptRsc.length; j++)
		{ 
			if (scriptRsc[j].innerHTML.indexOf('tradegoodCounter') >= 0)
				{var tradegood = scriptRsc[j].innerHTML.split('tradegoodCounter')[1].split('value_')[1].split('"')[0];}
		}
		if (tradegood==null) {tradegood = "gold"}
	
	
		// add icon of saw mill
		$('<img id="wood_Island" src="skin/resources/icon_wood.gif">').appendTo(mainNode).click(
			function() {location.replace(url +'?view=resource&type=resource&id='+ idislandview);}
			);
		// add icon of tradegood
		$('<img id="tradegood_Island" src="skin/resources/icon_'+ tradegood +'.gif">').appendTo(mainNode).click(
			function(){location.replace(url +'?view=tradegood&type=tradegood&id='+ idislandview);}
			);
		// wood style
		$('img#wood_Island').css({'position':'absolute','left':'2px','top':'2px','height':'14px','width':'17px'})
			.hover(	function(){ $(this).css({'left':'0px','top':'0px','height':'18px','width':'21px'})},
					function(){ $(this).css({'left':'2px','top':'2px','height':'14px','width':'17px'})});
		// tradegood style
		$('img#tradegood_Island').css({'position':'absolute','left':'64px','top':'2px','height':'14px','width':'17px'})
			.hover(	function(){ $(this).css({'left':'62px','top':'0px','height':'18px','width':'21px'})},
					function(){ $(this).css({'left':'64px','top':'2px','height':'14px','width':'17px'})});
		

	
	
}
catch(er) 	{infoError("function addlinkResource ",er)}
}