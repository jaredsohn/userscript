// ==UserScript==
// @name             scrollshortcuts
// @namespace        http://www.tadafumisato.com
// @version          1.0
// @description      Add Scroll Keyboard Shortcuts.
// @include          *
// @exclude          http://www.google.*/search?*
// ==/UserScript==

(function(){

   var scroll_value = 50;
   var up_key = 'k';
   var down_key = 'j';

   function scrollUp(){
     window.scrollBy(0, -(scroll_value));
   }

   function scrollDown(){
     window.scrollBy(0, scroll_value);
   }

   function keypress(e){
     e.stopPropagation();
     var reg_ex = /input|isindex|textarea/i;
     if(e.target.toString().search(reg_ex) != -1){
       return;
     }
     var key = String.fromCharCode(e.charCode);
     if(key == up_key){
       scrollUp();
     }else if(key == down_key){
       scrollDown();
     }
   }

   document.addEventListener('keypress', keypress, false);

})();
