// ==UserScript==
// @name           Scroll with the Mouse!
// @namespace      http://www.iescripts.org/userinfo.php?id=4812
// @description    Scroll a page by simply hovering over the scrollbar and moving the cursor up and down. No more Clicking!
// @include        *
// @author         Protector one
// @date           2 feb 2010
// @version        1.1
// ==/UserScript==

var scrollStartSWTM = -1;

(function(){
  
  document.addEventListener('mousemove',function(event){
    if (event.clientX > document.body.clientWidth){
      if (scrollStartSWTM != -1){
        var factor = Math.ceil(1.0*Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) / Math.min(document.documentElement.clientHeight, document.body.clientHeight));
        var delta = factor * (event.clientY - scrollStartSWTM);
        document.body.scrollTop += delta;
        document.documentElement.scrollTop += delta;
      }
      scrollStartSWTM = event.clientY;
    }else
      scrollStartSWTM = -1;
  },false);
  
})(); 