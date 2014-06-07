// ==UserScript==
//
// @name           PropertyNews.com
//
// @namespace      http://propertynews.com
//
// @description    Set the title to be the property name and expand the images
//
// @include        http://www.propertynews.com/brochure.php?*
// @exclude        http://www.propertynews.com/brochure.php?*&print=1
// ==/UserScript==

// grab the property title from the header
var titleTag = document.getElementsByTagName("h1")[0].innerHTML;
var i = titleTag.indexOf("<");
if (-1 != i)
	titleTag = titleTag.substr(0, i);
document.title = titleTag +	" at PropertyNews.com";

var brochureMainImageContainer = document.getElementById("brochureMainImageContainer");
var brochureImageGridContainer = document.getElementById("brochureImageGridContainer");

// expand the thumbnails
var divs = brochureImageGridContainer.getElementsByTagName("div");
for (var i = 0; i < divs.length; i++)
{
	var img = divs[i].getElementsByTagName("img")[0];
	img.src = img.src.replace("small", "medium");
}

// hide the switching main image if there are thumbnails
if (divs.length > 0)
	brochureMainImageContainer.style.display = "none";
