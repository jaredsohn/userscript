// ==UserScript==
// @name Group banner
// @description Changes the community forum banner
// @include http://*bungie.net/fanclub/245336/Forums/topics.aspx?forumID=251826*
// ==/UserScript==
var forumHeader = document.getElementById("ctl00_forumHeader_groupForumHeaderPanel");
var bannerURL = "http://img66.imageshack.us/img66/7042/1100.png";
switch(forumHeader.className)
{
case "group_forum_header":
    bannerURL = "";
    break;
}
if(bannerURL != "")
{
forumHeader.className = "";
forumHeader.style.backgroundImage = "url( " + bannerURL + ") ";
}