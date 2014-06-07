// ==UserScript==
// @name           LUE Theme Songs
// @namespace      LUE Theme Songs
// @description    Plays a song in topics by certain users.
// @include        http://www.gamefaqs.com/boards/402-life-the-universe-and-everything/*
// ==/UserScript==
var songurl = "";

var selectedMessagesUser =
document.evaluate("//table[@class='board message']//tr/td//a/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var item = selectedMessagesUser.snapshotItem(0);

var curUrl = window.location.toString();
if(curUrl.indexOf("page")==-1){
	var username = item.nodeValue;
	var songurl = "http://www.ante-viral.com/LUESONGS/"+ username +".mp3";
} else {
	var nameLoc = curUrl.lastIndexOf("tc=");
	if( curUrl.indexOf("#")>0)
		username = curUrl.substring(nameLoc+3, curUrl.indexOf("#"));
	else
		username = curUrl.substring(nameLoc+3);
	username = username.replace(/\+/g, " ");
	var songurl = "http://www.ante-viral.com/LUESONGS/"+ username +".mp3";
}


var songLoc = document.body.innerHTML.lastIndexOf("#LS");
if(songLoc>0){
	var songRest = document.body.innerHTML.substring(songLoc+1);
	if(songRest.charAt(2)=='['){
		username = songRest.substring(3, songRest.indexOf("]"));
		songurl = "http://www.ante-viral.com/LUESONGS/"+ username +".mp3";
	} else {
		var songname = document.body.innerHTML.substring(songLoc+1, songLoc+6);
		if(songname!="LS000"){
			songurl = "http://www.ante-viral.com/LUESONGS/"+ songname +".mp3";
		}
	}
}
item.parentNode.parentNode.innerHTML += ' | <embed src="'+ songurl +'" loop=true height=10 width=80></embed> ';