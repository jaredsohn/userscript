// ==UserScript==
// @name          Nice BuO
// @namespace     NiceDeveloper
// @author        NiceDeveloper
// @description   Улучшение интерфейса сервиса Вопросы и Ответы (otvety.google.ru)
// @version       0.1.1
// @license       (CC BY-NC-ND 3.0) http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @include       http://otvety.google.ru/*
// @include       http://www.otvety.google.ru/*
// ==/UserScript==

(function(){

HTMLElement.prototype.prev = function() {
	var elem = this;
	do {
		elem = elem.previousSibling;
	} while ( elem && elem.nodeType != 1 );
	return elem;
}

HTMLElement.prototype.next = function() {
	var elem = this;
	do {
		elem = elem.nextSibling;
	} while ( elem && elem.nodeType != 1 );
	return elem;
}

// получение первого дочернего элемента
HTMLElement.prototype.first = function( elem ) {
	var elem = this;
	elem = elem.firstChild;
	return elem && elem.nodeType != 1 ?
		elem.nextSibling : elem;
}

// получение последнего дочернего элемента
HTMLElement.prototype.last = function( elem ) {
	var elem = this;
	elem = elem.lastChild;
	return elem && elem.nodeType != 1 ?
		elem.previousSibling : elem;
}

// получение родительского элемента
HTMLElement.prototype.parent = function( num ) {
	var elem = this;
	num = num || 1;
	for ( var i = 0; i < num; i++ )
		if ( elem != null ) elem = elem.parentNode;
	return elem;
}

var unsafeWindow= this.unsafeWindow;
try{
(function(){
 var test_scr= document.createElement("script");
 var tid= ("t" + Math.random() + +(new Date())).replace(/\./g, "");
 test_scr.text= "window."+tid+"=true";
 document.querySelector("body").appendChild(test_scr);
 if (typeof(unsafeWindow) == "undefined" || !unsafeWindow[tid]) {
  if (window[tid]) {
   unsafeWindow= window;
  } else {
   var scr= document.createElement("script");
   scr.text= "(" +
    (function() {
     var el= document.createElement('unsafeWindow');
     el.style.display= 'none';
     el.onclick=function(){return window};
     document.body.appendChild(el);
    }).toString() + ")()";
   document.querySelector("body").appendChild(scr);
   this.unsafeWindow= document.querySelector("unsafeWindow").onclick();
   unsafeWindow= window.unsafeWindow;
  };
 }
})();
} catch(e){};
function show_settings(){
var nbuo_settings_inner=unsafeWindow.document.createElement('div');
nbuo_settings_inner.setAttribute('class','awl');
nbuo_settings_inner.setAttribute('style','margin-bottom:30px;');
nbuo_settings_inner.setAttribute('id','nice_buo_settings_popup');

var nbuo_settings_title=unsafeWindow.document.createElement('div');
nbuo_settings_title.setAttribute('class','awlhdr');
nbuo_settings_title.innerHTML='<span class="lft" style="font-weight:bold">Настройки Nice BuO</span><div class="cflt"></div>';

var nbuo_settings_panel=unsafeWindow.document.createElement('div');
nbuo_settings_panel.setAttribute('id','nice_buo_settings');
nbuo_settings_panel.setAttribute('class','atvt comp');

var labelFieldReplace = addCheckbox(nbuo_settings_panel, ' Скрывать "Популярные темы"');
labelFieldReplace.addEventListener('click', function () { toggleSetting('hide_pt'); doHidePT(); }, true);
displaySetting(labelFieldReplace, 'hide_pt', false);

var labelFieldReplace = addCheckbox(nbuo_settings_panel, ' Скрывать "Рекомендованные вам" вопросы');
labelFieldReplace.addEventListener('click', function () { toggleSetting('hide_rq'); doHideRQ(); }, true);
displaySetting(labelFieldReplace, 'hide_rq', false);

var labelFieldReplace = addCheckbox(nbuo_settings_panel, ' Показывать постраничную навигацию на главной');
labelFieldReplace.addEventListener('click', function () { toggleSetting('show_pg'); doShowPG(); }, true);
displaySetting(labelFieldReplace, 'show_pg', false);

var labelFieldReplace = addCheckbox(nbuo_settings_panel, ' Затемнять фон страницы (если болят глаза от белого фона)');
labelFieldReplace.addEventListener('click', function () { toggleSetting('gray_bg'); doGrayBG(); }, true);
displaySetting(labelFieldReplace, 'gray_bg', false);

var labelFieldReplace = addCheckbox(nbuo_settings_panel, ' Делать кнопку "Задать вопрос" не столь яркой');
labelFieldReplace.addEventListener('click', function () { toggleSetting('opac_aq'); doOpacAQ(); }, true);
displaySetting(labelFieldReplace, 'opac_aq', false);

nbuo_settings_inner.appendChild(nbuo_settings_title);
nbuo_settings_inner.appendChild(nbuo_settings_panel);
unsafeWindow.document.querySelector('.rpnl').insertBefore(nbuo_settings_inner, unsafeWindow.document.querySelector('.rpnl').firstChild);
}
function addCheckbox(settingsBody, text) {
  if (!settingsBody) return null;
  var option = document.createElement('input');
  option.setAttribute('type', 'checkbox');
  settingsBody.appendChild(option);
  settingsBody.appendChild(document.createTextNode(text));
  settingsBody.appendChild(document.createElement('br'));
  return option;
}
function addButton(settingsBody, text) {
  if (!settingsBody) return null;
  var button = document.createElement('input');
  button.setAttribute('type', 'button');
  button.setAttribute('value',text);
  settingsBody.appendChild(button);
  return button;
}
function toggleSetting(name) {
  var result = readSetting(name);
  result = !result;
  createCookie(name, result ? 'true' : 'false');
  return result;
}
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else expires = "";
  document.cookie = name + "=" + escape(value) + expires + "; path=/";
}
function readSetting(name) {
  return readCookie(name) == 'true';
}
function displaySetting(option, name, defaultChecked) {
  var result = readSetting(name);
  result = (result && !defaultChecked) || (!result && defaultChecked);
  if (option) option.checked = result;
  return result;
}
function readCookie(name) {
  var nameEq = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEq) == 0) return unescape(c.substring(nameEq.length, c.length));
  }
  return null;
}
function addStyle(s) {
  var head = document.getElementsByTagName('head')[0];
  if (!head) {
    return;
  }
  var style = document.createElement('style');
  style.type = 'text/css';
  var stylecontent = document.createTextNode(s);
  style.appendChild(stylecontent);
  head.appendChild(style);
}

