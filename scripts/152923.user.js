// ==UserScript==
// @name           Turbo VIOIS
// @author          bodqhrohro
// @description  Мелкие улучшения в пользовательском интерфейсе сайта viois.ru
// @version        0.4.0 alpha
// @include        http://*viois.ru/*
// ==/UserScript==

(function(){
var unsafeWindow= this.unsafeWindow;
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
var fld1;
function show_settings(){
var nmp2=unsafeWindow.document.createElement('div');
nmp2.style.display='block';
nmp2.setAttribute('id','nmp2');
var nmp3=unsafeWindow.document.createElement('div');
nmp3.setAttribute('class','wcvdgCSS-bg');
nmp3.style.opacity=0.7;
nmp3.style.width='100%';
nmp3.style.height='150%';
var nmp4=unsafeWindow.document.createElement('div');
nmp4.setAttribute('class','wcvdgCSS');
nmp4.setAttribute('tabindex','0');
nmp4.style.left='396px';
nmp4.style.top='20%';
nmp4.setAttribute('role','dialog');
nmp4.setAttribute('arialabelledby',':0');
var nmp5=unsafeWindow.document.createElement('div');
nmp5.setAttribute('class','wcvdgCSS-title');
nmp5.setAttribute('id',':0');
var nmp6=unsafeWindow.document.createElement('span');
nmp6.setAttribute('class','wcvdgCSS-title-text');
nmp6.innerText='Настройки Turbo VIOIS';
var nmp7=unsafeWindow.document.createElement('span');
nmp7.setAttribute('class','wcvdgCSS-title-close');
nmp7.onclick=function(){unsafeWindow.document.body.removeChild(unsafeWindow.document.getElementById('nmp2'));};
var nmp8=unsafeWindow.document.createElement('img');
nmp8.setAttribute('src','/styles/images/archive_event.gif');
nmp8.style.display='inline';
nmp8.style.width='16px';
nmp8.style.height='16px';
nmp8.setAttribute('title','Закрыть');
var settingsBody = unsafeWindow.document.createElement('div');
settingsBody.setAttribute('class','wcvdgCSS-content');
var labelFieldReplace = addCheckbox(settingsBody, 'Увеличивать аватарки при наведении курсора');
labelFieldReplace.addEventListener('click', function () { toggleSetting('tv_thread_avatar'); }, true);
displaySetting(labelFieldReplace, 'tv_thread_avatar', false);
var labelFieldReplace = addCheckbox(settingsBody, 'Не загружать миничат');
labelFieldReplace.addEventListener('click', function () { toggleSetting('tv_disable_chat'); }, true);
displaySetting(labelFieldReplace, 'tv_disable_chat', false);
var labelFieldReplace = addCheckbox(settingsBody, 'Редактор BB-кодов');
labelFieldReplace.addEventListener('click', function () { toggleSetting('tv_bb_editor'); }, true);
displaySetting(labelFieldReplace, 'tv_bb_editor', false);
var labelFieldReplace = addCheckbox(settingsBody, 'Не отображать стили VIP-статуса');
labelFieldReplace.addEventListener('click', function () { toggleSetting('tv_hide_vip_style'); }, true);
displaySetting(labelFieldReplace, 'tv_hide_vip_style', false);
//var labelFieldReplace = addCheckbox(settingsBody, 'Открывать миничат в новом окне');
//labelFieldReplace.addEventListener('click', function () { toggleSetting('tv_chat_newwindow'); }, true);
//displaySetting(labelFieldReplace, 'tv_chat_newwindow', false);
var labelFieldReplace = addButton(settingsBody, 'Восстановить все скрытые блоки');
labelFieldReplace.addEventListener('click', function () { cleanupHideCookies(); }, true);
nmp7.appendChild(nmp8);
nmp5.appendChild(nmp6);
nmp5.appendChild(nmp7);
nmp4.appendChild(nmp5);
nmp4.appendChild(settingsBody);
nmp2.appendChild(nmp3);
nmp2.appendChild(nmp4);
unsafeWindow.document.body.appendChild(nmp2);
}
//function open_chat_window(){
// chtwnd=window.open('','minichat','width=612,height=420,location=no,menubar=no,resizable=yes,left=200,top=200,scrollbars=no,status=no,toolbar=no');
// var cwtext1='<div id=\'chatbar\'><img id=\'csuid1_rating_loading\' src=\'/styles/images/loading_balls.gif\' style=\'width: 16px; height: 16px; display:inline;\'>&nbsp;Загрузка чата...</div>';
// cwtext1+='<script src=\'js/release.php?v=1254\'></script><script src=\'js/jquery.js?v=1254\'></script><script src=\'js/holderplace.js?v=1254\'></script>';
// cwtext1+='<script>document.body.onload=function (){alert(\'a\');AjaxLoadChat();};</script>';
// chtwnd.document.write(cwtext1);
//}
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
  createCookie(name, result ? 'true' : 'false', 365);
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
function insertAtCursor(field, str) {
  if (!field || !str) return;
  var startPos = 0;
  if (field.selectionStart || field.selectionStart == '0') {
    startPos = field.selectionStart;
    var endPos = field.selectionEnd;
    field.value = field.value.substring(0, startPos) + str + field.value.substring(endPos, field.value.length);
  } else field.value += str;
  var newPos = startPos + str.length;
  field.setSelectionRange(newPos, endPos);
  field.focus();
}
function insertAtCursor2(field, str1, str2) {
  if (!field || !str1 || !str2) return;
  var startPos = 0;
  if (field.selectionStart || field.selectionStart == '0') {
    startPos = field.selectionStart;
    var endPos = field.selectionEnd;
    field.value = field.value.substring(0, startPos) + str1 + field.value.substring(startPos, endPos) + str2 + field.value.substring(endPos, field.value.length);
  } else field.value += str1+str2;
  startPos+=str1.length;
  endPos+=str1.length;
  field.setSelectionRange(startPos, endPos);
  field.focus();
}
function cleanupHideCookies(){
 createCookie('hide_rating_1','',-100500);
 createCookie('hide_rating_2','',-100500);
 createCookie('hide_rating_3','',-100500);
 createCookie('hide_last_blogs','',-100500);
 createCookie('hide_last_topics','',-100500);
 createCookie('hide_activity_wall','',-100500);
 createCookie('hide_popular_groups','',-100500);
 createCookie('hide_popular_topics','',-100500);
}
function drawBBeditor(pnl,m1){
 addStyle('a:hover .bbtn { background-color:#ebeff9; }');
 addStyle('img.bbtn { display:inline; }');
 var bbpanel=pnl;
 if (m1==1) {
  bbpanel=bbpanel.getElementsByTagName('tbody')[0];
  bbpanel=bbpanel.getElementsByTagName('tr')[0];
  bbpanel=bbpanel.getElementsByTagName('td')[0];
 } else {
  bbpanel=bbpanel.parentNode;
 }
 fld1=bbpanel.getElementsByTagName('textarea')[0];
 if (m1<2) {
  bbpanel=bbpanel.getElementsByTagName('div')[0];
  bbpanel.onmousedown='';
  bbpanel.innerHTML='';
 } else {
  tmpnl=document.createElement('div');
  bbpanel.appendChild(tmpnl);
  bbpanel=tmpnl;
 }
 var bbtn=document.createElement('a');
 bbtn.setAttribute('class','bbtn');
 bbtn.innerHTML='<img id=\'bbtn\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAX0lEQVQ4y2P8//8/AzUBEwOVwaiBg9BAhv///2PFDAwMZxgYGP7jwGcYGBjSsOknxsByNDe4IBmshK6PEi/fY2BgeE8tL8NdTg0vCyLJdVDDy++xepVWXmYcLW1GgIEAm1vA6E+CY9UAAAAASUVORK5CYII=\' title=\'Жирный\' class=\'bbtn\'>';
 var ibtn=document.createElement('a');
 ibtn.setAttribute('class','bbtn');
 ibtn.innerHTML='<img id=\'ibtn\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAj0lEQVQ4y+3UsQkCYQzF8d8nVm4g6AIu4CQOYO8SbuAo198CgpWVCwiWFoKVGJvPTswVVwjeg3Qv/+QRSIkIfWqkZw3AHwSOu5hKKec6fIIn7hEx+2iOiLTq4A0C2299GeitOY64YtEHcF2j7rJkXYBT7HHBMgN2ufKqghqcUneyYYsbHjigzQ5Yhm/zB8AXmE7ocsOKwO0AAAAASUVORK5CYII=\' title=\'Курсив\' class=\'bbtn\'>';
 var ubtn=document.createElement('a');
 ubtn.setAttribute('class','bbtn');
 ubtn.innerHTML='<img id=\'ubtn\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAdklEQVQ4y2P8//8/AzUBEwOVwaiBVAD////HwAwMDMYMDAz/odgYTUsokpwgut6hG4bvB8LA91jV4YgUBgYGhjPQgN+NpmUVVPwMNv34DBRkYGDoQIpRGH4HFRfEZiDjoC8cWHBJMDIy/iciUzDS3IWMI6+ABQDdNHFjxNx/6wAAAABJRU5ErkJggg==\' title=\'Подчёркивание\' class=\'bbtn\'>';
 var lbtn=document.createElement('a');
 lbtn.setAttribute('class','bbtn');
 lbtn.innerHTML='<img id=\'lbtn\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAgUlEQVQ4y+2U2wmAMAxFT8RF3KBuoBu4WVdyAx3BDTpC/KkQgviAfPZCaSiXQ5ILFVUlUh3BasAAmZQzoO4UYDH2pb55X/bAO5iFXioPvgwgqoqIXG2OwF7r6WW4td4J2GotHih2Gy/AO+/QO1MyHc4fY0imPsJ3GJ6ytM+hAf/rBAhGVoaeusxUAAAAAElFTkSuQmCC\' title=\'Вставить ссылку...\' class=\'bbtn\'>';
 var qbtn=document.createElement('a');
 qbtn.setAttribute('class','bbtn');
 qbtn.innerHTML='<img id=\'qbtn\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAdUlEQVQ4y+2U0QmAMAxE37lBV3AFXcERXMEVOouzuIIr6AqOEH+KlFoKQn+EHhyBg3sQApGZUVMdldWAfwJKWiVZ8CIpzfw/V8bMsg4aAAPmqPJk2V4B2AM7cEQwB2whc7leaWUPnMCYZBcwhfk+ZnsODfhdN0SuWLeWjG7PAAAAAElFTkSuQmCC\' title=\'Цитата\' class=\'bbtn\'>';
 var imgbtn=document.createElement('a');
 imgbtn.setAttribute('class','bbtn');
 imgbtn.innerHTML='<img id=\'imgbtn\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAo0lEQVQ4y+2UsQ2DMBRE7xDTsAAzIFZKmT1AYgZkKUyQBbxDpjgaI5nIlm3iIgXXfLn4707/26Yk1FSDyvp/YOsfSD4AdIUMK+kZS5iCWQCTq8GetjDNW9JGMmpeCuwdrM+aYYa61FhSWzY1r80saQlAzSWgpJerPtRETJIznL/gC8mPb+KWM+QkXI/GUGLfBMCak3AkOdZ6y/YC49TD+z/8WTtJU0JMFaR51AAAAABJRU5ErkJggg==\' title=\'Вставить изображение...\' class=\'bbtn\'>';
 var ytbtn=document.createElement('a');
 ytbtn.setAttribute('class','bbtn');
 ytbtn.innerHTML='<img id=\'ytbtn\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAEPklEQVQ4y6WU3WsUVxjGnzNnPjaT3ZlszGbJWq2EdtMkbl0qloWCe5PYxkDAO0FKoJRKbmrvQq/qH1By68e19ANEMBKiMR/qijBlURBaU2uRxLhNStidr3VmZ+bM6UW6JbW5EPrAe3He9+XHgfM8B5xztOvBgwdfVqvVLzjnuHfv3terq6sTu+dvUv86zMzMzA8MDPB6vf6Vqqr80aNHn/0vIOe879SpU7xUKvGzZ8/+HIbh+OnTp59OTU09DYJg6NKlS9/duXNn5vLly7dv3rz5zV5Aev78eeyS6zjO0IULF4avXr367cWLF89sbm7mt7a20s1ms2gYRgFA1/z8/HHOuV0ul3/AaxJebxQKheVsNotDhw4tP3v2TJucnPzx5MmTsxsbG3379+93MpnM2oEDB/5Ip9MN7KH/AFutFuWcA4DjOI7y/Pnzd2q12tuU0sjzPGaaZrZWq3VFUYQ3Avb29v6ez+frnPNfp6enp69du/bhkydP3j137tznAwMDlYWFhffDMHQLhcJPewHJ37eBaZqf2radC8Ow37btD1RVrSYSCadarZ5RVdXL5/NX6vV62TTNvmw2u62q6m+yLP/S1dW1oWna97uB0sOHDxdnZ2ePt5uiKEJRFHDO0dnZCc/z4LouNE2DLMuI4xhxHCMMQwDA6Ojo7WKxOAaAia7rfry0tHR8ZGQEyWQSAEAp5Xfv3iWEEERRhFwuh/7+fjx+/BhBEECWZXDOoSgKbNtGpVIZHRwcLCuKsixYlvUeYwwdHR28WCyiWCwiiiLYto0wDNFoNNDT04NSqQTXdWGaJgghcBwHlmWBUgrOOSzLGgQAMQiCbkopbty4QTKZDKIowvXr18mJEydQq9UwPDyMMAzhui4mJiawvr4OwzBQLpeRy+Vw//59rK2twff9DAAIQRDocRxDlmWIogjOOfr6+nDs2DH09vaiVCpBkiR4nodUKoWjR4/i8OHDGBoaQhzHGBsbQxRF8H0/BQACY0zlnIMQsvNKhCCOY1iWhVarBdM0IUkSms0mKpUKGo0GstksgiCA7/vYt28fZFlGGIYUAARK6as27HUxxtC2FaUUHR0dAADf95FOp+H7Pm7dugVCCCRJYgAgyLJsEUJ2gk0pBEGAIOz4XZIkJBIJxHEMURRBCAGlFOl0Gi9fvoRhGDh48CAopRBF0QUAIZFI1CmliOO4PYDjONB1HaVSCYIgoNVqIZVKoVwuQ1EUGIYBTdMwNTUFTdPgeR5UVf0TAERd11cppaCUYnFxEZxziKKIubk5CILwj33m5uag6zosy8L29jYWFhaQyWRgGAaSySS6u7tX20mRq9Xq8srKykfNZhOEECSTSTiOg93J2f0ZaJoG13XRdsf4+PjikSNHPgHAdmd50rbttxhjKmNMYYx1MsYk3l7YcQChlLYopa9EUWwJgtDUdf2FrutX2jt/AS41dUaC5TOOAAAAAElFTkSuQmCC\' title=\'Вставить видео с YouTube...\' class=\'bbtn\'>';
 bbpanel.appendChild(bbtn);
 bbpanel.appendChild(ibtn);
 bbpanel.appendChild(ubtn);
 bbpanel.appendChild(lbtn);
 bbpanel.appendChild(qbtn);
 bbpanel.appendChild(imgbtn);
 bbpanel.appendChild(ytbtn);
 bbtn=unsafeWindow.document.getElementById('bbtn');
 bbtn.onclick=function() {insertAtCursor2(fld1,'[b]','[/b]');};
 ibtn=unsafeWindow.document.getElementById('ibtn');
 ibtn.onclick=function() {insertAtCursor2(fld1,'[i]','[/i]');};
 ubtn=unsafeWindow.document.getElementById('ubtn');
 ubtn.onclick=function() {insertAtCursor2(fld1,'[u]','[/u]');};
 lbtn=unsafeWindow.document.getElementById('lbtn');
 lbtn.onclick=function() {if (lurl=prompt("Введите URL:","")) {if (!/:\/\//.test(lurl)) {lurl='http://'+lurl;}; insertAtCursor2(fld1,'[url='+lurl+']','[/url]');}};
 qbtn=unsafeWindow.document.getElementById('qbtn');
 qbtn.onclick=function() {insertAtCursor2(fld1,'[quote]','[/quote]');};
 imgbtn=unsafeWindow.document.getElementById('imgbtn');
 imgbtn.onclick=function() {if (iurl=prompt("Вставьте URL изображения:","")) {insertAtCursor(fld1,'[img]'+iurl+'[/img]');}};
 ytbtn=unsafeWindow.document.getElementById('ytbtn');
 ytbtn.onclick=function() {if (yturl=prompt("Вставьте URL видео:","")) {insertAtCursor(fld1,'[youtube]'+yturl+'[/youtube]');}};
}
function processVIP1(){
 if (readSetting('tv_hide_vip_style')){
  try {
   var nicks1=document.getElementsByClassName('wpcpaCSS');
   for (i=0;i<nicks1.length;i++) {
    nicks1[i].getElementsByTagName('a')[0].setAttribute('style','font-size: 12px; vertical-align: top !important;');
   }
  } catch(e) {
   console.log(e);
  }
 }
}
function processAskPage(){
 if (readSetting('tv_bb_editor')){
  drawBBeditor(document.getElementById('wavdi'),0);
 }
}
function processThreadPage(){
 if (readSetting('tv_thread_avatar')){
  addStyle('a:hover .wciuasCSS { width:auto; height:auto; position:absolute; z-index:150; }');
 }
 if (readSetting('tv_bb_editor')){
  try {unsafeWindow.document.getElementById('wpiprdi').onmouseover=function () {drawBBeditor(this,0);}} catch(e) {};
  try {unsafeWindow.document.getElementById('wpiprdi').onmouseover=function () {drawBBeditor(this,0);}} catch(e) {};
 }
 processVIP1();
}
function processBlogPage(){
 processVIP1();
 if (readSetting('tv_thread_avatar')){
  addStyle('a:hover .wciuasCSS { width:auto; height:auto; position:absolute; z-index:150; }');
 }
 if (readSetting('tv_bb_editor')){
  unsafeWindow.document.getElementById('wpiprdi').onmouseover=function () {drawBBeditor(this,0);}
  var cmnts=document.getElementsByName('pfid');
  for (i=0;i<=cmnts.length;i++){
   unsafeWindow.document.getElementById('cbcfid_'+cmnts[i].value).onmouseover=function () {drawBBeditor(this,0);}
  }
 }
}
function processNewBlogPage(){
 if (readSetting('tv_bb_editor')){
  unsafeWindow.document.getElementById('wavdi').onmouseover=function () {drawBBeditor(this,0);}
 }
}
function processSupportPage(){
 if (readSetting('tv_bb_editor')){
  drawBBeditor(document.getElementById('wavdi'),2);
 }
}
function processTicketPage(){
 if (readSetting('tv_bb_editor')){
  drawBBeditor(document.getElementById('wpiprdi'),2);
 }
}
function processUserPage(){
 if (readSetting('tv_bb_editor')){
  try {drawBBeditor(document.getElementById('wcvdi'),0);} catch(e) {console.log(e);};
  try {drawBBeditor(document.getElementById('wpiprdi'),0);} catch(e) {console.log(e);};
 }
 if (readSetting('tv_hide_vip_style')){
  try {
   var nicks1=document.getElementsByClassName('wvantCSS')[1];
   nicks1.getElementsByTagName('span')[1].setAttribute('style','');
   nicks1=document.getElementsByClassName('wuvunmCSS')[0];
   nicks1.getElementsByTagName('span')[0].setAttribute('style','');
   var nicks2=nicks1.getElementsByTagName('font')[0];
   if (nicks2) {nicks2.parentNode.removeChild(nicks2);}
   nicks1=document.getElementsByClassName('wpmopCSS')[0];
   nicks1.getElementsByTagName('a')[0].setAttribute('style','');
  } catch(e) {
   console.log(e);
  }
 }
 processVIP1();
}
function processUpdatePage(){
 if (readSetting('tv_bb_editor')){
  drawBBeditor(document.getElementById('wavdi'),0);
 }
}
function processPage(){
 var vfh=document.getElementById('vfh');
 vfh=vfh.getElementsByTagName('*')[0];
 vfh=vfh.getElementsByTagName('*')[0];
 vfh=vfh.getElementsByTagName('*')[0];
 var tvbutton=document.createElement('td');
 tvbutton.innerHTML='<img id=\'tvbutton\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAT7SURBVHjaZNRJbFsFHsfx73vPz37x0vglTtImKUmaZUjTluCZpAlqKaUoUttDi4TEckAjcUQccuYyp9FohMRhxGXggDghIdCA1CGXClUDRSXqQrok7hZqY8f2c7y9xX47J8IM87v/P/pd/j9hdXWVXxONRpFlGVEUSSaTw/tS+87IoryALww4YQhiqIWhu24Y+mXDMEpBEOC6Lo7j7BkRfhff98n0Z86nYqm3d7XdU1pLi3dEi5QSIAQpYrFBK9OvXpFl+YNqtXrp9/d7YBiGAMnxg+P/KBVKf15rrGGMGnSO2mijRf4ijTPTHCTf2IjfftB3VhAPnx0ZHfu4kN9+JwxDQxAEAKTl5WXCMEQQhNT4wbGvbt658fKX41+xeXGTqcgUL9w7RUPRaTxWiV8d4uRxk1NZnZZZZKsQzA8PTSy3240vwhBHEASkbDaL4zhMjD/14Wbu3sVvF6/wbPoo87f/SEtskdnOMGNPk+70ojXaiG6czjWdo+ou/fJPXH4cmZgYnRypViv/CoIAaW5uDlXdd7bblf7+6ecz+NpFBu6OMSJpzARzpNQUuCGyIJHM9KLpHo/yj5nJ3efIRA9PbjcpKEPPxGPyD61W62FEEIT9fX3x1Uv/Dgi6zzJj3qFvuog6MIjeNmn5LWqaBoFDTBbpmiUudO6zXpDY+qzF68U277V/IHbmxVVxd/emGI/3rNh253mtup9Dkz8zO/8dsdg2QSjSaDYolkqYlkWpXObWnXu8GtygN+/xN3+Gh5pAIhHwh1KRlmE835NIrEQURTreajmxVmuYen2E/v4plpZ0tre3MQwDXdcp7ewgdjq8e6jCbL7NG9YRnn7uMA+2PEJbI9vU+VHTYmI6fTwCQcayFCxL5qWXPiIWa6BpQ7iuS7Vaxfd9zl94mbmIwZlr/+SVXJoHvTq5tTWmRY9yTw3f7aVtWKTT6Yzouh6RSJcwlLh79zkcZxDHMcnn8xQKBbLZLGPD+zH3z/DXzCt8HwQMJRP8aXGRTLSH8eQwYkTB9lw81yWi691aMpnk8OHPMM0xgsAjCEI0TcNxHJ48yXPs2DMIgsCGVgXPp1bbxQ9DLN3kVUNixzKYUmK4plmL7OxUrs3O9r2VSt2KqWqOSsXhxo0KEOK5IVev/odypYBrw4OHOSBgt1anWq0AUACQJI6rqv3T9vY1SVGUiqqqWYhMlst1arVdbNum2/FYeavB9IKJLZU4tLhDUnU4/ZpPx/LRCr/979EjRxgYGPhmc3PzPdGyrPLGxsb7o6OjNJtNms0m3a5Np9Ph6UWHQ8cCDozBiQsw+BTMLYeMTP7XGEQiLC4usrGx8b5pmmXR933K5fLXuVzuk/n5eQzDwDQMut0Oph5gtiGRhmoRHBuiCrj2b+C5c+coFouflEqlr33fRzhw4AAAruumFhYWvoxGo6fX1tawbZuD0xGmZjMggNORsMwuTtDg/q0AMYixsrKC53nfrK+vX5BlWQeQUqkUAKIoOo8ePfq8p6dneGlpaT4ajVL52WVq5AQJaZKRgWPgqGzdbDE5McXJkycoFosfX79+/U1FUfbma68hgOM4mKZJIpE4Pzs7+3ZfX98pz/PirusCIMsysixbtVrtytbW1gemaV5KJBJEo9E94/9A13WxLIswDIf7+/vPqKq6oCjKQBiG2Lat1ev19Xq9flkQhFI8HkeW5f8BfxkA+0CAVvtMYt8AAAAASUVORK5CYII=\' title=\'Настройки Turbo VIOIS\'>';
 vfh.appendChild(tvbutton);
 tvbutton=unsafeWindow.document.getElementById('tvbutton');
 tvbutton.onclick=function () {show_settings();};
 if (readSetting('tv_disable_chat')){
  unsafeWindow.document.body.removeChild(unsafeWindow.document.getElementById('chatbar'));
 }
 if (readSetting('tv_hide_vip_style')){
  var head=document.getElementsByTagName('head')[0];
  head.removeChild(head.getElementsByTagName('style')[0]);
  try {
   var nicks1=document.getElementById('csuid1');
   nicks1=nicks1.getElementsByTagName('tr');
   for (i=1;i<nicks1.length;i++) {
    nicks1[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0].setAttribute('style','font-size: 12px;');
   }
  } catch(e) {
   console.log(e);
  }
 }
 if (readSetting('tv_chat_newwindow')){
  var chnwbutton=document.createElement('td');
  vfh.appendChild(chnwbutton);
  chnwbutton.innerHTML='<img id=\'chnwbutton\' src=\'data:image/gif;base64,R0lGODlhFAAUAIAAAOvv+f8AACH5BAEAAAEALAAAAAAUABQAAAImjI+py+0PG5i0Aoljusd6xBmhMpaZCJ6ByVxV2qqb5L3ajef6vhQAOw==\' title=\'Открыть миничат в новом окне\'>';
  chnwbutton=unsafeWindow.document.getElementById('chnwbutton');
  chnwbutton.onclick=function() {open_chat_window();};
 }
 if ( /viois\.ru\/ask/ .test(window.location.href)) {
    processAskPage();
  }
 if ( /viois\.ru\/thread/ .test(window.location.href)) {
    processThreadPage();
  }
 if ( /viois\.ru\/blog/ .test(window.location.href)) {
    processBlogPage();
  }
 if ( /viois\.ru\/newblog/ .test(window.location.href)) {
    processNewBlogPage();
 }
 if ( /viois\.ru\/support/ .test(window.location.href)) {
    processSupportPage();
 }
 if ( /viois\.ru\/ticket/ .test(window.location.href)) {
    processTicketPage();
 }
 if ( /viois\.ru\/user/ .test(window.location.href)) {
    processUserPage();
 }
 if ( /viois\.ru\/update/ .test(window.location.href)) {
    processUpdatePage();
 }
}
processPage();
}
)();