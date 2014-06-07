// ==UserScript==
// @name           Replace Comment Replies
// @namespace      rcr@kwierso.com
// @description    On user's comment pages, fix the "reply" button to link to that user's profile page
// @include        http://*.roosterteeth.com/members/comments/*
// @include        http://*.roosterteeth.com/members/profile.php?uid=*
// ==/UserScript==

(function() {
    var allLinks = document.getElementById("pageContent").getElementsByTagName("a");
    var smallReplyLinks = [];
    var userBoxes = [];
    var userBoxParent;
    for(i in allLinks) {
        if(allLinks[i].className == "small" && allLinks[i].innerHTML == "<b>Reply</b>") {
            smallReplyLinks.push(allLinks[i]);
        }
    }
    
    for(j in smallReplyLinks) {
       userBoxParent = smallReplyLinks[j].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
       userBoxes.push(getUserElements(userBoxParent)[0]);
    }
    
    for(k in userBoxes) {
        userBoxes[k] = userBoxes[k].getElementsByTagName("a")[0].href.split("uid=")[1];
        smallReplyLinks[k].href = "http://" + document.domain + "/members/profile.php?uid=" + userBoxes[k] +"#Add a Comment";
        smallReplyLinks[k].removeAttribute("onclick");
    }
    
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
        if (allHTMLTags[i].className=="web2User" || allHTMLTags[i].className=="user") 
        {
            classTags.push(allHTMLTags[i]);
        }
    }
    return classTags;
}