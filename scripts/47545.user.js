// ==UserScript==
// @name		Auto Access Google Webmaster Tools
// @author		Erik Vold
// @datecreated	2009-04-25
// @lastupdated	2009-09-10
// @namespace	autoAccessGoogleWebmasterTools
// @include		http://www.google.com/webmasters/start*
// @include		https://www.google.com/webmasters/start*
// @include		http://www.google.com/webmasters/
// @include		http://www.google.com/webmasters/#*
// @include		http://www.google.com/webmasters/?*
// @include		https://www.google.com/webmasters/
// @include		https://www.google.com/webmasters/#*
// @include		https://www.google.com/webmasters/?*
// @include		http://www.google.com/webmasters/index.html*
// @include		https://www.google.com/webmasters/index.html*
// @include		http://www.google.com/webmasters/index2.html*
// @include		https://www.google.com/webmasters/index2.html*
// @version		1.2
// @description	Auto presses the "Get Started" button, if it is displayed.
// ==/UserScript==

var autoAccessGoogleWebmasterTools = {};
autoAccessGoogleWebmasterTools.run = function(){
	var links = document.getElementsByTagName("a");
	var getStartedRegExp = /get(&nbsp;|\s)*started/i;
	var signInRegExp = /sign(&nbsp;|\s)*in/i;

	for(var i=0;i<links.length;i++){
		if( links[i].href.match( "https://www.google.com/webmasters/tools" ) && ( getStartedRegExp.exec( links[i].innerHTML ) || signInRegExp.exec( links[i].innerHTML ) ) ){
			break;
		}
	}

	/// redirect the user to the desired link
	window.location  = "https://www.google.com/webmasters/tools";
	return true;
};
// try to run the userscript
autoAccessGoogleWebmasterTools.run();