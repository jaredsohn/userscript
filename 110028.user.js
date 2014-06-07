// ==UserScript==
// @name           Display full names of Facebook Apps in Developer page
// @namespace      http://userscripts.org/scripts/show/110028
// @author         François Beaufort
// @include        https://developers.facebook.com/apps*
// @date           08/12/2011
// @version        1.0
// ==/UserScript==

document.querySelector(".devsitePage .bodyMenu").style.width = '100%'

var elements = document.querySelectorAll(".devsitePage .developerAppDashLeft .toplevelnav ul li a div.navSectionTitle");
for (var i=0; i<elements.length; i++){
    elements[i].style.width = '100%';
}
elements = document.querySelectorAll(".devsitePage .bodyMenu .toplevelnav ul li a.aWrap")
for (var i=0; i<elements.length; i++){
    elements[i].style.width = '90%';
}
elements = document.querySelectorAll(".devsitePage .body .content")
for (var i=0; i<elements.length; i++){
    elements[i].style.maxWidth = 'none';
}
