// ==UserScript==
// @name           x360a MyAchievements guide linker
// @namespace      EDB_gm
// @description    Adds a guide link on MyAchievements page
// @include        *xbox360achievements.org/myachievements.php
// @include        *xbox360achievements.org/profile/*
// ==/UserScript==

function replaceAll(sReplace, tReplace, rReplace) {
	var rArray = sReplace.split(tReplace);
	var nReplace = rArray.length-1;
		while(nReplace >= 1) {
			sReplace = sReplace.replace(tReplace, rReplace);
			nReplace--;
		}
	return sReplace;
}

function getNumOccurs(globalString, subStringToCheck) {
	var tempArray = globalString.split(subStringToCheck);
	return tempArray.length-1;
}

var pageName;

if(document.URL.indexOf("http://www.xbox360achievements.org/profile/") != -1) pageName="profile";
if(document.URL == "http://www.xbox360achievements.org/myachievements.php") pageName="checklist";

if(pageName=="checklist") {

var thisLink = document.getElementsByClassName("bl_la_main")[0].innerHTML;
var workingLink = thisLink;

var numGames = getNumOccurs(thisLink, "/achievements/\" class=\"linkT\">");

for (i=1; i<=numGames; i++) {

	var gameNameLink = workingLink.substring(workingLink.indexOf("<td colspan=\"2\"><a href=\"/game/")+31, workingLink.indexOf("/achievements/\" class=\"linkT\">")).trim();

	var gameName = workingLink.substring(workingLink.indexOf("/achievements/\" class=\"linkT\">")+30).trim();
	gameName = gameName.substring(0, gameName.indexOf("</a></td>"));

	workingLink = workingLink.replace("<td colspan=\"2\"><a href=\"/game/", "");
	workingLink = workingLink.replace("/achievements/\" class=\"linkT\">", "");

	thisLink = thisLink.replace(gameName + "</a>", gameName + "</a>&nbsp;-&nbsp;<a href='/game/" + gameNameLink + "/guide/'>Guide</a>");

}

document.getElementsByClassName("bl_la_main")[0].innerHTML = thisLink;
}

if(pageName=="profile") {

var thisLink = document.getElementById("myachievements").innerHTML;
var workingLink = thisLink;

var numGames = getNumOccurs(thisLink, "/achievements/\" class=\"linkT\">");

for (i=1; i<=numGames; i++) {

	var gameNameLink = workingLink.substring(workingLink.indexOf("<td colspan=\"2\"><a href=\"/game/")+31, workingLink.indexOf("/achievements/\" class=\"linkT\">")).trim();

	var gameName = workingLink.substring(workingLink.indexOf("/achievements/\" class=\"linkT\">")+30).trim();
	gameName = gameName.substring(0, gameName.indexOf("</a></td>"));

	workingLink = workingLink.replace("<td colspan=\"2\"><a href=\"/game/", "");
	workingLink = workingLink.replace("/achievements/\" class=\"linkT\">", "");

	thisLink = thisLink.replace(gameName + "</a>", gameName + "</a>&nbsp;-&nbsp;<a href='/game/" + gameNameLink + "/guide/'>Guide</a>");

}

document.getElementById("myachievements").innerHTML = thisLink;
}