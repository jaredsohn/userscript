// ==UserScript==
// @name LORCode Tools
// @description Кнопка цитирования выделенного и панель тегов для LORCode
// @author Алексей Соловьев aka moscwich
// @license Creative Commons Attribution 3.0 Unported
// @version 0.21.1
// @namespace http://www.linux.org.ru/*
// @namespace https://www.linux.org.ru/*
// @include http://www.linux.org.ru/*
// @include https://www.linux.org.ru/*
// ==/UserScript==

// Based on MultiCodePanel 2.2 (v. 0.22)
// http://al-moscwich.tk/tag/multicodepanel

// if (/https?:\/\/(www\.)?linux.org.ru/.test(u))

function removeElements () {
	for (i = 0; i < arguments.length; i++) {
		var p = arguments[i].parentNode;
		if (p) p.removeChild (arguments[i]);
	}
}
function set (p, z) {
	for (i = 0; i < arguments.length && (arguments[i] === undefined); i++) {}
	return arguments[i];
}

i = j = undefined;
a = b = undefined;

form = document.getElementById ("commentForm") || document.getElementById ("messageForm") || document.getElementById ("changeForm").getElementsByTagName ("label")[7];
msg = document.getElementById ("msg") || document.getElementById ("form_msg") || document.getElementById ("info");
var u = window.location.href;

// Panel
var panel = document.createElement ("div");
panel.id = 'atag';
panel.createBlock =
	function () {
		block = document.createElement ("span");
		for (i = 0; i < arguments.length; i++) {
			link = document.createElement ("a");
			link.textContent = arguments[i][0];
			link.title = arguments[i][1];
			link.exec = arguments[i][2];
			link.onclick = function () {
				eval (this.exec);
				return false;
			}
			block.appendChild (link);
		}
		return this.appendChild (block);
	}
panel.createBlock (
	["[b]", "Полужирный", 'intag ("strong");'],
	["[i]", "Курсив", 'intag ("em");'],
	["[s]", "Зачеркнутый", 'intag ("s");'],
	["[u]", "Подчеркнутый", 'intag ("u");']
);
panel.createBlock (
	["[quote]", "Цитата", 'intag ("quote"); msg.parentNode.mode.selectedIndex = 0;'],
	["[code]", "Код", 'intag ("code"); msg.parentNode.mode.selectedIndex = 0;']
);
panel.createBlock (
	["[url]", "URL", 'url ();'],
	["[user]", "Участник", 'intag ("user");']
);
panel.createBlock (
	["[list]", "Список", 'intag ("list");'],
	["[*]", "Элемент списка", 'msg.wrtSel ("[*]", "");']
);
panel.createBlock (
	["«»", "Кавычки", 'msg.wrtSel ("«", "»");'],
	["„“", "Кавычки", 'msg.wrtSel ("„", "“");'],
	["[br]", "Перевод строки", 'msg.wrtSel ("[br]", "");']
);
panel.createBlock (
	[" fix ", "Превратить знаки и обозначения в соответствующие спец. символы", 'fix();'],
	[" deltags-in ", "Удалить крайнее входящие обрамление тегами", 'deltagsin ();'],
	[" brs ", "Добавить [br] к переводам строк", 'brs ();']
);

msg.parentNode.insertBefore (panel, msg);
msg.cols = 100;
msg.rows = 20;

// Styles
obj = document.createElement ("style");
obj.innerHTML =
'#atag a {\
		cursor: pointer;\
		-o-transform-origin: 14px 17px; background-color: rgb(39, 44, 45);\
border-bottom-color: rgb(114, 159, 207); border-bottom-left-radius: 5px;\
border-bottom-right-radius: 5px; border-bottom-style: solid;\
border-bottom-width: 1px; border-left-color: rgb(114, 159, 207);\
border-left-style: solid; border-left-width: 1px;\
border-right-color: rgb(114, 159, 207); border-right-style: solid;\
border-right-width: 1px; border-top-color: rgb(114, 159, 207);\
border-top-left-radius: 5px; border-top-right-radius: 5px;\
border-top-style: solid; border-top-width: 1px;\
color: rgb(114, 159, 207);\
font-family: "Trebuchet MS";\
font-size: 14px; height: 22px; line-height: 22.4px; margin-bottom: 5px; margin-top: 5px; max-height: none;\
max-width: none; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; text-align: center;\
text-decoration: none;\
width: 16px;\
	}\
	#atag a:hover {background-color:rgb(84, 84, 84); border-color:rgb(186, 189, 182);}\
	#atag {\
		margin-top: 5px; margin-bottom: 5px;\
		padding: 3px 1px; font-size: 0.9em;\
	}\
	#atag > span {margin-right: 4px;}\
	label[for="msg"] {margin:5px 0px;}\
	.title {padding:2px;}\
	.msg p {margin: 0; padding: 0.3em 0;}\
	.quote {margin: 5px 0 !important;}';