function doGrayBG(){
if (readSetting('gray_bg')){
unsafeWindow.document.body.style.background="whiteSmoke";
}else{
unsafeWindow.document.body.style.background="white";
}
}

function doHidePT(){
var title="\nПопулярные темы\n";
if (readSetting('hide_pt')){
unsafeWindow.document.querySelector('#hotTopicsContainer').style.display="none";
unsafeWindow.document.evaluate('//*[text()="' + title + '"]', document, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.display="none";
}else{
unsafeWindow.document.querySelector('#hotTopicsContainer').style.display="block";
unsafeWindow.document.evaluate('//*[text()="' + title + '"]', document, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.display="block";
}
}

function doOpacAQ(){
if (readSetting('opac_aq')){
unsafeWindow.document.querySelector('.kdba').style.opacity="0.5";
}else{
unsafeWindow.document.querySelector('.kdba').style.opacity="1";
}
}

function doHideRQ(){
var title="Рекомендованные вам";
if (readSetting('hide_rq')){
unsafeWindow.document.evaluate('//*[text()="'+title+'"]/../../..', document, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.display="none";
}else{
unsafeWindow.document.evaluate('//*[text()="'+title+'"]/../../..', document, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.display="block";
}
}

function doShowPG(){
if(location.href=="http://otvety.google.ru/otvety/" || location.href=="http://www.otvety.google.ru/otvety/"){
if (readSetting('show_pg')){
document.querySelector('.cpnl .tcenter:last-child').innerHTML='<span class="pppn bld">1</span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=30">2</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=60">3</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=90">4</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=120">5</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=150">6</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=180">7</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=210">8</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=240">9</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=270">10</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=300">11</a></span><span class="pppn"><a href="/otvety/topics?tab=wtmtol&amp;start=30">Далее</a></span>';
}else{
document.querySelector('.cpnl .tcenter:last-child').innerHTML='Хотите большего? Просмотрите все <a href="/otvety/topics?tab=wtmtol">вопросы</a> или изучите <a href="/otvety/labels?tab=wtmtosr">популярные категории</a>.';
}
}
}

function processAllPages(){
try{
show_settings();
} catch(e){};
try{
doGrayBG();
} catch(e){};
try{
doHidePT();
} catch(e){};
try{
doOpacAQ();
} catch(e){};
try{
doHideRQ();
} catch(e){};
try{
doShowPG();
} catch(e){};
}

processAllPages();
}
)();