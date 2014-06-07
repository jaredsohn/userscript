// ==UserScript==
// @name           3ICE's Google Chrome Options Left Side Menu Resizer
// @namespace      http://3ice.hu/
// @version        1.0
// @description    Makes the left menu narrower in the new Google Chrome options page.
// @include        chrome://settings/*
// ==/UserScript==


/* You have to use this bookmarklet version for now, as extensions are not allowed to run there:

javascript:/*Bookmarklet by Daniel "3ICE" Berezvai <http://3ice.hu/>*/(function(){/*Resize navbar (-166px)*/document.getElementById("navbar-container").style.width="100px";/*Resize search box (-57px)*/document.getElementById("search-field").style.width="100px";/*Reduce mainview padding (-177px)*/document.getElementById("mainview").style.webkitPaddingStart="90px";})();


/**
 * main
 * @author 3ICE
 * @description This function makes sure we are in the options and then resizes the left navigation bar.
 */
(function(){
// Prevent the script from running on all websites.
// We have to check whether we are actually in the options or somewhere else.
// Why? Because in Chrome, @includes simply do not work as expected.
// See http://userscripts.org/topics/60691 for more details and discussion.
if(!document.location.href.match(/chrome:\/\/settings\//)){return;}

//Resize navbar (-166px), resize search box (-57px), reduce mainview padding (-177px)
document.getElementById("navbar-container").style.width="100px";
document.getElementById("search-field").style.width="100px";
//The {style.-webkit-padding-start} dot notation does not work here so I used {style.["-webkit-padding-start"]} first. Then I just dropped the dashes and it worked fine.
document.getElementById("mainview").style.webkitPaddingStart="90px";

})();