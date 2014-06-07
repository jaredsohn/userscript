// ==UserScript==
// @name          Myspace Clean redesigned login and logout Page
// @namespace     http://userstyles.org / userscripts.org
// @description	  Created: May 05th, 2009 Description : Modifies the myspace home / log in and log out page. Hides all the junk and styles the login form only shows and gets rid of the other crap. New update coming real soon. 'WORKS BEST with 1280x1024 res.  
// © 2005-2010 Xtremestylez.com All Rights Reserved * http://creativecommons.org/licenses/by-nc-nd/3.0/us/ * Designs by B.SkiLLs is licensed under a: Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 United States License. * Based on a work at xtremestylez.com - * Permissions beyond the scope of this license may be available at http://xtremestylez.com * 
// @author        B.SkiLLs
// @Website       http://xtremestylez.com
// @homepage      http://userscripts.org/users/101169
// @homepage      http://userstyles.org/styles/17679
// @include       http://myspace.com/*
// @include       http://www.myspace.com/
// @include       http://www.myspace.com/index.cfm?fuseaction=signout*
// ==/UserScript==
(function() {
var css = "#tkn_medrec, #aspnetForm{display:none!important;}\n\n\n\n\n\n\n\n#topnav, #leaderboard, #googleSearch, #googlead2, #squareAd, #col2, #findFriends, #marketing, #searchContainer_Header, #splashlinks, #Object1, #footer, #loginTabs {display:none!important;}\n\nbody, #wrap, #content, #header, #googlebar {\nbackground: #000 !important;\nmargin: 0 auto !important;\npadding: 0 !important;}\n\n#logIn {background-image: url(http://i41.tinypic.com/28u37dk.png)!important;}\n\n#content{background-color:black!important;}\n\nbody, #wrap {background-color:black!important;}\n\n#LoginForm  { visibility:visible!important;}\n\n#mslogo{\nposition: absolute!important;\nbackground-color:black!important;\ntop:50px!important;\nmargin-left:-90px!important;\nleft:50%!important;\nz-index:1!important;  \nvisibility:visible!important;}\n\n #col1 {\nposition: absolute!important;\nbackground-color:black!important;\ntop:100px!important;\nmargin-left:-200px!important;\nleft:50%!important;\nwidth:400px!important; \nheight:200px!important;\nz-index:1!important;  \nvisibility:visible!important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
