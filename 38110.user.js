// ==UserScript==
// @name           Group Mark as Read
// @namespace      gmr@kwierso.com
// @include        http://*.roosterteeth.com/groups/forum/index.php?id=*
// @include        http://*.roosterteeth.com/groups/forum/?id=*
// ==/UserScript==

(function(){
var hi = getElementByClass("small");
var holder = document.URL;
var fid = document.URL.split("id=")[1];
var half;
for(i=0;i<hi.length;i++)
{
    if(hi[i].innerHTML == "Mark Forum as Read")
    {
        half = hi[i].href.split("?")[0];
        hi[i].href = half + "?return=/groups/forum/index.php?id=" + fid;
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