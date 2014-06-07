// ==UserScript==
// @name           nightly1
// @namespace      com.mozest.keijack
// @auther                Keijack
// @version        1.0.0
// @description    减低页面的亮度, 在黑暗中查看页面有助于保护眼镜(?)
// @include        *
// ==/UserScript==

   ns4 = (document.layers) ? true : false;
   ie4 = (document.all) ? true : false;
function keyDown(e){
  if(ns4){
  var nkey=e.which;
  var iekey='现在是ns浏览器';
  var realkey=String.fromCharCode(e.which);
}
  if(ie4){
  var iekey=event.keyCode;
  var nkey='现在是ie浏览器';
  var realkey=String.fromCharCode(event.keyCode);
  if(event.keyCode==32){realkey='\' 空格\''}
  if(event.keyCode==13){realkey='\' 回车\''}
  if(event.keyCode==27){realkey='\' Esc\''}
  if(event.keyCode==16){realkey='\' Shift\''}
  if(event.keyCode==17){realkey='\' Ctrl\''}
  if(event.keyCode==18){realkey='\' Alt\''}
}
   alert('ns浏览器中键值:'+nkey+'\n'+'ie浏览器中键值:'+iekey+'\n'+'实际键为'+realkey);
}
document.onkeydown = keyDown;
if(ns4){
document.captureEvents(Event.KEYDOWN);}

