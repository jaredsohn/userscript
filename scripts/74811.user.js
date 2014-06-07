// ==UserScript==
// @id             Youtube_logged_only
// @name           Youtube logged only
// @description    Youtube logged only.
// @version        5.3
// @author         REVerdi
// @namespace      http://userscripts.org/users/67570
// @copyright      2010+, REVerdi (http://userscripts.org/users/67570)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http*://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==


/* TESTED ONLY ON FIREFOX */


/*
Sorry, but I'm not a programmer, at least for now :).
Please, let me know the fixes and improvements made to this script.
*/


(function(){
  var buttons = document.getElementsByTagName('button');
  regexp = /https?\:\/\/accounts\.google\.com\/ServiceLogin\?/i;
  for ( var i = 0; i < buttons.length; i++ ) {
    buttonUrl = buttons[i].getAttribute('href');
    if( buttonUrl != null ) {
      if( buttonUrl.search( regexp ) == 0 ) {
        //alert( buttonUrl );
        window.location = buttonUrl;
        break;
      }
    }
  }
})();