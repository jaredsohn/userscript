// ==UserScript==
// @name          FaceBookFriendSideBar
// @namespace     http://apps.facebook.com/snipexx/
// @description   Replaces the left advertisment in Facebook by a sidebar with all your friends. You need the Snipex - eBay Sniper app for using this script
// @include       http://*facebook.com*
// ==/UserScript==
//
// By: Manfred Mayer
// Email: snipex at smart dot ms
// Last Update:  27 Dec 2007

var friendsbar 				= 	document.createElement("iframe");
friendsbar.src 				=	"http://apps.facebook.com/snipexx/friendsList";
friendsbar.width			=	"145";
friendsbar.height			=	"460";
friendsbar.style.border 		= 	"0px";
friendsbar.style.borderTop		=	"1px dotted #6B89D8";
friendsbar.style.borderBottom		=	"1px dotted #6B89D8";
//friendsbar.style.marginTop 		= 	"-50px";
friendsbar.style.backgroundColor 	= 	"#FAFAFA"
friendsbar.style.scrollbarBaseColor	=	"#FFFFFF";
friendsbar.style.scrollbarFaceColor	=	"#FFFFFF";
friendsbar.id 				= 	"friendsbar";
document.getElementById("ssponsor").replaceChild(friendsbar, document.getElementById("ssponsor").firstChild);
