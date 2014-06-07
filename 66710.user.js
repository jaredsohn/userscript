// ==UserScript==
// @name          jQuery
// @namespace     
// @description	Enhance navigation
// @author        Yann Vallery-Radot
// @homepage      
// @include       http://*
// ==/UserScript==

var Enhance = (function () {
   var hasJquery = false,
           debug = false,
           searchAccess = function (autocomplete) {           	 
              var auto = autocomplete || false;
              var searchField = (autocomplete ? $jq("input[autocomplete]") : $jq("input[type='text']"));
              (debug ? alert('here') : '');
              if (searchField.length == 1) {
                 // Bet it's the search field
                 searchField.focus();
                 (debug ? alert('found') : '');
                 $jq().keypress(function (e) {
                    if (e.which == 47 || e.which == 115) { // / key
                       searchField.focus();
                    }
                 });
                 
              }
              else {
                 if (!auto) {
                    setTimeout(function () {
                       searchAccess(true);
                    }, 500);
                 }
              }
           },

           // Check if jQuery's loaded
           gm_wait = function GM_wait() {
              if (typeof unsafeWindow.jQuery == 'undefined') {
                 window.setTimeout(GM_wait, 100);
              }
              else {
                 $jq = unsafeWindow.jQuery;
                 run();
              }
           },

           addJquery = function () {
              try {
                 hasJquery = ($ && $.prototype.jquery)
              }
              catch (e) {
              }

              if (!hasJquery) {
                 (debug ? alert('here') : '');
                 var GM_JQ = document.createElement('script');
                 GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
                 GM_JQ.type = 'text/javascript';
                 document.getElementsByTagName('head')[0].appendChild(GM_JQ);
                 gm_wait();
              }
           },

           // All your GM code must be inside this function
           run = function () {
              //alert($); // check if the dollar (jquery) function works
              searchAccess();
           },

           init = function () {
              addJquery() && run();
           };

   return {
      searchAccess: searchAccess,
      init: init
   };
}()).init();