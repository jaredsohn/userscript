// ==UserScript==
//
//Displayable Name of your script 
// @name           Travian Test
//
// brief description
// @description    A test of my userscript skills using the game travian.
//
//URI 
// ATnamespace      http://userscripts.org/scripts/show/153134
//
// @author         Nathan Harvey
//
// @license        Public domain 
//
//Version Number
// @version        0.1.5
//
// Urls process this user script on
// @include			http://ts2.travian.us/dorf*
// @include			http://ts2.travian.us/build.php*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @grant          unsafeWindow
//
// ==/UserScript==


//Want to send to the tag: <embed id="UserProfileMain" ...>

$(function(){

	if(document.location.href.indexOf("dorf1")!=-1){
		document.getElementById("header").innerHTML+= "<div id=\"AutoBuild\">AutoBuild</div>";
		document.getElementById("AutoBuild").addEventListener("click", function(){unsafeWindow.location.href = "build.php?id=1";}, true);
	}else if(document.location.href.indexOf("build.php")!=-1){
		$(".build").click();
	}
});