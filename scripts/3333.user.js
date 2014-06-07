// ==UserScript==
// @namespace     http://www.nsaneproductions.com/
// @name          92.9 Radio Fix
// @description   Fixes the radio popup to work with Firefox.
// @include       http://929.com.au*
// @include       http://*.929.com.au*
// ==/UserScript==

(function() {

  function fixedpop(){
    var url = "http://203.48.254.42/ad.php?rsid=19847";
    var w = screen.width; // Get the width of the screen
    var h = screen.height; // Get the height of the screen
    var winRadio = window.open(url, '', 'height='+h+',width='+w+',left=0px,top=0px,scroll=no,status=no,resizable=no');
    if (window.focus) {winRadio.focus();}
  }

  link = document.getElementsByTagName("a")[1];
  link.addEventListener('click', fixedpop, true);

})();

/*  CHANGELOG
     
   Version 0.1:
     - Initial release.

*/