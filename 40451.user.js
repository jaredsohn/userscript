// ==UserScript==
// @name           TogglePosts
// @namespace      tp@kwierso.com
// @description    Toggle Messages on RT!
// @include        http://*.roosterteeth.com/forum/viewTopic.php*
// @include        http://*.roosterteeth.com/members/profile.php?*
// @include        http://*.roosterteeth.com/members/comments/*
// @include        http://*.roosterteeth.com/members/journal/entry.php?*
// @include        http://*.roosterteeth.com/members/images/image.php?*
// @include        http://*.roosterteeth.com/media/viewItem.php?*
// @include        http://*.roosterteeth.com/archive/episode.php?*
// @include        http://*.roosterteeth.com/groups/news/entry.php*
// @include        http://*.roosterteeth.com/groups/forum/viewTopic.php*
// ==/UserScript==

(function()
{
    var allHTMLTags=[];
    var commentTags=[];

    //Create Array of All HTML Tags
    allHTMLTags=document.getElementsByTagName('*');

    //Loop through all tags using a for loop
    for (i=0; i< allHTMLTags.length; i++) 
    {
        //Get all tags with the specified class name.
        if (allHTMLTags[i].className=="comment" || allHTMLTags[i].className=="comment altComment") 
        {
            commentTags.push(allHTMLTags[i]);
        }
    }
    for(i in commentTags)
    {
        var header = getElementsByClass(commentTags[i], "header")[0];
        var toggleLink = document.createElement("a");
        toggleLink.innerHTML = "Hide Post";
        toggleLink.className = "small";
        toggleLink.addEventListener("click", function () {
            if(this.innerHTML == "Hide Post")
            {
                this.innerHTML = "Show Post";
                getElementsByClass(this.parentNode.parentNode.parentNode, "commentPost")[0].style.display = 'none';
            }
            else
            {
                this.innerHTML = "Hide Post";
                getElementsByClass(this.parentNode.parentNode.parentNode, "commentPost")[0].style.display = '';
            }
        }, false);
        
        
        header.appendChild(document.createTextNode(" - [ "));
        header.appendChild(toggleLink);
        header.appendChild(document.createTextNode(" ]"));
    }
})();

function getElementsByClass(element, theClass)
{
    //Create Array of All HTML Tags
	var allHTMLTags=element.getElementsByTagName('*');
    var classTags = new Array();
    //Loop through all tags using a for loop
    for (i=0; i<allHTMLTags.length; i++) 
    {
        //Get all tags with the specified class name.
        if (allHTMLTags[i].className==theClass) 
        {
            classTags.push(allHTMLTags[i]);
        }
    }
    return classTags;
}