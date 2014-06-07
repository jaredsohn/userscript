// ==UserScript==
// @name			Gamerscore Summary
// @description	Changes the Xbox Live Achievement summary list to hide games where both people have no achievements. Also colour codes points to easily highlight who is winning. Also compacts the games to fit more in.
// @namespace		http://www.wolflight.net
// @include		http://live.xbox.com/*
// @Author		Arowin
// ==/UserScript==

//I know, stupid way of doing it, but I couldn't get the @include to work properly...
if (window.location.href.toUpperCase().indexOf("PROFILE/ACHIEVEMENTS/VIEWACHIEVEMENTSUMMARY.ASPX") != -1) {
	doIt();
}

function doIt() {
	var elems = getElementsByClass("XbcAchGameDescCell", null, "td")
	var finalArr = new Array;
	var holder = new Array;
	for (var e = 0; e < elems.length; e++) {
		//Get the parent of the td
		finalArr[e] = elems[e].parentNode;
		holder[e] = finalArr[e].parentNode;
		
		var Xyou = getElementsByClass("XbcAchYouCell", finalArr[e], "td");
		var Xme = getElementsByClass("XbcAchMeCell", finalArr[e], "td");
		var game = getElementsByClass("XbcAchievementsTitle", finalArr[e], "strong");
		var img = getElementsByClass("AchievementsGameIcon", finalArr[e], "img");
		var imgHolder = getElementsByClass("XbcProfileImageDescCell", finalArr[e], "div");
		var para = imgHolder[0].getElementsByTagName("p");
		
		img[0].style.width = "32px";
		img[0].style.height = "32px";
		img[0].style.margin = "5px";
		img[0].style.marginLeft = "30px";
		imgHolder[0].style.minHeight = "45px";
		imgHolder[0].style.height = "45px";
		elems[e].style.borderLeft = "2px Solid White";
		para[0].style.padding = "0px";
		para[0].style.paddingTop = "5px";
		para[0].style.marginLeft = "100px";
		var gameName = game[0].innerHTML;
		
		var meScore = Xme[0].innerHTML;
		var youScore = Xyou[0].innerHTML;
		meScore = meScore.substring(8, meScore.indexOf(" of "));
		youScore = youScore.substring(8, youScore.indexOf(" of "));
		
		if ((Xyou[0].innerHTML.indexOf("<strong>0 of ") != -1 && Xme[0].innerHTML.indexOf("<strong>0 of") != -1) || (Xyou[0].innerHTML.indexOf("No Gamerscore") != -1 && Xme[0].innerHTML.indexOf("No Gamerscore") != -1)) {
			finalArr[e].innerHTML = "<td class='XbcAchGameDescCell' colspan='3' style='text-align: left; background-color: #999999; border: 1px Solid White; border-left: 2px Solid White; border-right: 2px Solid White; padding-left: 2px;'><b>" + (e + 1) + "</b> " + gameName + "</td>";
		} else {
			if (meScore > youScore) {
				Xme[0].style.color = "green";
				Xyou[0].style.color = "red";
			} else if (youScore > meScore) {
				Xyou[0].style.color = "green";
				Xme[0].style.color = "red";
			} else {
				Xyou[0].style.color = "orange";
				Xme[0].style.color = "orange";
			}
			
			if (meScore == "0") {
				Xme[0].style.color = "DarkRed";
			}
			if (youScore == "0") {
				Xyou[0].style.color = "DarkRed";
			}
		}
		
//		elems[e].innerHTML = "<div style='border-bottom: 3px Solid White;'><b>" + e + "</b> " + gameName + "</div>" + elems[e].innerHTML;
		elems[e].style.textAlign = "left";
	}
}

//--------------------HELPER FUNCTIONS--------------------\\

function getElementsByClass(searchClass, node, tag) {
	var classElements = new Array();
	if (node == null)
		node = document;
	if (tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}