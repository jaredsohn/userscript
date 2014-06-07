// ==UserScript==
// @name LORCode Tools
// @description Кнопка цитирования выделенного и панель тегов для LORCode
// @author Алексей Соловьев aka moscwich
// @license Creative Commons Attribution 3.0 Unported
// @version 0.13
// @namespace http://www.linux.org.ru/*
// @namespace https://www.linux.org.ru/*
// @include http://www.linux.org.ru/*
// @include https://www.linux.org.ru/*
// ==/UserScript==

// Based on MultiCodePanel 2.2 (v. 0.22)
// http://al-moscwich.tk/tag/multicodepanel

// Изменения (0.12):
//		Bugfix по сосзданию опросов
//		MultiCodePanel 2.2:
//			Новые превращения fix
//			Функция deltagsin
// 		Функция brs (в опере глючит, поэтому кнопка не показывается)
//		Форма ответа становится шире, а элементы панели группируются
// 	При цитировании к переводам строк добавляются [br]
// 	В т. ч. upd. 1 of 0.11 (0.11.1):
// 		Bugfix: положение панельки при создании тем
// 		Убираются всем надоевшие строчки над формой ввода сообщения

// Изменения (0.13):
// 	тире при прямой речи (+)
// 	bugfix из fix по звездочкам (+)
// 	Баги оперы по цитируванию превратились в фичи (+)
// 	bugfix при изменении топиков partennode... (+)
// 	баг с цветами панельки на фф (+)
// 	начало реструктуризации (+)
// 	bugfix: указатель после цитирования (+)

// План на 0.2:
// 	добавить панель на изменение регистрации
// 	опционально цитирование без автора
// 	в цитатник
// 	что-нибудь с кодами
// 	совершенствование структуры
// 	обращение

// План на когда-нибудь:
// 	brs на opera
// 	deltags-out, хотя бы на крайний

