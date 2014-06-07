// ==UserScript==
// @name           Treasure Isle Auto Process Requests
// @namespace      http://www.ffszone.co.cc/treasure-isle/auto-work
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.zynga.com/*
// @include        https://*.zynga.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @implementation Ali - FFSZone
// ==/UserScript==

var firstly =$('div#confirm_234860566661_0 form:eq(0) td.info input:eq(4)');
var kiwis =$('div.main_gift_cont ul.items li:eq(0) input:eq(5)');
var mangos =$('div.main_gift_cont ul.items li:eq(2) input:eq(5)');
var yesno = $('div.morePending_bttn span input:eq(0)'); 
var needlv =$('div.main_gift_cont ul.items li:eq(2) div:eq(2)');

function performTasks() {
	if (window.location.href.indexOf('home.php') !== -1){
			window.setTimeout(turnBack, 1000);
	}
	else {
		if (window.location.href.indexOf('reqs.php') !== -1) {
			$('div#confirm_234860566661_0').css("border","3px solid red");
			firstly.css("border","3px solid red");
			performClick(firstly[0]);
		}
		else {
			if (window.location.href.indexOf('ask_fruit.php') !== -1) {
				if (needlv.html() == "Need level 15") {
					kiwis.css("border","3px solid red");
					performClick(kiwis[0]);
				}
				else {
					mangos.css("border","3px solid red");
					performClick(mangos[0]);
				}
			}
			else {
				if (window.location.href.indexOf('reward.php') !== -1) {
					window.setTimeout(turnBack, 3000);
				}
				else {
					if (window.location.href.indexOf('gift_accept.php') !== -1) {
					window.setTimeout(turnBack, 3000);
					}
					else {
						if (window.location.href.indexOf('neighbors.php') !== -1) {
						window.setTimeout(turnBack, 3000);
						}
					}
				}
			}
		}
	}
}

function turnBack() {
	document.location.href = "http://www.facebook.com/reqs.php#confirm_234860566661_0";
}

function returnRequests() {
	if (window.location.href.indexOf('ask_fruit.php?action=chooseFruitToSend') !== -1) {
		document.location.href = "http://www.facebook.com/reqs.php#confirm_234860566661_0";
	}
}
		
function performClick(node) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, false);
	node.dispatchEvent(evt);
}

function loadGame() {
	var tiDivtag = $('div#confirm_234860566661_0');
	if (window.location.href.indexOf('reqs.php') !== -1) {
		if (tiDivtag.html() == null) {
			document.location.href = "http://apps.facebook.com/treasureisle/";
		}
	}
}

window.setTimeout(performTasks, 100);
window.setTimeout(returnRequests, 14000);
window.setTimeout(loadGame,2000);
//
// Published on Monday 4/12/2010
//
