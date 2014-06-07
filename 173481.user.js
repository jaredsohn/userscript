// ==UserScript==
// @name Chrome notifications to Firefox
// @namespace wk2FF
// @description Translates desktop notifications for Chrome/Safari (webkit API) for W3C draft API in FF22+.
// @version 1.0.5
// @copyright King of Nerdz (https://userscripts.org/users/nerdz)
// @match <all_urls>
// @updateURL https://userscripts.org/scripts/source/173481.meta.js
// @downloadURL https://userscripts.org/scripts/source/173481.user.js
// @run-at document-start
// ==/UserScript==

(function(){
 var a=document.createElement("script");
 a.type="text/javascript";
 a.innerHTML='var webkitNotifications={createNotification:function(c,d,e){if(Notification.permission!="granted"){this.requestPermission()}else{var n=new Notification(d,{dir:"auto",lang:"",body:e,tag:"wk2ff",icon:c});return this}},createHTMLNotification:function(){alert("Not implemented yet.");return false},checkPermission:function(){if(Notification.permission==="granted"){return 0}else if(Notification.permission==="default"){return 1}else{return 2}},requestPermission:function(c){(!c)?(c=function(){}):0;Notification.requestPermission(c);return Notification.permission},show:function(){}};';
 if(navigator.userAgent.match(/Firefox\/(.+?)(?=\.)/)[1]>=22){document.getElementsByTagName("head")[0].appendChild(a);}
})();