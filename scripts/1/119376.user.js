// ==UserScript==
// @name		cnews-postmessage
// @namespace	opensci.ru/org100h
// @include		http://live.cnews.ru/forum/*
// ==/UserScript==
/* -*- tab-width: 4 -*- */

/* CHANGELOG
=============

Version 1.00 - 0:55 27.11.2011
	 -- Initial revision
Version 1.01 - 9:57 29.11.2011
	[.] fixed missing all buttons on edit mode
	[.] fixed erroneous inserted letter B on act 'close'
	[.] fixed empty link in help table
	[?] code: evaluate("//textarea[@name='Post']"
		&
		code: evaluate("//input[@class='codebuttons']" + obj_input.parentNode
		maybe a bit slow, but more reliable
Version 1.1 - 3:55 03.12.2011
	[+] tags now wraps selected text
Version 1.2 - 21:54 03.12.2011
	[+] selection remain in textarea after wraps,
		or cursor plased between tags if there was no selection
Version 1.23 - 22:34 16.12.2011
	[.] fixed inserted string 'undefined' in textarea. params in add_sign. 
*/

(function() {
var where_insert 	= document.evaluate("//input[@class='codebuttons']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).parentNode;
var obj_ta 			= document.evaluate("//textarea[@name='Post']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);

var add_tag_list	= function(){do_insert("[list=1][*]","\n[/list]",11);};
var add_tag_center	= function(){do_insert("[center]","[/center]",8);};
var add_tag_spoiler	= function(){do_insert("[spoiler=(+) показать]","[/spoiler]",22);};
var add_tag_indent	= function(){do_insert("[indent]","[/indent]",8);};
var add_tag_strike	= function(){do_insert("[s]","[/s]",3);};
var add_tag_item	= function(){do_insert("[*]","\n",3);};
var add_LaTeX		= function(){do_insert("[;",";]",2);};
var add_sign		= function(event) {
							if (!(event.target.id=='mathclose')) {
							do_insert(event.target.textContent,'',1);
						}};
var delete_helptable= function(){
						var xpathResult = document.evaluate("//*[@id='hlpTbl']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						var nodeToDelete = xpathResult.snapshotItem(0);
						nodeToDelete.parentNode.removeChild(nodeToDelete);
						};
var delete_mathtable= function(){
						var xpathResult = document.evaluate("//*[@id='MathTbl']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						var nodeToDelete = xpathResult.snapshotItem(0);
						nodeToDelete.parentNode.removeChild(nodeToDelete);
						};
var add_tag_help	= function(){
						var helptable = document.createElement('table');
						helptable.setAttribute('id', 'hlpTbl');
						helptable.style.position = 'fixed';
						helptable.style.top = '96px';
						helptable.style.right = '5px';
						helptable.style.zIndex = '9999';
						helptable.innerHTML = "<tr><td style=' text-align: right;' colspan=2 id='hlpclose'>CLOSE(<B>X</B>)</tr><tr><td style='background-color: white;' colspan=2></tr><tr><td class='hlpwhat'>list=<b>1</b><td>Допустимые параметры: [1,A,a,I,i]</tr><tr><td class='hlpwhat'>[*]<td>Обязательный элемент в списке</tr><tr><td class='hlpwhat'>center<td>Параграф с выравниванием по центру</tr><tr><td class='hlpwhat'>spoiler<td>Убирает фотографии или длинный текст внутрь полоски, раскрывающейся по щелчку</tr><tr><td class='hlpwhat'>indent<td>Сдвигает параграф вправо</tr><tr><td class='hlpwhat'>strike<td>Зачеркнутый текст</tr><tr><td class='hlpwhat'>Math<td>Таблица быстрого набора знаков</tr><tr><td class='hlpwhat'>[;;]<td>LaTeX, смотри тему: <a href='http://live.cnews.ru/forum/index.php?showtopic=68455'><u>LaTeX</u></a></tr>";
						var bdys = document.getElementsByTagName('body');
						bdys[0].appendChild(helptable);
						var trig = document.getElementById('hlpclose');
						trig.addEventListener('click', delete_helptable, false);
						};
var add_math_tbl	= function(){
						var mathtable = document.createElement('table');
						mathtable.setAttribute('id', 'MathTbl');
						mathtable.setAttribute('class', 'MathTbl');
						mathtable.style.position = 'fixed';
						mathtable.style.top 	 = '64px';
						mathtable.style.left 	 = '64px';
						mathtable.style.zIndex 	 = '9999';
						mathtable.innerHTML = "<tr><td colspan=10 id='mathclose'>CLOSE(<B id='mathclose'>X</B>)</tr><tr><td colspan=10></tr><tr><td>√<td>∫<td>×<td>≤<td>≠<td>≥<td>÷<td>∙<td>∞<td>∑</tr><tr><td>∂<td>½<td>⅓<td>¼<td>⅛<td>⅔<td>¾<td>∆<td>±<td>–</tr><tr><td>≈<td>≡<td>∩<td>←<td>↑<td>→<td>↓<td>↔<td>°<td>¬</tr><tr><td colspan=10></tr><tr><td>\u0391<td>\u03b1<td>\u0392<td>\u03b2<td>\u0393<td>\u03b3<td>\u0394<td>\u03b4<td>\u0395<td>\u03b5</tr><tr><td>\u0396<td>\u03b6<td>\u0397<td>\u03b7<td>\u0398<td>\u03b8<td>\u0399<td>\u03b9<td>\u039a<td>\u03ba</tr><tr><td>\u039b<td>\u03bb<td>\u039c<td>\u03bc<td>\u039d<td>\u03bd<td>\u039e<td>\u03be<td>\u039f<td>\u03bf</tr><tr><td>\u03a0<td>\u03c0<td>\u03a1<td>\u03c1<td>\u03a2<td>\u03c2<td>\u03a3<td>\u03c3<td>\u03a4<td>\u03c4</tr><tr><td>\u03a5<td>\u03c5<td>\u03a6<td>\u03c6<td>\u03a7<td>\u03c7<td>\u03a8<td>\u03c8<td>\u03a9<td>\u03c9</tr>";

						var bdys = document.getElementsByTagName('body');
						bdys[0].appendChild(mathtable);
						var trig = document.getElementById('mathclose');
						trig.addEventListener('click', delete_mathtable, false);
						var trig2 = document.getElementById('MathTbl');
						trig2.addEventListener('click',add_sign,false);
						//trig.removeEventListener('click',add_sign,false);
						};
var do_insert 		= function(stag,etag,len) {
						if (obj_ta.setSelectionRange && !obj_ta.readOnly) {
							var rng = [obj_ta.selectionStart, obj_ta.selectionEnd];
							obj_ta.value = obj_ta.value.substr(0, rng[0]) + stag + obj_ta.value.substr(rng[0],rng[1]-rng[0]) + etag + obj_ta.value.substr(rng[1]);
						obj_ta.focus();
						obj_ta.selectionStart = rng[0]+len;
						obj_ta.selectionEnd = rng[1]+len;
						}
						};
var init 			= function() {
						var btn1 = document.createElement('input');
						btn1.setAttribute('type', 'button');
						btn1.setAttribute('class', 'buttonEx');
						btn1.setAttribute('value', 'list');

						btn1.addEventListener('click', add_tag_list, false);
						where_insert.appendChild(btn1);

						var btn6 = document.createElement('input');
						btn6.setAttribute('type', 'button');
						btn6.setAttribute('class', 'buttonEx');
						btn6.setAttribute('value', '[*]');
						btn6.addEventListener('click', add_tag_item, false);
						where_insert.appendChild(btn6);

						var btn2 = document.createElement('input');
						btn2.setAttribute('type', 'button');
						btn2.setAttribute('class', 'buttonEx');
						btn2.setAttribute('value', 'center');
						btn2.addEventListener('click', add_tag_center, false);
						where_insert.appendChild(btn2);

						var btn3 = document.createElement('input');
						btn3.setAttribute('type', 'button');
						btn3.setAttribute('class', 'buttonEx');
						btn3.setAttribute('value', 'spoiler');
						btn3.addEventListener('click', add_tag_spoiler, false);
						where_insert.appendChild(btn3);

						var btn4 = document.createElement('input');
						btn4.setAttribute('type', 'button');
						btn4.setAttribute('class', 'buttonEx');
						btn4.setAttribute('value', 'indent');
						btn4.addEventListener('click', add_tag_indent, false);
						where_insert.appendChild(btn4);

						var btn5 = document.createElement('input');
						btn5.setAttribute('type', 'button');
						btn5.setAttribute('class', 'buttonEx');
						btn5.setAttribute('value', 'strike');
						btn5.addEventListener('click', add_tag_strike, false);
						where_insert.appendChild(btn5);

						var btn9 = document.createElement('input');
						btn9.setAttribute('type', 'button');
						btn9.setAttribute('class', 'buttonEx');
						btn9.setAttribute('value', '[; ;]');
						btn9.addEventListener('click', add_LaTeX, false);
						where_insert.appendChild(btn9);

						var btn8 = document.createElement('input');
						btn8.setAttribute('type', 'button');
						btn8.setAttribute('id', 'button8Ex');
						btn8.setAttribute('value', 'Math');
						btn8.addEventListener('click', add_math_tbl, false);
						where_insert.appendChild(btn8);

						var btn7 = document.createElement('input');
						btn7.setAttribute('type', 'button');
						btn7.setAttribute('id', 'button7Ex');
						btn7.setAttribute('value', '?');
						btn7.setAttribute('title', 'Help');
						btn7.addEventListener('click', add_tag_help, false);
						where_insert.appendChild(btn7);
						};
 /* ***** stylesheet ****************************************** */
	var addon_style = document.createElement('style');
		addon_style.setAttribute('type', "text/css");
		addon_style.appendChild(document.createTextNode(".buttonEx {border: 1px solid red;} #button7Ex {border: 1px solid blue;} #hlpTbl{background-color: #FFFE88; border: 1px solid gray;} #hlpTbl TD {text-align: left;} #hlpclose{cursor: pointer; cursor: hand;} .hlpwhat {background-color: white;} #MathTbl{background-color: #FFFE88; border: 1px solid gray;} .MathTbl TD {background-color: white; cursor: default} #mathclose{cursor: pointer; cursor: hand; text-align: right;}"));
	var addon_head = addon_title = 0;
	try {
	if (addon_head = document.getElementsByTagName('head')[0]) {
		addon_head.appendChild(addon_style);
	} else if (addon_title = document.getElementByTagName('title')[0])
		addon_title.parentNode.insertBefore(addon_style, addon_title);
	} catch(e) {}
init();
})();