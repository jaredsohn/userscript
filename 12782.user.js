// ==UserScript==

// @name           NoPirateQuestAds

// @namespace      facebookpirates

// @description    Prevents any Facebook wall entries containing ads for "PirateQuest" from appearing!

// @include        http://www.facebook.com/wall.php*
// @include        http://apps.facebook.com/pirates/leaderboard.php*
// @include        http://www.facebook.com/apps/application.php?api_key=ec03100bb663c204d4abc7490a53c312*

// ==/UserScript==

(function(){

	var leaderboardRegExp = /\/leaderboard.php/;
	var wallRegExp = /\/wall.php/;
	var applicationRegExp = /\/application.php/;
	var strAnnoying = "http://www.piratequest.net";
	var arrDivs;

	if (leaderboardRegExp.test(window.location.href)) {

		arrDivs = document.getElementsByTagName("DIV");
		for (var i=0;i<arrDivs.length;i++) {

			if (arrDivs[i].className == "wallkit_postcontent") {
				if (arrDivs[i].innerHTML.indexOf(strAnnoying) != -1) {
					var objHostTable = arrDivs[i].parentNode;
					objHostTable.parentNode.removeChild(objHostTable);
				}
			}
		}

	} else if (wallRegExp.test(window.location.href) || applicationRegExp.test(window.location.href)) {

		arrDivs = document.getElementsByTagName("DIV");
		for (var i=0;i<arrDivs.length;i++) {

			if (arrDivs[i].className == "walltext") {
				if (arrDivs[i].innerHTML.indexOf(strAnnoying) != -1) {
					var objHostTable = arrDivs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
					objHostTable.parentNode.removeChild(objHostTable);
				}
			}
		}
	}

})();