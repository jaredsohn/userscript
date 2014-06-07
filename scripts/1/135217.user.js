// ==UserScript==
// @name                irctc bookticket
// @description 		you can change booking type
// @namespace   IRCTC
// @include             http://*irctc.co.in/*
// @include             https://*irctc.co.in/*
// @version     2.0
// @author              R T P
// ==/UserScript==



var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

if (document.location.href.match('bookticket.do')) 
{
alert("Start");
var obj3=$("input[name='passengers[0].idCardNo']");
alert(obj3);
alert(obj3.val());
obj3.val("1234");
alert(obj3.val());

var obj1=document.getElementsByName('quota');
alert(obj1[0]);
alert(obj1[0].value);
obj1[0].value = "CK";
alert(obj1[0].value);

var obj2=document.getElementsByName('passengers[0].idCardType');
obj2[0].options[0].value = "VOTE";
alert(obj2[0].value);

}