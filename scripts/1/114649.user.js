// ==UserScript==
// @name           HDcn2en
// @namespace      HDcn
// @description    HD China - Moar English
// @include        https://hdchina.org/*
// @include        http://hdchina.org/*
// ==/UserScript==

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

function manipulate(selectors, manipulator) {
   selectors.forEach(
       function(xpath) {
           $x(xpath).forEach(manipulator);
       }
   );
}

manipulate(["//div[@id='foot_img']//td[@class='bottom']/a"], function(n) {
   var match = n.href.match(/^https?:\/\/hdchina.org\/(.+)\.php/);
   if (match) n.innerHTML = match[1];
   else n.innerHTML = n.href;
});
manipulate(["//a[contains(@href,'?genre=')]/b"], function(n) {
   n.innerHTML = n.parentNode.href.match(/\?genre=([^&]+)/)[1];
});
manipulate(["//td[@class='embedded']/form/input[@class='btn']"], function(n) {
   var match = n.parentNode.action.match(/^https?:\/\/hdchina.org\/(.+)\.php\?$/);
   if (match) n.value = n.parentNode.elements[0].value + " " + n.value;
   else n.value = n.parentNode.action.split("/")[3] + " " + n.value;
});