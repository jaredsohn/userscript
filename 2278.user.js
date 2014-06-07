// ==UserScript==
// @name          RecipeZaar Print Butler
// @description	  Removes extraneous items from the RecipeZaar print pages.  This could mean life or death for a rainforestoidal tree.
// @include       http://www.recipezaar.com/recipe/getrecipe.zsp?id=*&format=print
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

//Top stuff
/*document.getElementsByTagName("h3")[0].style.display = "none";
document.getElementsByTagName("b")[0].style.display = "none";
document.getElementsByTagName("a")[0].style.display = "none";
document.getElementsByTagName("form")[0].style.display = "none";
document.getElementsByTagName("input")[1].style.display = "none";
document.getElementsByTagName("input")[0].style.display = "none";
document.getElementsByTagName("p")[0].style.display = "none";
document.getElementsByTagName("p")[1].style.display = "none";*/
document.getElementsByTagName("div")[1].style.display = "none";
document.getElementsByTagName("div")[0].style.display = "none";

//Bottom stuff
document.getElementsByTagName("p")[3].style.display = "none";
document.getElementsByTagName("p")[4].style.display = "none";
document.getElementsByTagName("p")[5].style.display = "none";
/*
document.getElementsByTagName("img")[3].style.display = "none";
document.getElementsByTagName("img")[4].style.display = "none";
document.getElementsByTagName("img")[5].style.display = "none";
document.getElementsByTagName("img")[6].style.display = "none";
document.getElementsByTagName("img")[7].style.display = "none";
*/
document.getElementsByTagName("span")[6].style.display = "none";
document.getElementsByTagName("h3")[1].style.display = "none";