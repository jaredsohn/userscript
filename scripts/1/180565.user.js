// ==UserScript==
// @name        PowerMiner
// @namespace   PowerMiner
// @description Скрипт от Haoose
// @include     http://gameminer.ru/
// @include     http://gameminer.ru/?*
// @include     http://gameminer.ru/#*
// @version     1
// @grant       none
// ==/UserScript==

(function() {

  var c = document.body;
  var str = c.innerHTML;
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  var scriptCoockie = document.createElement('script');
  scriptCoockie.setAttribute("type", "application/javascript");
  scriptCoockie.textContent = 'function getCookie(name) {'+
'  var matches = document.cookie.match(new RegExp('+
'    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '+
"'\\$1') + "+
'"=([^;]*)"'+
'  ));'+
'  return matches ? decodeURIComponent(matches[1]) : undefined;'+
'}'+
'function setCookie(name, value, options) {'+
'  options = options || {};'+
'  var expires = options.expires;'+
'  if (typeof expires == "number" && expires) {'+
'    var d = new Date();'+
'    d.setTime(d.getTime() + expires*1000);'+
'    expires = options.expires = d;'+
'  }'+
'  if (expires && expires.toUTCString) { '+
'  	options.expires = expires.toUTCString();'+
'  }'+
'  value = encodeURIComponent(value);'+
'  var updatedCookie = name + "=" + value;'+
'  for(var propName in options) {'+
'    updatedCookie += "; " + propName;'+
'    var propValue = options[propName];'+
'    if (propValue !== true) {'+
'      updatedCookie += "=" + propValue;'+
'     }'+
'  }'+
'  document.cookie = updatedCookie;'+
'}'+
'function deleteCookie(name) {'+
'  setCookie(name, "", { expires: -1 })'+
'}';

  script.textContent = 'function HaoTest() {'+
'if (getCookie("HaoHide")=="hide") {'+
'  HaoHide();'+
'}'+
'else {HaoShow();'+
'}'+
'};'+

'function HaoShow() {'+
'    deleteCookie("HaoHide");'+
'    document.getElementsByClassName("bordered")[0].style.display = "";'+
'var test=document.getElementsByClassName("giveaways");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].style.marginTop = "20px";'+
'};'+
'var test=document.getElementsByClassName("giveaways-block")[0].getElementsByClassName("giveaways")[0].getElementsByClassName("giveaway__container");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].style.width = "50%";'+
'    test[i].getElementsByClassName("giveaway")[0].style.height = "";'+
'    test[i].getElementsByClassName("giveaway")[0].style.padding = "10px 20px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.margin = "10px";'+
'}'+
'var test=document.getElementsByClassName("giveaways-block")[1].getElementsByClassName("giveaways")[0].getElementsByClassName("giveaway__container");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].style.width = "50%";'+
'    test[i].getElementsByClassName("giveaway")[0].style.height = "";'+
'    test[i].getElementsByClassName("giveaway")[0].style.padding = "10px 20px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.margin = "10px";'+
'}'+
'var test=document.getElementsByClassName("giveaways-block")[2].getElementsByClassName("giveaways")[0].getElementsByClassName("giveaway__container");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].style.width = "50%";'+
'    test[i].getElementsByClassName("giveaway")[0].style.height = "";'+
'    test[i].getElementsByClassName("giveaway")[0].style.padding = "10px 20px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.margin = "10px";'+
'}'+
'    document.getElementsByClassName("dashboard__giveaway")[0].getElementsByTagName("span")[0].style.display = "";'+
'    document.getElementsByClassName("dashboard")[0].style.height = "";'+
'    document.getElementById("hao2").style.display = "none";'+
'    document.getElementById("hao").style.display = "";'+
'    document.getElementsByClassName("container")[0].style.maxWidth = "960px";'+
'    document.getElementsByClassName("container")[0].style.minWidth = "960px";'+
'var test=document.getElementsByClassName("giveaway__timeleft-text");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].innerHTML = " Осталось  ";'+
'};'+
'    document.getElementsByClassName("header")[0].style.position = "";'+
'    document.getElementsByClassName("header")[0].style.zIndex = "";'+
'    document.getElementsByClassName("header")[0].style.minWidth = "";'+
'    document.getElementsByClassName("header")[0].style.height = "";'+
'    document.getElementsByClassName("header")[0].getElementsByTagName("img")[0].style.height = "auto";'+
'    document.getElementsByClassName("page")[0].style.marginTop = "";'+
'var test=document.getElementsByClassName("btn-golden");'+
'for (var i = 2; i < test.length; i++) {'+
'    test[i].style.width = "";'+
'    test[i].value = "Участвовать";'+
'};'+
'var test=document.getElementsByClassName("giveaways");'+
'if (test.length>4) {'+
'    document.getElementsByClassName("giveaways")[4].style.display = "";'+
'}'+
'else {'+
'    document.getElementsByClassName("giveaways")[3].style.display = "";'+
'}'+

'};'+
'function HaoHide() {'+
'    setCookie("HaoHide","hide",expires="01/01/2023 00:00:00");'+
'    document.getElementsByClassName("bordered")[0].style.display = "none";'+
'var test=document.getElementsByClassName("giveaways");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].style.marginTop = "2px";'+
'};'+
'var test=document.getElementsByClassName("giveaways-block")[0].getElementsByClassName("giveaways")[0].getElementsByClassName("giveaway__container");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].style.width = "25%";'+
'    test[i].getElementsByClassName("giveaway")[0].style.height = "300px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.padding = "10px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.margin = "2px";'+
'}'+
'var test=document.getElementsByClassName("giveaways-block")[1].getElementsByClassName("giveaways")[0].getElementsByClassName("giveaway__container");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].style.width = "20%";'+
'    test[i].getElementsByClassName("giveaway")[0].style.height = "315px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.padding = "5px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.margin = "2px";'+
'}'+
'var test=document.getElementsByClassName("giveaways-block")[2].getElementsByClassName("giveaways")[0].getElementsByClassName("giveaway__container");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].style.width = "25%";'+
'    test[i].getElementsByClassName("giveaway")[0].style.height = "300px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.padding = "10px";'+
'    test[i].getElementsByClassName("giveaway")[0].style.margin = "2px";'+
'}'+
'    document.getElementsByClassName("dashboard__giveaway")[0].getElementsByTagName("span")[0].style.display = "none";'+
'    document.getElementsByClassName("dashboard")[0].style.height = "70px";'+
'    document.getElementById("hao").style.display = "none";'+
'    document.getElementById("hao2").style.display = "";'+
'    document.getElementsByClassName("container")[0].style.maxWidth = "100%";'+
'    document.getElementsByClassName("container")[0].style.minWidth = "100%";'+
'var test=document.getElementsByClassName("giveaway__timeleft-text");'+
'for (var i = 0; i < test.length; i++) {'+
'    test[i].innerHTML = " Ост: ";'+
'};'+
'var test=document.getElementsByClassName("giveaway__timeleft");'+
'for (var i = 0; i < test.length; i++) {'+
'    var str2=test[i].innerHTML;'+
'    str2 = str2.replace("минуты", "м.", "gi");'+
'    str2 = str2.replace("минута", "м.", "gi");'+
'    str2 = str2.replace("минут", "м.", "gi");'+
'    str2 = str2.replace("часа", "ч.", "gi");'+
'    str2 = str2.replace("часов", "ч.", "gi");'+
'    str2 = str2.replace("час", "ч.", "gi");'+
'    str2 = str2.replace("меньше минуты", "менее мин.", "gi");'+
'    str2 = str2.replace("более месяца", "более мес.", "gi");'+
'    test[i].innerHTML = str2;'+
'};'+
'var test=document.getElementsByClassName("profile__name");'+
'for (var i = 0; i < test.length; i++) {'+
'    var str2=test[i].innerHTML;'+
'    if (str2.length > 6 ) {'+
'    str2 = str2.slice( 0, 6 ) + "…";};'+
'    test[i].innerHTML = str2;'+
'};'+
'    document.getElementsByClassName("header")[0].style.position = "fixed";'+
'    document.getElementsByClassName("header")[0].style.zIndex = "1002";'+
'    document.getElementsByClassName("header")[0].style.minWidth = "97%";'+
'    document.getElementsByClassName("header")[0].style.height = "70px";'+
'    document.getElementsByClassName("header")[0].getElementsByTagName("img")[0].style.height = "70px";'+
'    document.getElementsByClassName("page")[0].style.marginTop = "70px";'+
'var test=document.getElementsByClassName("btn-golden");'+
'for (var i = 2; i < test.length; i++) {'+
'    test[i].style.width = "50px";'+
'    test[i].value = "Участ.";'+
'};'+
'var test=document.getElementsByClassName("giveaways");'+
'if (test.length>4) {'+
'    document.getElementsByClassName("giveaways")[4].style.display = "none";'+
'}'+
'else {'+
'    document.getElementsByClassName("giveaways")[3].style.display = "none";'+
'}'+
   
'};';
  document.body.appendChild(scriptCoockie);
  document.body.appendChild(script);

  var code = '<li id="hao"><a href="javascript:HaoHide();">Скрыть</a></li><li id="hao2"><a href="javascript:HaoShow();">Показать</a></li>';
  str = str.replace('<li><a href="/logout">Выйти</a></li>', code+'<li><a href="/logout">Выйти</a></li>', 'gi');

  str = str.replace('data-type="coal" data-price="0"', 'style="border-color: red;" data-type="coal" data-price="0"', 'gi');
  str = str.replace('data-type="gold" data-price="0"', 'style="border-color: red;" data-type="gold" data-price="0"', 'gi');
  str = str.replace('data-type="coal" data-price="1"', 'style="border-color: orange;" data-type="coal" data-price="1"', 'gi');
  str = str.replace('data-type="gold" data-price="1"', 'style="border-color: orange;" data-type="gold" data-price="1"', 'gi');
  str = str.replace('data-type="coal" data-price="2"', 'style="border-color: yellow;" data-type="coal" data-price="2"', 'gi');
  str = str.replace('data-type="gold" data-price="2"', 'style="border-color: yellow;" data-type="gold" data-price="2"', 'gi');    
  str = str.replace('data-type="coal" data-price="3"', 'style="border-color: green;" data-type="coal" data-price="3"', 'gi');
  str = str.replace('data-type="gold" data-price="3"', 'style="border-color: green;" data-type="gold" data-price="3"', 'gi');

  str = str.replace('form-horizontal giveaway-search-form g-hidden"', 'form-horizontal giveaway-search-form"', 'gi');

  str = str.replace('<div class="top-container clearfix">', '<div style="padding: 10px;" class="clearfix"><a href="/giveaway/finished">все завершенные раздачи</a></div><div class="top-container clearfix">', 'gi');

  str = str.replace('<option selected="" value="finish">', '<option value="finish">', 'gi');
  str = str.replace('<option value="price">', '<option selected="" value="price">', 'gi');
  
  c.innerHTML = str; 

  javascript:HaoTest();

})();
