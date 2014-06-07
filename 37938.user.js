// ==UserScript==
// @name           Group Forum Mod History Fix
// @namespace      fmh@kwierso.com
// @description    Fixes the "parent" link for group forum posts in mod histories.
// @include        http://*.roosterteeth.com/members/modHistoryView.php?a=groupPosts&i=*
// ==/UserScript==

(function(){
var hi = getElementByClass("small");
var holder;
for(i=0;i<hi.length;i++)
{
    if(hi[i].innerHTML == "<b>Go to Parent</b>")
    {
        hi[i].href = hi[i].href.split("members/")[0] + "groups/forum/viewTopic.php?id=" + hi[i].href.split("members/")[1];
    }    
}
})();

function getElementByClass(theClass) 
{
    var allkeywordtags = new Array();
	//Create Array of All HTML Tags
	var allHTMLTags=document.getElementsByTagName("*");

	//Loop through all tags using a for loop
	for (i=0; i<allHTMLTags.length; i++) 
	{
		//Get all tags with the specified class name.
		if (allHTMLTags[i].className==theClass) 
		{
            allkeywordtags.push(allHTMLTags[i]);
		}
	}
    return allkeywordtags;
}