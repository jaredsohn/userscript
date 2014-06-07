// ==UserScript==
// @name           What.CD? Post link under thread replies
// @namespace      http://death2y.uuuq.com/
// @description    adds another link to your posts at the bottom of a thread
// @include        http*://*what.cd/forums.php?*action=viewthread*
// ==/UserScript==

var postsUrl = GM_getValue("url",0);
if (postsUrl == 0) { //First run only, find the posts link
    window.alert("First run: Finding posts link");
    var links = document.getElementsByTagName("a");
    for (var i in links) {
        if (links[i].innerHTML == "Posts")
            GM_setValue("url",links[i].href);
    }
    postsUrl = GM_getValue("url",0);
}

//Create a new posts link
var postsLink = document.createElement("a");
postsLink.href = postsUrl;
postsLink.innerHTML = "Posts";
postsLink.title = "Go to my posts";

var lastpost = document.getElementsByTagName("table");
lastpost = lastpost[lastpost.length-1];

lastpost.parentNode.insertBefore(postsLink, lastpost.nextSibling);