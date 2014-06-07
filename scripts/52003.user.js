// ==UserScript==
// @name           New Banners
// @namespace      Script by Luke35120   Banners by PKF_647
// @description    Replaces Community banner, Universe banner, Flood banner, Gallery banner, and Halo 3 banner.
// @include        http://*bungie.net/Forums/topics.aspx?forumID=*
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// @include        http://*bungie.net/Forums/createpost.aspx?postID=*&act=reply
// ==/UserScript==
var forumHeader = document.getElementById("ctl00_forumHeader_forumTitleImage");
var bannerURL="";
switch(forumHeader.className)
{
case "HeaderTheGalleryForumId":
    bannerURL = "http://www.pavinglow.vacau.com/scripts/images/HeaderGallery4luke.jpg";
    break;
case "HeaderHalo3ForumId":
    bannerURL = "http://www.pavinglow.vacau.com/scripts/images/HeaderHalo34luke.jpg";
    break;
case "HeaderTheFloodForumId":
    bannerURL = "http://www.pavinglow.vacau.com/scripts/images/HeaderTheFlood4luke.jpg";
    break;
case "HeaderTheSeptagonForumId":
    bannerURL = "http://www.pavinglow.vacau.com/scripts/images/HeaderTheSeptagon4luke.jpg";
    break;
case "HeaderTheUndergroundForumId":
    bannerURL = "http://www.pavinglow.vacau.com/scripts/images/HeaderTheUniverse4luke.jpg";
    break;
}
if(bannerURL != "")
{
forumHeader.className = "";
forumHeader.style.backgroundImage = "url( " + bannerURL + ") ";
}
