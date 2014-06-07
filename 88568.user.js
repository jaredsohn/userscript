// ==UserScript==
// @name           ba2
// @namespace      c:\ab2.user.js
// @include        http://bikeaction.pl/forum/
// ==/UserScript==
function getElementsByClass(searchClass) {
	var classElements = new Array();
	var els = document.getElementsByTagName('*');
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

allElements = getElementsByClass( "forabg_kfp" )
elemCount = allElements.length
for( i = 0; i < elemCount; ++i ) 
{
	if (allElements[i].innerHTML.search("http://bikeaction.pl/forum/mtb-street-dirt-slope-f86.html")!=-1)
	allElements[i].innerHTML = ""
}

allElements = getElementsByClass( "cat_bg" )
elemCount = allElements.length
for( i = 0; i < elemCount; ++i ) 
{
	if (allElements[i].innerHTML.search("bikecheck")!=-1)
	allElements[i].innerHTML = ""
}
document.body.innerHTML = document.body.innerHTML.replace(/<div class=\"cat_bg\"><\/div>/g,"");

