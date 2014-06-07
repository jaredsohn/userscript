// ==UserScript==
// @name		cnews-buttons-1.24
// @namespace	opensci.ru/org100h
// @include		http://live.cnews.ru/forum/*
// @exclude     http://live.cnews.ru/forum/index.php?showforum=*
// @exclude     http://live.cnews.ru/forum/index.php?act=idx*
// @exclude     http://live.cnews.ru/forum/index.php?showuser=*
// ==/UserScript==
/* -*- tab-width: 4 -*- */

/* CHANGELOG
=============
file: cnews-postmessage_v1.24.user.js
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
Version 1.21 - 23:30 03.12.2011
	[.] fixed insert [*]
	[.] fixed params passed to add_sign (Mathtable)
	[.] make code less readable but faster
Version 1.22 - 	10:24 12.07.2012
	[.] fixed select background-color
Version 1.23 -	12:39 12.07.2012
	[+] button TeX
Version 1.24 -	16:13 14.07.2012
	[.] deleted all around textarea
	[+] button preview
*/

(function() {
GLOBALVARS: var ELEMENT = {};
			var TabArea = {};
			var ESCAPECOMM = {};
			var DATASEGMENT = {left_td_lenght:'',space: false};


			var xpathResult = document.evaluate("//*[@id='logostrip']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var nodeToDelete = xpathResult.snapshotItem(0);
			nodeToDelete.parentNode.removeChild(nodeToDelete);

			xpathResult = document.evaluate("//*[@id='submenu']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			nodeToDelete = xpathResult.snapshotItem(0);
			nodeToDelete.parentNode.removeChild(nodeToDelete);

			xpathResult = document.evaluate("//div[@class='borderwrap']/h3", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			nodeToDelete = xpathResult.snapshotItem(0);
			nodeToDelete.parentNode.removeChild(nodeToDelete);
			
			xpathResult = document.evaluate("//div[@class='borderwrap']/p", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			nodeToDelete = xpathResult.snapshotItem(0);
			nodeToDelete.parentNode.removeChild(nodeToDelete);
			
			//var nodeToDelete1 = xpathResult.snapshotItem(2).children[0];
			//var nodeToDelete2 = xpathResult.snapshotItem(2).children[1];
			//nodeToDelete1.parentNode.removeChild(nodeToDelete1);
			//nodeToDelete2.parentNode.removeChild(nodeToDelete2);
			
			xpathResult = document.evaluate("//*[@id='postingform']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			nodeToDelete2 = xpathResult.snapshotItem(0);
			nodeToDelete = nodeToDelete2.children[11];
			nodeToDelete.parentNode.removeChild(nodeToDelete);

			xpathResult = document.evaluate("//td[@class='maintitle']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			nodeToDelete = xpathResult.snapshotItem(0);
			nodeToDelete.parentNode.removeChild(nodeToDelete);


var where_insert 	= document.evaluate("//input[@class='codebuttons']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).parentNode;
var obj_ta 			= document.evaluate("//textarea[@name='Post']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
var left_td			= document.evaluate("//td[@class='pformleft']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var left_td_lenght	= left_td.snapshotLength;
obj_ta.style.width 	= "780px";

var ctrldblclick	= function(e){
						if(!e.ctrlKey) return;
						if(typeof obj_ta.resized == "undefined" || obj_ta.resized == null) {
							obj_ta.resized = new Array(	obj_ta.style.width,
														obj_ta.style.height,
														obj_ta.style.letterSpacing,
														obj_ta.style.fontFamily );
							var tdToReplace = left_td.snapshotItem(0);
							tdToReplace.style.width = '1%';
							tdToReplace = left_td.snapshotItem(1);
							tdToReplace.style.width = '1%';
							if (left_td.snapshotItem(2)) {
								tdToReplace = left_td.snapshotItem(2);
								tdToReplace.style.width = '1%';
								}
							if (left_td.snapshotItem(3)) {
								tdToReplace = left_td.snapshotItem(3);
								tdToReplace.style.width = '1%';
								}
							obj_ta.style.height	= "400px";
							obj_ta.style.width 	= "800px";
							obj_ta.style.letterSpacing 	= "0.05em";
							obj_ta.style.fontFamily = "'Courier New',monospace";
						}
						else
						{
							obj_ta.style.width						= obj_ta.resized[0];
							obj_ta.style.height						= obj_ta.resized[1];
							obj_ta.style.letterSpacing				= obj_ta.resized[2];
							obj_ta.style.fontFamily					= obj_ta.resized[3];
							left_td.snapshotItem(0).style.width		= '';
							left_td.snapshotItem(1).style.width		= '';
							if (left_td.snapshotItem(2)) {
								left_td.snapshotItem(2).style.width	= '';
								}
							if (left_td.snapshotItem(3)) {
								left_td.snapshotItem(3).style.width	= '';
								}
							obj_ta.resized = null;
						}
					};

var esc_comnd		= function(e){
					ELEMENT = e.target;
					if(ELEMENT.selectionStart == null) return;
					switch(e.keyCode) {
						case 27: // Esc
						ESCAPECOMM.pressed_Esc = 1;
						break;

						case 80: // P
						if(!ESCAPECOMM.pressed_Esc) return;
						e.preventDefault();

						do_insert("[post=","][img]http://forum.cnews.ru/style_images/12/post_snapback.gif[/img][/post]",6);
						e.stopPropagation();
						ESCAPECOMM.pressed_Esc = 0;
						break;

						case 73: // i
						if(!ESCAPECOMM.pressed_Esc) return;
						e.preventDefault();

						do_insert("[I]","[/I]",3);
						e.stopPropagation();
						ESCAPECOMM.pressed_Esc = 0;
						break;

						case 66: // b
						if(!ESCAPECOMM.pressed_Esc) return;
						e.preventDefault();
						do_insert("[B]","[/B]",3);
						e.stopPropagation();
						ESCAPECOMM.pressed_Esc = 0;
						break;

						case 67: // c
						if(!ESCAPECOMM.pressed_Esc) return;
						e.preventDefault();
						do_insert("[FONT=Courier][CODE]","[/CODE][/FONT]",20);
						e.stopPropagation();
						ESCAPECOMM.pressed_Esc = 0;
						break;

						case 85: // u
						if(!ESCAPECOMM.pressed_Esc) return;
						e.preventDefault();
						do_insert("[U]","[/U]",3);
						e.stopPropagation();
						ESCAPECOMM.pressed_Esc = 0;
						break;

						case 87: // w
						if(!ESCAPECOMM.pressed_Esc) return;
						e.preventDefault();
						e.stopPropagation();
						var selRng = [ELEMENT.selectionStart, ELEMENT.selectionStart]
						for(i=selRng[0]-1;i>=0;i--) {
							if (ELEMENT.value.charAt(i) == ' ' || ELEMENT.value.charAt(i) == '\t' || ELEMENT.value.charAt(i) == '\n' || isNaN(ELEMENT.value.charCodeAt(i))) {
								selRng[0] = i+1;
								DATASEGMENT.space = true;
								break;
								}
							if (i==0) selRng[0] = 0;
						}
						for(i=selRng[1]-1;i>=0;i++) {
							if (ELEMENT.value.charAt(i) == ' ' || ELEMENT.value.charAt(i) == '\t' || isNaN(ELEMENT.value.charCodeAt(i))) {
								selRng[1] = i;
								DATASEGMENT.space = true;
								break;
								}
						}
						ELEMENT.focus();
						ELEMENT.selectionStart = selRng[0];
						ELEMENT.selectionEnd = selRng[1];
						break;

						default:
						ESCAPECOMM.pressed_Esc = 0;
						console.info(	'Action: AnyKey \n' + 'keyCode ' + e.keyCode);
						}
					return true;
					};

var add_tag_list	= function(){do_insert("[list=1][*]","\n[/list]",11);};
var add_tag_center	= function(){do_insert("[center]","[/center]",8);};
var add_tag_spoiler	= function(){do_insert("[spoiler=(+) показать]","[/spoiler]",22);};
var add_tag_indent	= function(){do_insert("[indent]","[/indent]",8);};
var add_tag_bkgr	= function(event){do_insert("[background="+ event.target.value + "]","[/background]",event.target.value.length + 13);};
var add_tag_strike	= function(){do_insert("[s]","[/s]",3);};
var add_tag_item	= function(){do_insert("[*]","",3);};
var add_LaTeX		= function(){do_insert("[;",";]",2);};
var add_sign		= function(event) {if (!(event.target.id=='mathclose')) {do_insert(event.target.textContent,"",1);}};
var add_Tex			= function(event) {if (!(event.target.id=='texclose')) {do_insert(event.target.alt,"",parseInt(event.target.name));}};

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
var delete_TeXtable= function(){
						var xpathResult = document.evaluate("//*[@id='TeXTbl']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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
						document.getElementsByTagName('body')[0].appendChild(helptable);
						document.getElementById('hlpclose').addEventListener('click', delete_helptable, false);
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

						document.getElementsByTagName('body')[0].appendChild(mathtable);
						document.getElementById('mathclose').addEventListener('click', delete_mathtable, false);
						document.getElementById('MathTbl').addEventListener('click',add_sign,false);
						};
var add_TeX_tbl	= function(){
						var mathtable = document.createElement('table');
						mathtable.setAttribute('id', 'TeXTbl');
						mathtable.setAttribute('class', 'MathTbl');
						mathtable.style.position = 'fixed';
						mathtable.style.top 	 = '64px';
						mathtable.style.left 	 = '64px';
						mathtable.style.zIndex 	 = '9999';
						mathtable.innerHTML = "<tr><td colspan=10 id='texclose'>CLOSE(<B id='texclose'>X</B>)</tr><tr><td colspan=10></tr><tr><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Csqrt%7B2%7D' alt='\\sqrt{2}' name='6' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Csqrt%5B3%5D%7B5%7D' alt='\\sqrt[3]{5}' name='7' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=x%5E%7By%7D' alt='x^y' name='3' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Cfrac%7Ba%7D%7Bb%7D' alt='\\frac{a}{b}' name='7' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Cfrac%7B%5Cpartial+%7D%7B%5Cpartial+x%7D' alt='\\frac{\\partial }{\\partial x}' name='29' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Cfrac%7B%5Cmathrm%7Bd%7D+%7D%7B%5Cmathrm%7Bd%7D+x%7D' alt='\\frac{\\mathrm{d} }{\\mathrm{d} x}' name='17' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Ctiny+%5Cdisplaystyle+%5Csum_%7Bi%3Dn%7D%5E%7B10%7D' alt='\\displaystyle \\sum_{i=n}^{10}' name='26' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Ctiny++%5Csum_%7Bi%3Dn%7D%5E%7B10%7D' alt='\\sum_{i=n}^{10}' name='12' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%7Bx_%7Bk%7D%7D%5E%7B3%7D' alt='{x_{k}}^{3}' name='4' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Clog_%7Ba%7Dx' alt='\log_{a}x' name='6' /></tr><tr><td colspan=10></tr><tr><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=+%5Cvec%7Br%7D+' alt='\\vec{r}' name='5' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Cforall' alt='\\forall ' name='7' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall%5Cexists' alt='\\exists' name='7' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall%5Cin' alt='\\in' name='3' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall%5Cnotin' alt='\\notin' name='6' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall%5Cmathbb%7BZ%7D' alt='\\mathbb{Z}' name='10' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall%5Cinfty' alt='\\infty' name='6' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=+%5Ccdot' alt='\\cdot' name='5' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Cdiv' alt='\\div' name='4' /><td><img src='http://chart.apis.google.com/chart?cht=tx&chl=%5Csmall+%5Ctimes' alt='\\times' name='6' /></tr><tr><td colspan=10><a href='http://live.cnews.ru/forum/index.php?showtopic=68455'><u>TeXify cnews.ru</u></a> | <a href='http://www.codecogs.com/latex/eqneditor.php'><u>codecogs.com</u></a></tr>";

						document.getElementsByTagName('body')[0].appendChild(mathtable);
						document.getElementById('texclose').addEventListener('click', delete_TeXtable, false);
						document.getElementById('TeXTbl').addEventListener('click',add_Tex,false);
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

						var sct1 = document.createElement('select');
						sct1.setAttribute('id', 'sct1');
						sct1.setAttribute('class', 'buttonEx');
						sct1.innerHTML ="<option value='0'>Фон для текста</option> <option value='Plum' style='background-color: Plum;'>Plum</option> <option value='Thistle' style='background-color: Thistle;'>Thistle</option> <option value='LightPink' style='background-color: LightPink;'>LightPink</option> <option value='BurlyWood' style='background-color: BurlyWood;'>BurlyWood</option> <option value='lightgray' style='background-color: lightgray; font-weight: 800'>светлоСерый</option> <option value='lightgreen' style='background-color: lightgreen; font-weight: 800'>светлоЗеленый</option> <option value='blue' style='background-color: blue; font-weight: 800'>Синий</option> <option value='red' style='background-color: red; font-weight: 800'>Красный</option> <option value='purple' style='background-color: purple; font-weight: 800'>Фиолетовый</option> <option value='orange' style='background-color: orange; font-weight: 800'>Оранжевый</option> <option value='yellow' style='background-color: yellow; font-weight: 800'>Желтый</option> <option value='gray' style='background-color: gray; font-weight: 800'>Серый</option> <option value='green' style='background-color: green; font-weight: 800'>Зеленый</option> <option value='Black' style='background-color: Black; font-weight: 800'>Black</option>";
						where_insert.appendChild(sct1);
						for (i=1 ; i<15 ; i++) {
							sct1.options[i].addEventListener('click', add_tag_bkgr, true);
						}

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

						var btn10 = document.createElement('input');
						btn10.setAttribute('type', 'button');
						btn10.setAttribute('id', 'button8Ex');
						btn10.setAttribute('value', 'TeX');
						btn10.addEventListener('click', add_TeX_tbl, false);
						where_insert.appendChild(btn10);

//<input type="submit" class="button" tabindex="8" value="Предварительный просмотр" name="preview">

						var btn11 = document.createElement('input');
						btn11.setAttribute('type', 'submit');
						btn11.setAttribute('class', 'button');
						btn11.setAttribute('value', 'preview');
						btn11.setAttribute('name', 'preview');
						where_insert.appendChild(btn11);

						var btn7 = document.createElement('input');
						btn7.setAttribute('type', 'button');
						btn7.setAttribute('id', 'button7Ex');
						btn7.setAttribute('value', '?');
						btn7.setAttribute('title', 'Help');
						btn7.addEventListener('click', add_tag_help, false);
						where_insert.appendChild(btn7);

						obj_ta.addEventListener('dblclick', ctrldblclick, false);
						obj_ta.addEventListener('keydown', esc_comnd, false);
					};
 /* ***** stylesheet ****************************************** */
	var addon_style = document.createElement('style');
		addon_style.setAttribute('type', "text/css");
		addon_style.appendChild(document.createTextNode(".buttonEx {border: 1px solid red;} #button7Ex {border: 1px solid blue;} #hlpTbl{background-color: #FFFE88; border: 1px solid gray;} #hlpTbl TD {text-align: left;} #hlpclose{cursor: pointer; cursor: hand;} .hlpwhat {background-color: white;} #MathTbl{background-color: #FFFE88; border: 1px solid gray;} .MathTbl TD {background-color: white; cursor: default} #TeXTbl{background-color: #FFFE88; border: 1px solid gray;} .TeXTbl TD {background-color: white; cursor: default} #mathclose{cursor: pointer; cursor: hand; text-align: right;} #texclose{cursor: pointer; cursor: hand; text-align: right;}"));
	var addon_head = addon_title = 0;
	try {
	if (addon_head = document.getElementsByTagName('head')[0]) {
		addon_head.appendChild(addon_style);
	} else if (addon_title = document.getElementByTagName('title')[0])
		addon_title.parentNode.insertBefore(addon_style, addon_title);
	} catch(e) {}
init();
})();