// ==UserScript==
// @name           Hide Digg 'Join Digg'
// @author         Blayde - da.blayde@gmail.com
// @namespace      http://digg.com
// @description    Removes the annoying 'Join Digg' element on Digg
// @include        http://*digg.com*
// ==/UserScript==

(function(){
 document.getElementById("join-digg").style.display="none";
})();