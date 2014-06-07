// ==UserScript==
// @name           Orkut 99% width by damin
// @namespace      http://gverma.blogspot.com
// @description    converts orkut container width to 99% ,useful for users having widescreen
// @include        http://www.orkut.co*/*
// @include        http://orkut.co*/*
// ==/UserScript==
 (function() {
     function do_widen(id, min) {
         var container = document.getElementById(id);
         if (!container)
             return;
         if (min)
             container.style.minWidth = min;
     }
     try {
     do_widen("headerin", "99%");
     do_widen("container", "99%");
     } catch (e) {
         GM_log( 'Orkut99percent exception: ' + e );
		 //alert(e);
		}
    
})();