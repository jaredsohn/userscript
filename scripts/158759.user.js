// ==UserScript==
// @name myUserJS
// @description blabla 
// @author blaablaaa
// @license MIT
// @version 1.0
// ==/UserScript==

document.onkeydown=function (event) {
 var ev = event || window.event;
 if (ev.keyCode==109) {
  var ev2=document.createEvent("KeyboardEvent");
  ev2.initEvent("keypress",true,false);
  ev2.keyCode==8;
  event.target.dispatchEvent(ev2);
 }
}