document.getElementsByTagName ("head")[0].appendChild (obj);

// Remove formating tips
if (u.indexOf ("add.jsp") <= -1 &&
		u.indexOf ("edit.jsp") <= -1 &&
		u.indexOf ("register.jsp") <= -1)
	removeElements (form.getElementsByTagName ('font')[0],
		(i = form.getElementsByTagName ('br'))[5],
		i[6]
	);

// Add quote links
var t = document.getElementsByClassName ("title");
t.createQlink = function () {
	for (i = 0; i < this.length; i++)
		for (j in arguments) {
			var clink = this[i].getElementsByTagName ("a")[0];
			if (clink){
				var qlink = document.createElement ("a");
				qlink.onclick = arguments[j][1];
				qlink.href = u;
				qlink.textContent = arguments[j][0];
				var d = this[i].insertBefore (qlink, clink);
				this[i].insertBefore (clink, d);
				this[i].insertBefore (document.createTextNode ("] ["), d);
			}
		}
}
t.createQlink (['цитата', q], ['блок-цитата', qb], ['юзер', user]);

// Add \n to <br>
var mbs = document.getElementsByClassName ("msg_body");
for (j in mbs) if (!isNaN (j)) {
	var mps = mbs[j].getElementsByTagName ("p");
	for (i in mps)
		if (!isNaN (i))
			mps[i].innerHTML = mps[i].innerHTML.replace (/<br\/?>(?![\n\r])/g, "<br>\n");
}


	/*		Main		*/

//	Auxiliary functions
msg.wrtSel = function (subj, offset, before, after, zset) { //Also msg.wrtSel (before, after, offset)
	if (typeof offset == "string")
		var
			after = offset, offset = before,
			before = subj, subj = undefined;
	var
		before = before || "", after = after || "",
		offset = set (offset, before.length), zset = zset || 0;
	var
		startSel = set (a, this.selectionStart), endSel = set (b, this.selectionEnd),
		subj = before + set (subj, this.value.substring (startSel, endSel)) + after;

	this.value = this.value.substring (0, startSel) + subj + this.value.substring (endSel);
	this.focus (); this.setSelectionRange (startSel + offset, endSel + offset + zset);
	a = b = undefined;
}
function addbr (c) {
	return c.replace (/^((?:(?!\[\/?(?:quote|code|list|br)(?:=.*)?\]$)[^\n\r])+)(\r?\n)(?!\n|\[\/?(?:br|quote(?:=.*)?|code(?:=.*)?)\])/gm, "$1[br]$2");
}
function getTextContent (post) {
	var text = "";
	var pTags = post.getElementsByClassName ("msg_body")[0].getElementsByTagName ("p");
	for (i = 0; i < pTags.length; i++)
		if (pTags[i].parentNode.className.indexOf ('msg_body') > -1) {
			text += pTags[i].textContent;
			if (i != pTags.length - 1) text += "\n\n";
		}
	return text;
}
function getUserName (post){
	if (i = post.getElementsByClassName ("sign")[0].getElementsByTagName ("a")[0])
		return i.innerHTML;
	else return "anonymous";
}

