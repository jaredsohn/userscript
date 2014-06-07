// ==UserScript==
// @name           New Banners
// @namespace      Script by Luke35120   
// @description    Brand new Bannes!
// @include        http://*bungie.net/Forums/topics.aspx?forumID=*
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// @include        http://*bungie.net/Forums/createpost.aspx?postID=*&act=reply
// ==/UserScript==
var forumHeader = document.getElementById("ctl00_forumHeader_forumTitleImage");
var bannerURL="";
switch(forumHeader.className)
{
// Game Forums
case "HeaderReachForumId":
	bannerURL = "http://pavedlow.net78.net/ReachForumBanner.png";
	break;
//case "HeaderHalo3ODSTForumId"
	//bannerURL = "";
	//break;
//case "HeaderHalo3ForumId":
   // bannerURL = "";
    //break;
//case "HeaderOptimatchForumId":
	//bannerURL = "";
	//break;
//case "HeaderNewMombasaForumId":
	//bannerURL = "";
	//break;
//case "HeaderTheMawForumId":
	//bannerURL = "";
	//break;
//case "HeaderTheLibraryForumId":
	//bannerURL = "";
	//break;
//Game Forums
//Bungie Forums
//case "HeaderTheUndergroundForumId":
//    bannerURL = "";
//    break;
//case "HeaderTheSeptagonForumId":
//    bannerURL = "";
//    break;
//case "HeaderTheFloodForumId":
//    bannerURL = "";
//    break;
//case "HeaderTheGalleryForumId":
//    bannerURL = "";
//    break;
//case "HeaderTheNewsForumId":
//	bannerURL = "";
//	break;
//case "HeaderVotingBoothForumId":
//	bannerURL = "";
//	break;
//case "HeaderTheClassifiedsForumId":
//	bannerURL = "";
//	break;
//Bungie Forums
}
if(bannerURL != "")
{
forumHeader.className = "";
forumHeader.style.backgroundImage = "url( " + bannerURL + ") ";
}