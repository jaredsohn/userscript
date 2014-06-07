// ==UserScript==
// @name          TO1 Login V2.5
// @namespace     http://userscripts.org/people/17268
// @description	  TO1 Login V2.5
// @include 	  http://myspace.com/
// @include       http://www.myspace.com/
// @include	  http://www.myspace.com/index.cfm?fuseaction=splash*
// ==/UserScript==


	s= 'body {background-color:black; padding-top:10px;}\n';
	s+= '#header, #footer, #loginGreeting {display:none !important;}\n';
	s+= '* {visibility:hidden;}\n';
	s+= '#splash_login {visibility:visible; position:absolute; left:50%; margin-left:-150; width:300; background-color:white; -moz-border-radius:15px;}\n';
	s+= '#topnav, #topnav *, #splash_login * {visibility:visible;}\n';
	s+= '#topnav {background-color:navy; -moz-border-radius:15px;}\n';
	s+= 'h5.heading {background-color:navy !important; -moz-border-radius:15px 15px 0px 0px !important;}\n';

GM_addStyle(s);