u = window.location.href;
if (/https?:\/\/(www\.)?linux.org.ru/.test(u)){
function contentEval (source){
	source = '(' + source + ')();';
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
function removeElement (elem){
	elem.parentNode && elem.parentNode.removeChild(elem);
}

form = document.getElementById ("commentForm") || document.getElementById ("messageForm");

if (form){
	panel = document.createElement ("div");
	panel.id = 'atag';
	panel.innerHTML = '<span>\
<strong><a href=\'javascript:intag ("strong");\' title="Жирный">[b]</a></strong>\
<em><a href=\'javascript:intag ("em");\' title="Курсив">[i]</a></em>\
<s><a href=\'javascript:intag ("s");\' title="Зачеркнутый">[s]</a></s>\
<u><a href=\'javascript:intag ("u");\' title="Подчеркнутый">[u]</a></u>\
</span><span>\
<a href=\'javascript:intag ("quote");\' title="Цитата">[quote]</a>\
<a href=\'javascript:intag ("code");\' title="Код">[code]</a>\
</span><span>\
<a href=\'javascript:url ();\' title="Линка">[url]</a>\
<a href=\'javascript:intag ("user");\' title="Код">[user]</a>\
</span><span>\
<a href=\'javascript:intag ("list");\' title="Список">[list]</a>\
<a href=\'javascript:getObj ().wrtSel ("[*]", "");\' title="Элемент списка">[*]</a>\
</span><span>\
<a href=\'javascript:getObj ().wrtSel ("«", "»");\' title="Кавычки">«»</a>\
<a href=\'javascript:getObj ().wrtSel ("„", "“");\' title="Кавычки">„“</a>\
<a href=\'javascript:getObj ().wrtSel ("[br]", "");\' title="Перевод строки">[br]</a>\
</span><span>\
<a href=\'javascript:fix ();\' title="Превратить знаки и обозначения в соответствующие спец. символы "> fix </a>\
<a href=\'javascript:deltagsin ();\' title="Удалить крайнее входящие обрамление тегами"> deltags-in </a>\
<!--<a href=\'javascript:deltagsout ();\' title="Удалить внешнее обрамление тегами"> deltags-out </a>-->';
	if (!window.opera) panel.innerHTML += '<a href=\'javascript:brs ();\' title="Добавить [br] к переводам строк"> brs </a>';
	panel.innerHTML += '</span>';
}

form.insertBefore (panel, i = document.getElementById("msg") || document.getElementById("form_msg"));
i.cols = "100";

i = document.createElement ("style");
i.innerHTML = '#atag a {text-decoration: none; background-color:#2e3436; border: #2e3436 outset 1px; color: #729fcf !important; padding:2px 3px; margin:2px;}\
#atag a:hover {background-color:#2e3436; border-color:#729fcf;}\
#atag{margin-top: 5px; margin-bottom: 5px; font-size: 0.9em; padding: 3px 1px;}\
.title {padding:2px;}\
label[for="msg"] {display:block;margin:5px 0px;}\
#atag>span {dispay: inline-block; margin-right: 4px;}';
document.head.appendChild (i);

if (u.indexOf ("http://www.linux.org.ru/add.jsp?group=19387") <= -1 && u.indexOf ("http://www.linux.org.ru/edit.jsp") <= -1){
	removeElement(form.getElementsByTagName('font')[0]);
	removeElement(form.getElementsByTagName('br')[1]);
	removeElement(form.getElementsByTagName('br')[1]);
}

	a = document.getElementsByClassName ("title");
	for (var i = 0; i < a.length; i++){
		if (a[i].parentNode.className == "msg"){
			id = a[i].parentNode.id;
			if (i == 0){
				t = id.substring (6, id.length);
				z = "comment-message.jsp?topic=" + t;
			}
			else {
				z = "add_comment.jsp?topic=" + t + "&replyto=" + id.substring (8, id.length);
			}
			a[i].innerHTML = "<span>[<a href='javascript: q();'>цитировать</a>]</span>" + a[i].innerHTML;
		}
	}
//}

contentEval (function (){

a = undefined;
b = undefined;

window.getObj = function (){
	var obj = document.getElementById ("msg") || document.getElementById ("form_msg");
	obj.wrtSel = wrtSel;
	return obj;
}

window.set = function (p, z){
	for (var i=0; i<arguments.length && (arguments[i] === undefined); i++) {}
	return arguments[i];
}

window.wrtSel = function (subj, offset, before, after, zset){ //Also wrtSel (before, after, offset)
	if (typeof offset == "string"){
		after = offset;
		offset = before;
		before = subj;
		subj = undefined;
	}
	
	startSel = set (a, this.selectionStart);
	endSel = set (b, this.selectionEnd);
	
	before = before || "";
	after = after || "";
	zset = zset || 0;

	subj = before + set (subj, this.value.substring (startSel, endSel)) + after;
	offset = set (offset, before.length);

	this.value = this.value.substring (0, startSel) + subj + this.value.substring (endSel);
	this.focus(); this.setSelectionRange (startSel+offset, endSel+offset+zset);

	a = undefined;
	b = undefined;
}

window.intag = function (tag, arg) {
	var obj = getObj ();
	arg = arg || "";
	
	obj.wrtSel (
		undefined,
		tag.length + arg.length + 2,
		"[" + tag + arg + "]",
		"[/" + tag + "]"
	);
}

window.fix = function () {
	function repc (c) {
		/*
		a = a.replace(/</g, "&lt;");
		a = a.replace(/>/g, "&gt;");
		  //Смысл, правда именно в этих строчках был, но нам это не надо
		  //Впрочем вся эта функция (fix) - вещь не очень нужная, можно убрать...
		*/
		c = c.replace(/\([tт][mм]\)/gi, "™");
		c = c.replace(/\(c\)/gi, "©");
		c = c.replace(/\([rр]\)/gi, "®");
		c = c.replace(/\(f\)/gi, "£");
		c = c.replace(/\(e\)/gi, "€");
		c = c.replace(/\(p\)/gi, "§");
		c = c.replace(/(^| )- /g, "$1— ");
		c = c.replace(/\.\.\./g, "…");
		c = c.replace(/-->/g, "→");
		c = c.replace(/`/g, "&#769;");
		c = c.replace(/%\/10/g, "‰");
		c = c.replace(/%\/100/g, "‱");
		c = c.replace(/\(\*\+?\)/g, "★");
		c = c.replace(/\(\*-\)/g, "☆");
		c = c.replace(/\(V\)/g, "✓");
		c = c.replace(/\(V\+\)/g, "✔");
		c = c.replace(/\(x\)/g, "✗");
		c = c.replace(/\(x\+\)/g, "✘");
		return c;
	}
	
	var obj = getObj ();
	a=obj.selectionStart; b=obj.selectionEnd;
	
	if (a != b) {
		var c = obj.value.substring (a, b);
		var z = repc (c);
		obj.wrtSel (z, 0, "", "", z.length - c.length);
	}
	else {
		obj.value = repc (obj.value);
	}
}

window.add = function (code){
	var obj = getObj ();
	if (code.substring (code.length-1, code.length) == "\n" && window.opera) {
		obj.wrtSel (code, "", code.length+1);}
	else {
		obj.wrtSel (code, "");
	}
}

window.url = function (){
	obj = getObj ();
	a = obj.selectionStart; b = obj.selectionEnd;
	z = obj.value.substring (a, b);
	if (/((ftp|http|https):\/\/)[\.\w- ]{2,}\.[A-Za-z]{2,4}(\/?$|\/.*)/.test(z) || z.length == 0){
		obj.wrtSel (z, 5,
			"[url]", "[/url]"
		);
	}
	else if (/[\.\w- ]{2,}\.[A-Za-z]{2,4}(\/?$|\/.*)/.test(z)){
		obj.wrtSel (
			"http://"+z, 5,
			"[url]", "[/url]", 7
		);
	}
	else {
		obj.wrtSel (z, 5,
			"[url=]", "[/url]",
			-z.length
		);
	}
}

window.addbr = function (c){
	return c.replace (/^((?:(?!\[\/?(?:quote|code|br)\]$)[^\n])+$)(?!\n\n|\n\[\/?(?:br|quote|code)\])/gm, "$1[br]");
}

window.q = function (){
	obj = getObj ();
	var seltxt = window.getSelection ();
	msg = seltxt.getRangeAt (0).commonAncestorContainer;
	while (msg.className != "msg"){
		msg = msg.parentNode;
	}
	obj.wrtSel (
		i = addbr (
			"[quote=" +
				msg.getElementsByClassName ("sign")[0].getElementsByTagName ("a")[0].innerHTML + "]" +
			 seltxt.toString ().replace (
				/(?:>>-----Цитата---->>|^)(.*)<<-----Цитата----<</,
				function (str, p) {
					if (p!="") return "[quote]"+p+"[/quote]"; else return "";
				}) +
			"[/quote]"),
			i.length);
}

window.deltagsin = function (){
	obj = getObj ();
	z = obj.value.substring (a = obj.selectionStart, b = obj.selectionEnd);
	c = z.replace (/^([^\[\]]*)\[\w+\](.*)\[\/\w+\]([^\[\]]*)$/, "$1$2$3");
	obj.wrtSel (c, 0, "", "", - z.length + c.length);
}

window.brs = function (){
	obj = getObj ();
	if ((a = obj.selectionStart) != (b = obj.selectionEnd)) {
		var c = obj.value.substring (a, b);
		var z = addbr (c);
		obj.wrtSel (z, 0, "", "", z.length - c.length);
	}
	else {
		obj.value = addbr (obj.value);
	}
}

});
}
