/* License
Well, to make it short. This program is distributed as public domain
in the hope that it will be useful, but WITHOUT ANY WARRANTY!
*/

// ==UserScript==
// @name           Mehigh FAST raw autodonater for eRepublik
// @namespace      http://www.erepublik.com/en/citizen/profile/629
// @include        http://www.erepublik.com/*/company/*/donate/items
// @include        http://www2.erepublik.com/*/company/*/donate/items
// ==/UserScript==

(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
      var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
          GM_JQ = document.createElement('script');

      GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
      GM_JQ.type = 'text/javascript';
      GM_JQ.async = true;

      GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
  GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
  $('#own').children().appendTo('#other');
  if ( $('#other').children().size() > 0 ) {
    $('#donateform').submit();
  }
}
