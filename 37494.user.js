// ==UserScript==
// @name           fixresponselinks
// @namespace      frl@kwierso.com
// @description    groupstuff
// @include        http://*.roosterteeth.com/groups/forum/?id=*
// ==/UserScript==

(function(){
var hi = getElementByClass("keyword");
var holder;
for(i=0;i<hi.length;i++)
{
    if(!hi[i].href.match("/groups/"))
    {
        holder = hi[i].href.split("forum/")[0] + "groups/forum/" + hi[i].href.split("forum/")[1];
        hi[i].href = holder;
    }
}    
})();

var allHTMLTags = new Array();

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