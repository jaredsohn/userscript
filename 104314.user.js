// ==UserScript==
// @name       	Emusic slimifier for smaller screens
// @namespace  	http://userscripts.org/users/lorriman
// @description	slims down emusic to better fit smaller screens
// @include    	http://www.emusic.com/*
// @require         http://userscripts.org/scripts/source/95009.user.js
// @require       	http://userscripts.org/scripts/source/95007.user.js
// @version .1
// ==/UserScript==
//xpath helper

ScriptUpdater.check(104314, ".1");

function $x() {
 var x='';
 var node=document;
 var type=0;
 var fix=true;
 var i=0;
 var cur;
  
 function toArray(xp) {
   var final=[], next;
   while (next=xp.iterateNext()) {
 	final.push(next);
   }
   return final;
 }
 
 while (cur=arguments[i++]) {
   switch (typeof cur) {
 	case "string": x+=(x=='') ? cur : " | " + cur; continue;
 	case "number": type=cur; continue;
 	case "object": node=cur; continue;
 	case "boolean": fix=cur; continue;
   }
 }
 
 if (fix) {
   if (type==6) type=4;
   if (type==7) type=5;
 }
 
 // selection mistake helper
 if (!/^\//.test(x)) x="//"+x;
 // context mistake helper
 if (node!=document && !/^\./.test(x)) x="."+x;
 var result=document.evaluate(x, node, null, type, null);
 if (fix) {
   // automatically return special type
   switch (type) {
 	case 1: return result.numberValue;
 	case 2: return result.stringValue;
 	case 3: return result.booleanValue;
 	case 8:
 	case 9: return result.singleNodeValue;
   }
 }
 return fix ? toArray(result) : result;
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

var content=$x("//div/h2[@class='branding left']",XPathResult.FIRST_ORDERED_NODE_TYPE);
content.style.display='none';
var content=$x("//div/h2[@class='branding left']",XPathResult.FIRST_ORDERED_NODE_TYPE);
addGlobalStyle('#dashboard {margin:0 0 0 56px !important;height:30px !important}');
addGlobalStyle('#search {height:30px !important;margin:0 0 0 !important;padding:0 0 0 !important}');
addGlobalStyle('#brandingWrapper { height:30px !important}');
addGlobalStyle('.wrapping {height:30px !important}');
addGlobalStyle('#contentBodyWrapper{padding-top:2px !important}');
addGlobalStyle('#contentBody{padding-top:2px !important}');
addGlobalStyle('.searchTopWrapper{padding-top:2px !important}');
addGlobalStyle('.seventeenDots {margin: 2px 0 17px !important}');
addGlobalStyle('.sectionRule.homeRule {margin: 2px 0 2px !important}');
