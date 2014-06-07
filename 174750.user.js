// ==UserScript==
// @name        Achaea forums ignore script
// @namespace   http://userscripts.org
// @description Blocks posts, quotes and reactions from specified users on the Achaean forums
// @include     http://forums.achaea.com/discussion/*
// @version     4
// @grant       none
// @run-at      document-ready
// ==/UserScript==

//add a person to this list, enclosing their name with "" and ending with ,
var userlist = [
"Flowerpot",
];

var postsToDelete = document.querySelectorAll(".Author");
var reactionsToDelete = document.querySelectorAll(".UserReactionWrap");
var quotesToHide = document.querySelectorAll(".QuoteAuthor");
var onlineUsersToHide = document.querySelectorAll(".OnlineUserName");

for (var i=0; i < postsToDelete.length; i++)
{
    if (userlist.indexOf(postsToDelete[i].querySelector(".Username").innerHTML) > -1)
    {
        postsToDelete[i].parentNode.parentNode.parentNode.parentNode.style.display = 'none';
    }
}

for (var i=0; i < reactionsToDelete.length; i++)
{
    if (userlist.indexOf(reactionsToDelete[i].querySelector(".ProfilePhoto").getAttribute("alt")) > -1)
    {
        reactionsToDelete[i].style.display = 'none';
    }
}

for (var i=0; i < quotesToHide.length; i++)
{
    if (userlist.indexOf(quotesToHide[i].firstChild.innerHTML) > -1)
    {
        quotesToHide[i].parentNode.style.display = 'none';
    }
}

for (var i=0; i < onlineUsersToHide.length; i++)
{
    if (userlist.indexOf(onlineUsersToHide[i].innerHTML) > -1)
    {
        onlineUsersToHide[i].parentNode.style.display = 'none';
        document.querySelector(".Count").innerHTML -= 1;
    }
}
