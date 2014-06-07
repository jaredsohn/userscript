// ==UserScript==
// @name            Popup Alt
// @namespace       http://espion.just-size.jp/archives/05/136155838.html
// @description     The Alt attribute is displayed same as the Title attribute.
// @include         *
// ==/UserScript==

/*
$Id: PopupAlt.user.js 749 2006-05-09 05:39:59Z takayama $

2006-05-09:
   - added prefix 'ALT: ' , thanks to Josh.
*/

(function() {

   var img = document.body.getElementsByTagName('img');
   _change(img);

   var area = document.body.getElementsByTagName('area');
   _change(area);

   function _change(tag) {
      for(i in tag) {
         var alt   = tag[i].alt;
         var title = tag[i].title;
         if(alt && !title) tag[i].title = 'ALT: ' + alt;
      }
   }

})();

