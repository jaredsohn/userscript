// Wiley++
// version 1.0
// 2010-10-16
// Copyright (c) 2010, ianonavy
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wiley++
// @namespace     http://ianonavy.tumblr.com/
// @description   Enables the Login button on WileyPlus.com and redirects directly to AP Computer Science
// @include       https://edugen.wiley.com/edugen/secure/index.uni
// @include       https://edugen.wiley.com/edugen/secure/global/login.uni
// @include       http://edugen.wiley.com/edugen/global/post_login.uni
// ==/UserScript==

switch (window.location.href)
{
	case "https://edugen.wiley.com/edugen/secure/index.uni":
		window.x = function(event){
			if (event.keyCode==13){
				document.forms.loginform.submit();
			}
		}
		document.getElementById("loginform").addEventListener('keypress',x,false);
		break;
	case "https://edugen.wiley.com/edugen/secure/global/login.uni":
		window.location.href = "https://edugen.wiley.com/edugen/secure/index.uni";
		break;
	case  "http://edugen.wiley.com/edugen/global/post_login.uni":
		window.location.href = "http://edugen.wiley.com/edugen/global/post_login.uni?goto=class&course=crs1815&domain=dmn17106&class=cls193884";
		// You might have to change this URL to the page you need to redirect to.
		break;
}