// ==UserScript==
// @name          Taringa Libre
// @namespace     http://remyticona.com/
// @author	      realtica
// @description   Por una taringa libre.
// @include       http://www.taringa.net/posts/*
// @exclude       http://realtica.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==
window.setTimeout(function() { 
//alert('Hello world!');
var allHTMLTags = new Array();
function removeads(theClass) {
//Create Array of All HTML Tags
var allHTMLTags=document.getElementsByTagName("*");
//Loop through all tags using a for loop
for (i=0; i<allHTMLTags.length; i++) {
//Get all tags with the specified class name.
if (allHTMLTags[i].className==theClass) {
//Place any code you want to apply to all
//pages with the class specified.
//In this example is to "display:none;" them
//Making them all dissapear on the page.
//allHTMLTags[i].style.display='none';
allHTMLTags[i].innerHTML="<font color='#434DE6'>P</font><font color='#4855E0'>o</font><font color='#4D5DDB'>r</font><font color='#5365D5'> </font><font color='#586DD0'>u</font><font color='#5D75CA'>n</font><font color='#627EC5'>a</font><font color='#6786BF'> </font><font color='#6D8EBA'>t</font><font color='#7296B4'>a</font><font color='#779EAF'>r</font><font color='#7CA6A9'>i</font><font color='#81AEA4'>n</font><font color='#86B69E'>g</font><font color='#8CBE99'>a</font><font color='#91C693'> </font><font color='#96CF8E'>l</font><font color='#9BD788'>i</font><font color='#A0DF83'>b</font><font color='#A6E77D'>r</font><font color='#ABEF78'>e</font><font color='#B0F772'>.</font>";
}
}
}

function cond(theClass) {

var allHTMLTags=document.getElementsByTagName("*");

for (i=0; i<allHTMLTags.length; i++) {

if (allHTMLTags[i].className==theClass) {
	removeads("byGoogle topAds");
removeads("byGoogle footerAds");
removeads("byYahoo");
//document.getElementById("aus").textContent="Taringa Libre.";
removeads("banner 728x90");
removeads("banner-300");
return;


}
}
}

cond("title");

}, 0);
