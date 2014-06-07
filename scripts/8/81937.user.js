// ==UserScript==
// @name           slomog
// @namespace      http://amy.com
// @description    forum in menu
// @include        http*what.cd*
// ==/UserScript==

var userclass = "user"; //add your userclass here. options: user, member, pu, elite, tm, ptm, etm, vip


(function() {
//don't edit after here if you're not sure what you're doing.
var target = document.getElementById('searchbars').getElementsByTagName('li'); //where to put the forum links
var inc = 0;

//tm forums followed by forum id
var tm = new Array("Announcements","19","What.CD","13", "The Lab", "43", "Suggestions", "9", "Bugs", "27", "#invite db", "39", "Lounge", "7", "Library", "26", "PU", "10", "Elite", "29", "TM", "38", "Invites", "23", "Music", "17", "VH", "25", "Help", "8", "Res. Bugs", "32", "Trash", "12");

//elite forums followed by forum id
var elite = new Array("Announcements","19","What.CD","13", "The Lab", "43", "Suggestions", "9", "Bugs", "27", "#invite db", "39", "Lounge", "7", "Library", "26", "PU", "10", "Elite", "29", "Invites", "23", "Music", "17", "VH", "25", "Help", "8", "Res. Bugs", "32", "Trash", "12");

//power user forums followed by forum id
var pu = new Array("Announcements","19","What.CD","13", "The Lab", "43", "Suggestions", "9", "Bugs", "27", "Lounge", "7", "Library", "26", "PU", "10", "Invites", "23", "Music", "17", "VH", "25", "Help", "8", "Res. Bugs", "32", "Trash", "12");

//user/member forums followed by forum id
var member = new Array("Announcements","19","What.CD","13", "The Lab", "43", "Suggestions", "9", "Bugs", "27", "Lounge", "7", "Library", "26", "Music", "17", "VH", "25", "Help", "8", "Res. Bugs", "32", "Trash", "12");

//vip forums followed by forum id
//some forums are not filled in simply because they are a bit secret
var vip = new Array("Announcements","19","What.CD","13", "####", "45", "The Lab", "43", "Suggestions", "9", "Bugs", "27", "#invite db", "39", "Lounge", "7", "Library", "26", "PU", "10", "Elite", "29", "TM", "38", "####", "22", "Invites", "23", "Music", "17", "VH", "25", "Help", "8", "Res. Bugs", "32", "Trash", "12");


if (userclass == "vip") {
var inc = 0;
target[5].innerHTML += "<br>";
	for (var d in vip) {
		inc++;
		if (d%2 == 0) { //don't include the id's that are in the array
			target[5].innerHTML += "<u><a href=\"/forums.php?action=viewforum&forumid="+vip[inc]+"\">"+vip[d]+"</a></u> ";
		}
	}
}

if (userclass == "tm" || userclass == "ptm" || userclass == "etm") {
var inc = 0;
target[5].innerHTML += "<br>";
	for (var g in tm) {
		inc++;
		if (g%2 == 0) { //don't include the id's that are in the array
			target[5].innerHTML += "<u><a href=\"/forums.php?action=viewforum&forumid="+tm[inc]+"\">"+tm[g]+"</a></u> ";
		}
	}
}

if (userclass == "elite") {
var inc = 0;
target[5].innerHTML += "<br>";
	for (var e in elite) {
		inc++;
		if (e%2 == 0) { //don't include the id's that are in the array
			target[5].innerHTML += "<u><a href=\"/forums.php?action=viewforum&forumid="+elite[inc]+"\">"+elite[e]+"</a></u> ";
		}
	}
}
if (userclass == "pu") {
var inc = 0;
target[5].innerHTML += "<br>";
	for (var p in pu) {
		inc++;
		if (p%2 == 0) { //don't include the id's that are in the array
			target[5].innerHTML += "<u><a href=\"/forums.php?action=viewforum&forumid="+pu[inc]+"\">"+pu[p]+"</a></u> ";
		}
	}
}

if (userclass == "member" || userclass == "user") {
var inc = 0;
target[5].innerHTML += "<br>";
	for (var u in member) {
		inc++;
		if (u%2 == 0) { //don't include the id's that are in the array
			target[5].innerHTML += "<u><a href=\"/forums.php?action=viewforum&forumid="+member[inc]+"\">"+member[u]+"</a></u> ";
		}
	}
}

})();