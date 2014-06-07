// ==UserScript==
// @name           fs-cuteanons
// @version        1.02
// @namespace      http://userscripts.org/users/133663
// @author         Sana
// @description    Make "someone" cuter.
// @include        http://www.formspring.me/*
// @run-at-document-end
// ==/UserScript==

var name = new Array();
var pict = new Array();

var flan = ["Madoka","Homura","Kyouko","Mami","Sayaka","Coobie"];
var flap = ["http://i.imgur.com/kItee.png","http://i.imgur.com/eaLUS.png","http://i.imgur.com/vIPNQ.png","http://i.imgur.com/06SEM.png","http://i.imgur.com/OVQ31.png","http://i.imgur.com/Rf2ou.png"];

var sec = "follow_stream";

readcookie();
if (/inbox/i.test(window.location.href)) {
	domagic();
	document.getElementById("inbox_questions").addEventListener("DOMNodeInserted", domagic, false);
} else {
	if (!/follow/i.test(window.location.href)) {
		sec = "questions_answered";
	}
	secondmagic();
	document.getElementById(sec).addEventListener("DOMNodeInserted", secondmagic, false);
}

function askfordata () {
	var ind = 0; var flg = 1;
	if (name.length > 0) {
		var but = confirm("-=[ fs-cuteanons ]=-\nI'm going to erase your previous entries.\nIs that okay?");
		if (but) {
			name.length = 0;
		} else {
			ind = name.length;
		}
	} else {
		var but = confirm("-=[ fs-cuteanons ]=-\nAccept default setup?");
		if (but) {
			flg = 0;
			name = flan;
			pict = flap;
		}
	}
	while (flg) {
		var rnd = Math.floor(Math.random()*flan.length);
		var but = prompt("-=[ fs-cuteanons ]=-\nEnter a name:",flan[rnd]);
		if (but==null || but=="") {
			break;
		} else {
			name[ind] = but;
		}
		var but = prompt("-=[ fs-cuteanons ]=-\nEnter an image url:",flap[rnd]);
		if (but==null || but=="") {
			name.splice(ind,1);
			break;
		} else {
			pict[ind] = but;
		}
		ind++;
	}
	writecookie();
}

function domagic () {
	document.getElementById("inbox_questions").removeEventListener("DOMNodeInserted", domagic, false);
	var nam = document.getElementsByClassName("someone");
	var ava = new Array();
	for (var ind = 0; ind < nam.length; ind++) {
		var env = nam[ind].parentNode.parentNode.parentNode;
		var txt = env.getElementsByClassName("question-content")[0].textContent;
		ava[ind] = env.getElementsByClassName("avatar")[0];
		var pse = numersum(txt)%name.length;
		nam[ind].textContent = name[pse];
		ava[ind].childNodes[0].setAttribute("src", pict[pse]);
		ava[ind].childNodes[0].setAttribute("alt", name[pse]);
		ava[ind].childNodes[0].setAttribute("width", 64);
		ava[ind].childNodes[0].setAttribute("height", 64);
	}
	document.getElementById("inbox_questions").addEventListener("DOMNodeInserted", domagic, false);
}

function numersum (str) {
	var sum = 0;
	for (var ind = 0; ind < str.length; ind++) {
		sum += str.charCodeAt(ind);
	} return sum;
}

function readcookie () {
	var strn = GM_getValue("name", false);
	var strp = GM_getValue("pict", false);
	if (!(strn && strp)) {
		askfordata();
	} else {
		var spln = strn.split("\n");
		var splp = strp.split("\n");
		for (var ind = 0; ind < spln.length-1; ind++){
			name[ind] = spln[ind];
			pict[ind] = splp[ind];
		}
	}
}

function secondmagic () {
	document.getElementById(sec).removeEventListener("DOMNodeInserted", secondmagic, false);
	var str = document.getElementsByClassName("stream-top");
	for (var ind = 0; ind < str.length; ind++) {
		if (!/responded to/i.test(str[ind].innerHTML)) {
			var env = str[ind].parentNode;
			var txt = env.getElementsByClassName("question-content")[0].textContent;
			var pse = numersum(txt)%name.length;
			var res = document.createElement("span");
			res.textContent = "responded to " + name[pse];
			str[ind].insertBefore(res, str[ind].childNodes[5]);
		}
	}
	document.getElementById(sec).addEventListener("DOMNodeInserted", secondmagic, false);
}

function writecookie () {
	var strn = "";
	var strp = "";
	for (var ind = 0; ind < name.length; ind++) {
		strn = strn + name[ind] + "\n";
		strp = strp + pict[ind] + "\n";
	}
	GM_setValue("name", strn);
	GM_setValue("pict", strp);
}