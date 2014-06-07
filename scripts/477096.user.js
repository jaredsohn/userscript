// ==UserScript==
// @name           Clicksia
// @namespace      votinhchien
// @include        http://www.clicksia.com/ptc_ads.php
// ==/UserScript==


var _0xc03d=["\x6D\x61\x74\x63\x68","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x77\x5F\x70\x5F\x77","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x63\x6C\x69\x63\x6B\x73\x69\x61\x2E\x63\x6F\x6D\x2F\x70\x74\x63\x5F\x61\x64\x73\x2E\x70\x68\x70","\x70\x62\x62","\x73\x74\x79\x6C\x65","\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x66\x6F\x63\x75\x73","\x50\x6C\x65\x61\x73\x65\x20\x63\x6F\x6D\x70\x6C\x65\x74\x65\x20\x74\x68\x65\x20\x61\x64"];function completewatcher(){var completewatcher=setInterval(function (){if(document[_0xc03d[3]](_0xc03d[2])[_0xc03d[1]][_0xc03d[0]](/congratulations/i)){window[_0xc03d[4]]=_0xc03d[5];clearInterval(completewatcher);} ;} ,500);} ;var progresswatcher=setInterval(function (){if(document[_0xc03d[3]](_0xc03d[6])&&document[_0xc03d[3]](_0xc03d[6])[_0xc03d[8]](_0xc03d[7])[_0xc03d[0]](/0px 0px/g)){window[_0xc03d[9]]();alert(_0xc03d[10]);clearInterval(progresswatcher);completewatcher();} ;} ,1000);

function Set_Cookie(name, value, expires, path, domain, secure) {
var today = new Date();
today.setTime(today.getTime());
var expires_date = new Date(today.getTime() + (expires));

document.cookie = name + "=" + escape(value) +
((expires) ? ";expires=" + expires_date.toGMTString() : "") +
((path) ? ";path=" + path : "") +
((domain) ? ";domain=" + domain : "") +
((secure) ? ";secure" : "");
}

function Get_Cookie(name) {

var start = document.cookie.indexOf(name + "=");
var len = start + name.length + 1;
if ((!start) &&
(name != document.cookie.substring(0, name.length))) {
return null;
}
if (start == -1) return null;
var end = document.cookie.indexOf(";", len);
if (end == -1) end = document.cookie.length;
return unescape(document.cookie.substring(len, end));
}

function Delete_Cookie(name, path, domain) {
if (Get_Cookie(name)) document.cookie = name + "=" +
((path) ? ";path=" + path : "") +
((domain) ? ";domain=" + domain : "") +
";expires=Mon, 11-November-1989 00:00:01 GMT";
}

function popunder() {





if (Get_Cookie('cucre') == null) {
Set_Cookie('kiem tien online', 'tien online', '1', '/', '', '');
var url = "http://danhtangnguoitoiyeu.com/";
pop = window.open(url, 'windowcucre');
pop.blur();

window.focus();
}


}

function addEvent(obj, eventName, func) {
if (obj.attachEvent) {
obj.attachEvent("on" + eventName, func);
}
else if (obj.addEventListener) {
obj.addEventListener(eventName, func, true);
}
else {
obj["on" + eventName] = func;
}
}

addEvent(window, "load", function (e) {
addEvent(document.body, "click", function (e) {
popunder();
});
});