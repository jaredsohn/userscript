// ==UserScript==
// @name Group banner
// @description Changes the community forum banner
// @include http://*bungie.net/fanclub/201483/Forums/topics.aspx?forumID=207708*
// ==/UserScript==
var forumHeader = document.getElementById("ctl00_forumHeader_groupForumHeaderPanel");
var bannerURL="";
switch(forumHeader.className)
{
case "group_forum_header":
    bannerURL = "http://i660.photobucket.com/albums/uu330/orpheosis/header.png";
    break;
}
if(bannerURL != "")
{
forumHeader.className = "";
forumHeader.style.backgroundImage = "url( " + bannerURL + ") ";
}