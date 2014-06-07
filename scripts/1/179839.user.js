// ==UserScript==
// @name       Chrome Stumblebar Current Page Interest
// @namespace  http://aeonax.blogspot.in/
// @version    0.1
// @description  Shows Interest of Current Page on StumbleUpon Web Bar
// @match      http://www.stumbleupon.com/*
// @copyright  2013+, AEonAX
// ==/UserScript==

function getinterest() { 
   var metas = document.getElementsByTagName('meta'); 

   for (i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute("property") == "stumbleupon:interest") { 
         return metas[i].getAttribute("content"); 
      } 
   } 

    return "";
} 

var elmNewContent = document.createElement('li');
elmNewContent.id = 'tb-interest';
//elmNewContent.style = 'float: left;text-align:center;line-height: 38px;';
var interest = getinterest();
var pubid=interest.substring(36);
var n = pubid.indexOf('?');
pubid = pubid.substring(0, n != -1 ? n : pubid.length);
elmNewContent.appendChild(document.createTextNode(pubid));
var elmFoo = document.getElementById('tb-interests');
elmFoo.parentNode.insertBefore(elmNewContent, elmFoo.nextSibling);

elmNewContent.setAttribute("style", "float:left;text-align:center;line-height: 40px;");