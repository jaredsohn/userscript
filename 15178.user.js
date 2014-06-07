// ==UserScript==
// @name           irc.lv killer
// @description    Highlights good fellows, hides bad ones :)
// @namespace      http://www.irc.lv/
// @include        http://www.irc.lv/qna*
// @include        http://irc.lv/qna*
// ==/UserScript==
//
var ignore = [ "Kukish", "NT_Authority" ];
var uf = [ "kornelio", "M3DH4US9" ];
var ign_regex = new RegExp ("^("+ignore.join("|")+").*");
var uf_regex = new RegExp ("^("+uf.join("|")+").*");

function processQ(elem) {
	var cont = elem.textContent;
	if (cont.match(ign_regex)) {
		var parentToHide = elem.parentNode.parentNode;
		parentToHide.style.display='none';
	} else if (cont.match(uf_regex)) {
		var parentToAlter = elem.parentNode.parentNode;
		parentToAlter.style.backgroundColor='#5dff65';
	}
}

function processA(elem) {
	var cont = elem.textContent;
	if (cont.match(ign_regex)) {
		var parentToHide = elem.parentNode.parentNode.parentNode.parentNode;
		parentToHide.style.display='none';
	} else if (cont.match(uf_regex)) {
		var parentToAlter = elem.parentNode.parentNode.parentNode.parentNode;
		parentToAlter.style.backgroundColor='#5dff65';
	}
}

function get_all(a_parent, a_tag, a_class) {
	var q = a_parent.getElementsByTagName (a_tag);
	var res = new Array;
	for (var i = 0; q[i]; i++) {
		if (q[i].className == a_class) {
			res.push(q[i]);
		}
	}
	return res;
}

//optimized
function get_first(a_parent, a_tag, a_class) {
	var q = a_parent.getElementsByTagName(a_tag);
	var ret;
	for (var i = 0; q[i]; i++) {
		if (q[i].className == a_class) {
			ret = q[i];
			break;
		}
	}
	return ret;
}

var questions = get_first(document, "div", "col3body");
if (questions) {
	get_all(questions, "a", "nick").forEach(processQ);
	get_all(questions, "a", "nick_f").forEach(processQ);
}

var answers = get_first(document, "div", "col2body");
if (answers) {
	get_all(answers, "a", "nick").forEach(processA);
	get_all(answers, "a", "nick_f").forEach(processA);
}

var tops = get_first(document, "td", "columnright");
if (tops) {
	get_all(tops, "a", "nick").forEach(processQ);
	get_all(tops, "a", "nick_f").forEach(processQ);
}