// ==UserScript==

// @name           Forum links in menu dropdown
// @namespace      http://amy.com

// @description    Forum links in menu.

// @include        http*what.cd*

// ==/UserScript==


//setup

var userclass = "user"; //add your userclass here. options: user, member, pu, elite, tm, ptm, etm, vip
var inc = 0;

var sex;


//don't edit after here if you're not sure what you're doing.

var target = document.getElementById('searchbars').getElementsByTagName('li'); //where to put the forum links


//tm forums followed by forum id
var tm = new Array("Announcements","19","What.CD","13", "The Laboratory", "43", "Suggestions / Ideas", "9", "Bugs", "27", "#what.cd-invites database", "39", "The Lounge", "7", "The Library", "26", "Power Users", "10", "Elite", "29", "TM", "38", "Invites", "23", "Music", "17", "Vanity House", "25", "Help", "8", "Resolved Bugs", "32", "Trash", "12");

//elite forums followed by forum id
var elite = new Array("Announcements","19","What.CD","13", "The Laboratory", "43", "Suggestions / Ideas", "9", "Bugs", "27", "#invites database", "39", "The Lounge", "7", "The Library", "26", "Power Users", "10", "Elite", "29", "Invites", "23", "Music", "17", "Vanity House", "25", "Help", "8", "Resolved Bugs", "32", "Trash", "12");

//power user forums followed by forum id
var pu = new Array("Announcements","19","What.CD","13", "The Laboratory", "43", "Suggestions / Ideas", "9", "Bugs", "27", "The Lounge", "7", "The Library", "26", "Power Users", "10", "Invites", "23", "Music", "17", "Vanity House", "25", "Help", "8", "Resolved Bugs", "32", "Trash", "12");

//user/member forums followed by forum id
var member = new Array("Announcements","19","What.CD","13", "The Laboratory", "43", "Suggestions / Ideas", "9", "Bugs", "27", "The Lounge", "7", "The Library", "26", "Music", "17", "Vanity House", "25", "Help", "8", "Resolved Bugs", "32", "Trash", "12");

//vip forums followed by forum id
//some forums are not filled in simply because they are a bit secret. add yourself if you like :)
var vip = new Array("Announcements","19","What.CD","13", "####", "45", "The Laboratory", "43", "Suggestions / Ideas", "9", "Bugs", "27", "#invites database", "39", "The Lounge", "7", "The Library", "26", "Power Users", "10", "Elite", "29", "Torrent Masters", "38", "####", "22", "Invites", "23", "Music", "17", "Vanity House", "25", "Help", "8", "Resolved Bugs", "32", "Trash", "12");

//torrent masters
if (userclass == "tm" || userclass == "ptm" || userclass == "etm") {
var inc = 0;
	for (var e in tm) {
		inc++;
		if (e%2 == 0) {
			sex += '<option value="http://what.cd/forums.php?action=viewforum&forumid='+tm[inc]+'">'+tm[e]+'';
		}
	}

	target[5].innerHTML += '<form name="forums"><select name="dropdownmenu" size=1 onChange="window.location.href= this.value"><option selected value="">Forums</option>'+sex+'</select></form>';
}

//elites
if (userclass == "elite") {
var inc = 0;
	for (var e in elite) {
		inc++;
		if (e%2 == 0) {
			sex += '<option value="http://what.cd/forums.php?action=viewforum&forumid='+elite[inc]+'">'+elite[e]+'';
		}
	}

	target[5].innerHTML += '<form name="forums"><select name="dropdownmenu" size=1 onChange="window.location.href= this.value"><option selected value="">Forums</option>'+sex+'</select></form>';
}

//power users
if (userclass == "pu") {
var inc = 0;
	for (var e in pu) {
		inc++;
		if (e%2 == 0) {
			sex += '<option value="http://what.cd/forums.php?action=viewforum&forumid='+pu[inc]+'">'+pu[e]+'';
		}
	}

	target[5].innerHTML += '<form name="forums"><select name="dropdownmenu" size=1 onChange="window.location.href= this.value"><option selected value="">Forums</option>'+sex+'</select></form>';
}

//users or members
if (userclass == "member" || userclass == "user") {
var inc = 0;
	for (var e in member) {
		inc++;
		if (e%2 == 0) {
			sex += '<option value="http://what.cd/forums.php?action=viewforum&forumid='+member[inc]+'">'+member[e]+'';
		}
	}

	target[5].innerHTML += '<form name="forums"><select name="dropdownmenu" size=1 onChange="window.location.href= this.value"><option selected value="">Forums</option>'+sex+'</select></form>';
}

//if someone enters a bad userclass
if (userclass != "pu" && userclass != "elite" && userclass != "tm" && userclass != "vip" && userclass != "member" && userclass != "user" && userclass != "etm" && userclass != "ptm") {
	sex += '<option value="">You need to choose a valid userclass';
	target[5].innerHTML += '<form name="forums"><select name="dropdownmenu" size=1 onChange="window.location.href= this.value">'+sex+'</select></form>';
}

//made by Amareus