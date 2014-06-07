// ==UserScript==
// @name           StudiVZ
// @namespace      www.i-paths.com
// @description    Remove the style class .info [0] from home.php - Updates from www.i-paths.com.
// @creator        *groovy*
// @date           2007-12-29
// @include        http://www.studivz.net/home.php*

//Create an array 
var allPageTags = new Array(); 
var k=1;

function RemoveSomeClassElements(theClass) {
	var allPageTags=document.getElementsByTagName("*");
	for (i=0; i<allPageTags.length; i++)
		{
		if (allPageTags[i].className==theClass)
			{
			if(k == 2)//e.g.: if(k == 1 || k == 3 || k == 4) --> 1st, 3rd, 4th appereance from html element with class is filtered 
			{
				allPageTags[i].parentNode.removeChild(allPageTags[i]);
			}
			k++;
		}
	}
}

// ==UserScript==

RemoveSomeClassElements("info");