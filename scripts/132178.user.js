// ==UserScript==
// @name            	Livada Online
// @description   	Помощник за играта
// @author           	НСБОП
// @version	1.0
// @include          	http://g1.livada.bg/*
// ==/UserScript==


function addElem(elem, html, attributes, style, parent){
	var aElem = document.createElement(elem);
	if (html) aElem.innerHTML = html;
	if (attributes)	for (a in attributes) aElem.setAttribute(a, attributes[a]);
	if (style) for (a in style) aElem.style[a] = style[a];
	if (!parent) parent = $tags('body')[0];
	else parent = (typeof(parent) == 'string') ? $(parent) : parent;
	if (!parent) return false;
	parent.appendChild(aElem);
	return aElem;
}

function $tags(tag){
	return document.getElementsByTagName(tag);
}

function $(id){
	return document.getElementById(id);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var menuinner = '<i title="Ливада Online"><a href="http://g1.livada.bg"><img style="position: fixed; top: 15px; left: 65px; z-index: 10;" src="http://i.livada.bg/locale/BG/i/inside_logo2.png" width="40px" height="40px" /></a></i>'+

////////////////////////////////////////////////////////////////////////////////////
// МОЛЯ НЕ РЕДАКТИРАЙТЕ КОДА ОСВЕН АКО НЕ ЗНАЕТЕ КАКВО ПРАВИТЕ !!!
///////////////////////////////////////////////////////////////////////////////////

'<div id="Menu" style="position: fixed; padding: 0px; top: -1px; left: 0px; width: 171px; height: 257px; z-index: 9; background: url(http://remivorud.com/lvd/lvd-back.png);/></div>'+
'<div style="position: fixed; padding: 0px; top: 0px; left: 0px; z-index: 12;>'+

'<div style="position: relative; padding: 0px; top: 55px; left: 10px; width: 150px; color:#4F2205; text-align:left">'+

'<div style="position: relative; padding: 0px; top: 0px; left: 5px; color:#4F2205; text-align:center"><b>Помощник за играта   </b></div>'+
'<hr width="100%" >'+
'<div style="position: relative; padding: 0px; top: -4px; left: 5px; color:#4F2205; text-align:center">Бързи линкове</div> '+
'<i title="Презареди"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://remivorud.com/lvd/rld.png" onClick="window.location.reload()"></i>'+
' <i title="Стаята на абитуриента"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img546.imageshack.us/img546/8199/0000school.png" onclick="document.location.href=\'/school.php?m=class2\';"></i>'+
' <i title="Мина"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img207.imageshack.us/img207/6885/0002mine.png" onclick="document.location.href=\'/mine.php?a=open\';"></i>'+
' <i title="Плантация"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img18.imageshack.us/img18/9089/farmra.png" onclick="document.location.href=\'/house.php?info=plant\';"></i>'+
' <i title="Пристан"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img59.imageshack.us/img59/7766/harborg.png" onclick="document.location.href=\'/harbour.php?a=pier\';"></i>'+
' <i title="Аукцион"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img98.imageshack.us/img98/2897/auctionh.png" onclick="document.location.href=\'/trade.php\';"></i>'+
' <i title="Таверна"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img856.imageshack.us/img856/9871/tvrn.png" onclick="document.location.href=\'/tavern.php\';"></i>'+
' <i title="Морал"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img685.imageshack.us/img685/6717/mrlb.png" onclick="document.location.href=\'/player.php?a=morale&id=\';"></i>'+
' <i title="Зарове"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img38.imageshack.us/img38/2791/68495157.png" onclick="document.location.href=\'/tavern.php?a=game&id=1\';"></i>'+
' <i title="Чашки"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img851.imageshack.us/img851/6649/68802770.png" onclick="document.location.href=\'/tavern.php?a=game&id=2\';"></i>'+
'  <i title="Така и така"><img  style="position: relative; top: -1px; left: 0px; z-index: 13;" height="15px" src="http://img855.imageshack.us/img855/4374/ga3.png" onclick="document.location.href=\'/tavern.php?a=game&id=3\';"></i>'+
' <i title="Щаб"><img  style="position: relative; top: 0px; left: 1px; z-index: 13;" height="16px" src="http://img842.imageshack.us/img842/324/warw.png" onclick="document.location.href=\'shtab.php\';"></i>'+
'  <i title="Текущи войни"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img834.imageshack.us/img834/4979/wrstats.png" onclick="document.location.href=\'clan_embassy.php?m=wars\';"></i>'+
'</center>'+
'<hr / >'+
'<div style="position: relative; padding: 0px; top: -4px; left: 5px; color:#4F2205; text-align:center">Атака на врага</div> '+
'<center>'+
'<font style="color:#4F2205;" >  <i title="Търси от списъци"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="17px" src="http://img265.imageshack.us/img265/4233/srch.png" onclick="window.location = \'dozor.php\'; $(\'#watch_find\').parent().submit();"></i><font style="position: relative; top: -5px; left: 0px; z-index: 13; "> » </font> '+
'<i title="Атакувай"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="16px" src="http://img710.imageshack.us/img710/171/0005attack.png" onclick="window.location = \'dozor.php\'; $(\'#watch_attack\').submit();"></i>'+
'</center>'+
'<hr / >'+
'<div style="position: relative; padding: 0px; top: -4px; left: 5px; color:#4F2205; text-align:center">Отвари</div> '+
'<center>'+
' <i title="Купи"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="17px" src="http://i.livada.bg/images/items/Potion_1s.jpg" onclick="window.location = \'shop.php\'; $(\'#shop_cmd_1\').parent().submit();"></i>'+
' <i title="Купи"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="17px" src="http://i.livada.bg/images/items/Potion_2s.jpg" onclick="window.location = \'shop.php\'; $(\'#shop_cmd_2\').parent().submit();"></i>'+
' <i title="Купи"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="17px" src="http://i.livada.bg/images/items/Potion_3s.jpg" onclick="window.location = \'shop.php\'; $(\'#shop_cmd_3\').parent().submit();"></i>'+
' <i title="Купи"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="17px" src="http://i.livada.bg/images/items/Potion_7s.jpg" onclick="window.location = \'shop.php\'; $(\'#shop_cmd_130\').parent().submit();"></i>'+
' <i title="Купи"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="17px" src="http://i.livada.bg/images/items/Potion_8s.jpg" onclick="window.location = \'shop.php\'; $(\'#shop_cmd_131\').parent().submit();"></i>'+
' <i title="Купи"><img  style="position: relative; top: 0px; left: 0px; z-index: 13;" height="17px" src="http://i.livada.bg/images/items/Potion_9s.jpg" onclick="window.location = \'shop.php\'; $(\'#shop_cmd_132\').parent().submit();"></i>'+
'</center>'+
'<div style="position: relative; padding: 0px; top: 3px; left: 0px; color:#4F2205; text-align:right">Версия: 1.0</div> '+
'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}