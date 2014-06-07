// ==UserScript==
// @name           Subeta Quest Search Popups
// @namespace      Shaun Dreclin
// @include        *subeta.net/games/hunt.php*
// @include        *subeta.net/quests.php/quentin*
// @include        *subeta.net/quests.php/library*
// @include        *subeta.net/quests.php/wizard*
// @include        *subeta.net/explore/maleria.php*
// @include        *subeta.net/games/foodquest.php*
// @include        *subeta.net/explore/opp.php*
// @include        *subeta.net/explore/saggitarius.php*
// @include        *subeta.net/explore/quest_computer.php*
// @include        *subeta.net/games/toyquest.php*
// ==/UserScript==

//Item Hunt
if(window.location.href.indexOf("/games/hunt.php") != -1 && document.getElementsByTagName('body')[0].innerHTML.indexOf("Thank you for helping me!") == -1) {
	for(i in document.getElementsByTagName('img')) {
		var itemName = document.getElementsByTagName('body')[0].innerHTML.split(document.getElementsByTagName('img')[i].src);
		if(itemName[1].substr(2, 4) == "<br>") {
			itemName = itemName[1].split("<br>");
			itemName = itemName[1];
			window.open("http://subeta.net/ushop.php?act=dosearch&type=shops&itemname=" + escape(itemName), String(Math.floor(Math.random()*1001)));
		}
	}
}

if(window.location.href.indexOf("/quests.php/quentin") != -1			//Quentin's Quests
|| window.location.href.indexOf("/quests.php/library") != -1			//Library Quests
|| window.location.href.indexOf("/quests.php/wizard") != -1		        //Wizard Quests
|| window.location.href.indexOf("/explore/maleria.php") != -1			//Maleria's (The Dark Goddess's) Quests
|| window.location.href.indexOf("/games/foodquest.php") != -1			//Pete's Food Quests
|| window.location.href.indexOf("/explore/opp.php") != -1 				//Cursed Quests
|| window.location.href.indexOf("/explore/saggitarius.php") != -1		//Saggitarius's Quests
|| window.location.href.indexOf("/explore/quest_computer.php") != -1	//The Computer Geek's Quests
|| window.location.href.indexOf("/games/toyquest.php") != -1			//Toy Quests
&& document.getElementById('content').innerHTML.indexOf("<b>Thank You!</b>") < 0
&& document.getElementById('content').innerHTML.indexOf("Your Reward is:") < 0
&& document.getElementById('content').innerHTML.indexOf("Here is your prize:") < 0
) {

	var popups = ""
	for(i in document.getElementsByTagName('img')) {
		if(document.getElementsByTagName('img')[i].id != "" && document.getElementsByTagName('img')[i].id != undefined && popups.indexOf("|" + document.getElementsByTagName('img')[i].id + "|") == -1) {
			popups += "|" + document.getElementsByTagName('img')[i].id + "|";
			window.open("http://subeta.net/ushop.php?act=dosearch&type=shops&itemname=" + document.getElementsByTagName('img')[i].id, String(Math.floor(Math.random()*1001)));
		}
	}
}

