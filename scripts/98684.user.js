// ==UserScript==
// @name           Facebook Add Friend Helper (PRO)
// @description    Auto clicks and types a few things when you add a friend to be your neighbor in Facebook
// @include        http://*.facebook.com/*
// @copyright      Tony White
// @version        1.0.2 (PRO)
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var MSG = GM_getValue("msg", "Cafe world neighbor?");

if(!top || top.location!=location) return;

// Click by Tony White
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e && typeof e=='string') e=window.document.getElementById(e);
if(!e) {return;}
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}
// XPath by Tony White
function xp(exp, t, n) {
var x = document.evaluate(exp||"//body",n||document,null,t||6,null);
if(t && t>-1 && t<10) switch(t) {
case 1: x=x.numberValue; break;
case 2: x=x.stringValue; break;
case 3: x=x.booleanValue; break;
case 8: case 9: x=x.singleNodeValue; break;
} return x;
}

if(xp("//a[.='Report/Block this Person']",9)) {
var m=false, c=false, a=false, intv=setInterval(function() {
var msg=document.evaluate("//textarea[starts-with(@id,'message_')]",document,null,9,null).singleNodeValue,
	cap=document.getElementById("captcha_response"),
	apm=document.evaluate("//a[contains(.,'Add a personal message')]",document,null,9,null).singleNodeValue;
if(!m && msg && msg.offsetHeight>0) {
m=true;
var tMsg=prompt("Message will be:", MSG);
if(!tMsg) return;
GM_setValue("msg", tMsg);
msg.value=tMsg;
document.evaluate("//input[@type='button' and @name='connect' and @value='Send Request']",document,null,9,null).singleNodeValue.click();
} else if(!c && cap) {
c=true;
cap.addEventListener("keydown", function(e) {
if(e.keyCode==13) document.evaluate("//input[@type='button' and @name='submit' and @value='Submit']",document,null,9,null).singleNodeValue.click();
}, false);
} else if(!a && apm) {
a=true;
click(apm);
} else if(m && c && a) clearInterval(intv);
}, 100);
}