// Functions to run
function intag (tag, arg) {
	var arg = arg || "";
	msg.wrtSel (
		undefined,
		tag.length + arg.length + 2,
		"[" + tag + arg + "]",
		"[/" + tag + "]"
	);
}
function fix () {
	var a = msg.selectionStart, b = msg.selectionEnd;
	var repc = function (c) {
		c = c.replace (/\(c\)/gi, "©");	c = c.replace (/\([rр]\)/gi, "®");
		c = c.replace (/\(f\)/gi, "£");	c = c.replace (/\(e\)/gi, "€");
		c = c.replace (/%\/10/g, "‰");	c = c.replace (/%\/100/g, "‱");
		c = c.replace (/\(V\)/g, "✓");	c = c.replace (/\(V\+\)/g, "✔");
		c = c.replace (/\(x\)/g, "✗");	c = c.replace (/\(x\+\)/g, "✘");
		c = c.replace (/`/g, "&#769;");	c = c.replace (/\(p\)/gi, "§");
		c = c.replace (/(^| )- /g, "$1— ");	c = c.replace (/\.\.\./g, "…");
		c = c.replace (/\(\*\+?\)/g, "★");	c = c.replace (/\(\*-\)/g, "☆");
		c = c.replace (/\([tт][mм]\)/gi, "™");
		c = c.replace (/-->/g, "→");
		return c;
	}
	
	if (a != b) {
		var c = msg.value.substring (a, b);
		var z = repc (c);
		msg.wrtSel (z, 0, "", "", z.length - c.length);
	}
	else
		msg.value = repc (msg.value);
}
function url () {
	a = msg.selectionStart; b = msg.selectionEnd;
	z = msg.value.substring (a, b);
	if (/((ftp|http|https):\/\/)[\.\w- ]{2,}\.[A-Za-z]{2,4}(\/?$|\/.*)/.test(z) || z.length == 0) {
		msg.wrtSel (z, 5,
			"[url]", "[/url]"
		);
	}
	else if (/[\.\w- ]{2,}\.[A-Za-z]{2,4}(\/?$|\/.*)/.test(z)) {
		msg.wrtSel (
			"http://"+z, 5,
			"[url]", "[/url]", 7
		);
	}
	else {
		msg.wrtSel (z, 5,
			"[url=]", "[/url]",
			-z.length
		);
	}
}
function deltagsin () {
	z = msg.value.substring (a = msg.selectionStart, b = msg.selectionEnd);
	c = z.replace (/\[\w+\](.*)\[\/\w+\]/, "$1");
	msg.wrtSel (c, 0, "", "", - z.length + c.length);
}
function brs () {
	var a = msg.selectionStart, b = msg.selectionEnd;
	if (a != b) {
		var c = msg.value.substring (a, b);
		var z = addbr (c);
		msg.wrtSel (z, 0, "", "", z.length - c.length);
	}
	else {
		msg.value = addbr (msg.value);
	}
}
function qb () {
	var seltxt = getSelection ();
	var getQuoteSrc =
		function (sel, post, prnt) {
			return (
				"[quote" + (
					prnt.parentNode.parentNode != msg.parentNode.parentNode.parentNode.parentNode.parentNode
					? "=" + getUserName (post)
					: ""
				) + "]"
				+ sel.toString ().replace (
					/(?:>>-----Цитата---->>|^)(.*)<<-----Цитата----<</,
					function (str, p) {
						if (p!="") return "[quote]" + p + "[/quote]";
						else return "";
					})
				+ "[/quote]");
		}

	if (seltxt != "") {
		var post = seltxt.getRangeAt (0).commonAncestorContainer;
		while (post.className != "msg")
			post = post.parentNode;
		msg.wrtSel (i = addbr (getQuoteSrc (seltxt, post, this)), i.length);
	}
	else {
		var post = this.parentNode.parentNode;
		msg.wrtSel (i = addbr (getQuoteSrc (getTextContent (post), post, this)), i.length);
	}
	msg.parentNode.mode.selectedIndex = 0;
	return false;
}
function q () {
	var seltxt = getSelection ();
	if (seltxt != "") {
		var post = seltxt.getRangeAt (0).commonAncestorContainer;
		while (post.className != "msg")
			post = post.parentNode;
		msg.wrtSel (i = seltxt.toString ().replace (/(\n\r?|^)(?:\n\r?)?/g, "$1> ") + "\r\n", i.length);
	}
	else {
		post = this.parentNode.parentNode;
		msg.wrtSel (i = getTextContent (post).replace (/(\n\r?|^)(?:\n\r?)?/g, "$1> ")  + "\r\n", i.length);
	}
	msg.parentNode.mode.selectedIndex = 1;
	return false;
}
function user () {
	if ((i = getUserName (this.parentNode.parentNode)) != "anonymous")
		msg.wrtSel (i = "[user]" + i + "[/user], ", i.length);
	else msg.wrtSel (i = "[strong]Михаил[/strong], ", i.length);
	return false;
}
