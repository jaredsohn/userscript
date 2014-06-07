// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Mayur Jobanputra
// http://mayur.ca/apps
// --------------------------------------------------------------------
// A common problem on the web is that Google Apps users don't get
// branded Google Calendar links.  A good example is meetup.com
// where calendar export links aren't customized for Google Apps users. 
// I blogged about the specifics here: http://bit.ly/dR2yWd.  A common
// workaround is to change the URL so that www.google.com/calendar/event?
// is replaced with www.google.com/calendar/hosted/YOURDOMAINNAME/event?
// but that requires at least 4 braincells, which is 4 too many.
// Get this script and you can save your delicate noggin for something
// more beneficial like yawning, blinking, or watching pron.
//
// Credits: http://www.aburad.com/blog/2006/10/greasemonkey-script-to-replace-urls-in-webpage.html
// --------------------------------------------------------------------
//
// PLEASE CHANGE THE DOMAIN BELOW TO YOUR OWN
//
   var yourdomain
   yourdomain = ['yourdomain.com'];
//
//
// ==UserScript==
// @name          Google Calendar URL Fixer for Google Apps users
// @namespace     
// @description   Replaces Google Calendar Apps event links for Google Apps users
// @include       http://*
// @include       https://*
// ==/UserScript==



var url1,url2;
url1 = ['google.com/calendar/event?'];
url2 = ['google.com/calendar/hosted/' + yourdomain + '/event?' ]; 
var a, links;
var tmp="a";
var p,q;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
    for(var j=0;j<url1.length; j++)
	{
	tmp = a.href+"" ;
	if(tmp.indexOf(url1[j]) != -1)
	{
	p=tmp.indexOf(url1[j]) ;
	q="http://";
	q = q + url2[j] + tmp.substring(p+url1[j].length,tmp.length);
	a.href=q ;
	}
	}
    }



// Changelog
// 2010-12-10 Got it working but it has to be mucked around with by end user
