// ==UserScript==
// @name            Block Social Network Site Profile
// @author          zxi
// @namespace       http://userscripts.org
// @description     Block a specific user profile on a social networking site
// @license         Creative Commons Attribution License
// @version	        1.0
// @include http://www.twitter.com/username
// @include http://twitter.com/username
// @include https://twitter.com/username
// @include https://twitter.com/#!/username
// @include http://twitter.com/#!/user
// @include https://www.twitter.com/#!/user
// @compatible      Greasemonkey
// ==/UserScript==

/*
About

Say you breakup with your boyfriend/girlfriend. You want to stop checking her twitter page, but don't want to block entire twitter. 
Change the URL's in @include to the persons profile you do not wish to see, and vola.

*/

	
document.body.innerHTML = "<br><br><center><h1>BLOCKED.</h1></center>";
