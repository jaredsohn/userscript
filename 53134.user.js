// ==UserScript==
// @name Group banner1
// @description Changes the community forum banner
// @include http://*bungie.net/fanclub/245336/Forums/topics.aspx?forumID=251826*
// ==/UserScript==
var banner = document.getElementById("ctl00_forumHeader_groupForumHeaderPanel");
var bannerURL="";
switch(forumHeader.className)
{
case "group_forum_header":
    bannerURL = "http://img66.imageshack.us/img66/7042/1100.png";
    break;
}
if(bannerURL != "")
{
forumHeader.className = "";
forumHeader.style.backgroundImage = "url( " + bannerURL + ") ";
}