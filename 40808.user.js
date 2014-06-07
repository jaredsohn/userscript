// ==UserScript==
// @name           UserBlock Width Fix
// @namespace      UBWF@kwierso.com
// @description    widths are equal again!
// @include        http://*.roosterteeth.com/forum/viewTopic.php*
// ==/UserScript==

(function() {
var allComments = getUserElements(document);
for(i in allComments)
allComments[i].getElementsByTagName("td")[0].width = "100px";
})();

function getUserElements(element)
{
    //Create Array of All HTML Tags
	var allHTMLTags=element.getElementsByTagName('*');
    var classTags = new Array();
    //Loop through all tags using a for loop
    for (i=0; i<allHTMLTags.length; i++) 
    {
        //Get all tags with the specified class name.
        if (allHTMLTags[i].className=="comment" || allHTMLTags[i].className=="comment altComment") 
        {
            classTags.push(allHTMLTags[i]);
        }
    }
    return classTags;
}

function getElementsByClass(element, classname)
{
    //Create Array of All HTML Tags
	var allHTMLTags=element.getElementsByTagName('*');
    var classTags = new Array();
    //Loop through all tags using a for loop
    for (i=0; i<allHTMLTags.length; i++) 
    {
        //Get all tags with the specified class name.
        if (allHTMLTags[i].className==classname) 
        {
            classTags.push(allHTMLTags[i]);
        }
    }
    return classTags;
}