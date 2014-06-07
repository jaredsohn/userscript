// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Ajit Burad
// http://www.cse.iitb.ac.in/~ajitb
// http://burad.blogspot.com
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
 // select "URL Replacer", and click Uninstall.
//Author : Ajit Burad
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          URL Replacer - WoF
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Reemplaza fumetaswow.es por www.fumetaswow.es
// @include       http://*
// ==/UserScript==
 (function() {
 var redirects = new Array();
 function addRedirect(match, target) {
   if (typeof(match) != 'object') {
     match = [match];
   }
   redirects.push({
     match: match,
     target: target
   });
 }

 addRedirect(/^http\:\/\/fumetaswow.es\/(.*)/,
 'http://www.fumetaswow.es/$1');
 var _ = window.location;
 for (var i = 0; i < redirects.length; i++) {
   var match = redirects[i].match;
   var target = redirects[i].target;
   for (var j = 0; j < match.length; j++) {
     var tmp = _.href.replace(match[j], target);
     if (tmp != _.href) {
       _.href = tmp;
       return;
     }
   }
 }
 }) ();
var url1,url2;
url1 = ['fumetaswow.es'];
url2 = ['www.fumetaswow.es']; 
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
//
// ChangeLog
// 2010-11-30 - 0.3 - MAP - Actualizado para fumetas