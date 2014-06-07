/**
 * Facepunch Gold Member status
 * Version 0.4 - 17 April 2010
 * Copyright (c) 2009 a2h - http://a2h.uni.cc/
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// ==UserScript==
// @name          Facepunch Gold Member status
// @namespace     http://www.facepunch.com/*
// @description   Requirements for gold is put next to your login indicator, refreshes every 15 mins NOT ON EVERY PAGE LOAD
// @include       http://*.facepunch*.com/*
// ==/UserScript==

// v0.4 - added chrome support, and fixed for those who have their birthday set
// and yes i now hate chrome even more

if (typeof(google) == 'undefined')
{
	whatthehellchromestupidpieceofcrapimplementationofuserscripts();
}
else
{
	// http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + whatthehellchromestupidpieceofcrapimplementationofuserscripts + ')();'));
	document.head.appendChild(script);
}

function whatthehellchromestupidpieceofcrapimplementationofuserscripts()
{
(function($) {

// variables we need
var fpme = '';
var fpreg = '';
var fpregd = new Date();
var fpposts = '';
var fpnow = new Date();
var fpdiff = 0;
var fpgoldst = true;
var fpout = '';

$(document).ready(function() {
	// create the temporary holder
	$("body").append('<div id="fpgold-storage"></div>');
	$("#fpgold-storage").hide();
	
	// do we already have the variable ready?
	if (cookieGet('fpgold') != null)
	{
		var fpvars = cookieGet('fpgold').split(',');
		fpOut(fpvars[0],fpvars[1]);
	}
	else
	{
		fpme = $("#navbar-login a").attr('href').replace('member.php?u=', '');
		
		$("#fpgold-storage").load('http://www.facepunch.com/member.php?u=' + fpme + ' .smallfont.profilefield_list', '', function() {	
			var gothit = false;
			var gotwhat = 0; // 1 for reg, 2 for posts
			
			$("#fpgold-storage *").each(function() {
				if (!gothit)
				{
					if ($(this).get(0).tagName.toLowerCase() == 'dt')
					{
						if ($(this).text() == 'Join Date')
						{
							gothit = true;
							gotwhat = 1;
						}
						else
						{
							gothit = true;
							gotwhat = 2;
						}
					}
				}
				else
				{
					gothit = false;
					
					if (gotwhat == 1)
					{
						fpreg = $(this).text();
					}
					else if (gotwhat == 2)
					{
						fpposts = $(this).text().replace(',', '');
					}
				}
			});
			
			// all you have to do to make the vbulletin date be friendly is, strangely enough, kill the "th"!
			fpregd = new Date(fpreg.replace('th',''));
			fpnow = new Date();
			
			// difference...
			fpdiff = Math.round( ( ( fpregd.getTime() + 2 * 12 * 30 * 24 * 60 * 60 * 1000 ) - fpnow.getTime() ) / 1000 / 60 / 60 / 24 );
			
			// set the cookie for later...
			cookieSet('fpgold', fpdiff + ',' + fpposts, 15);
			
			// output!
			fpOut(fpdiff,fpposts);
		});
	}
});

function fpOut(fpdiff,fpposts)
{
	// work out the strings and we'll all be happy			
	if (fpdiff > 0)
	{
		fpout += '<abbr title="' + fpdiff + ' days" style="border-bottom: 1px dotted #444;">' + ( Math.round( fpdiff / 30 * 100 ) / 100 ) + ' months</abbr>';
		fpgoldst = false;
	}
	if (fpposts < 2000)
	{
		if (!fpgoldst) { fpout += ', '; }
		fpout += (2000 - fpposts) + ' posts';
		fpgoldst = false;
	}
	
	// add the info
	if (fpgoldst)
	{
		alert('You have no use for the "Facepunch Gold Member status" userscript anymore. Disable it.');
	}
	else
	{
		$("#navbar-login").append(' - ' + fpout + ' for gold');
	}
}

function cookieSet(name,value,minutes)
{
	// function originally by quirksmode
	if (minutes) {
		var date = new Date();
		date.setTime(date.getTime()+(minutes*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function cookieGet(name)
{
	// function by quirksmode
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

})(typeof(google) == 'undefined' ? unsafeWindow.jQuery : jQuery);

}

/*function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.body.appendChild(document.createElement('script')).innerHTML=a();
return;*/