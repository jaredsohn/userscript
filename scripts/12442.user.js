// ==UserScript==
// @name          Samachar Frame Remover
// @description   Remove the bottom frame from Samachar links
// @include       http://publication.samachar.com/*
// @include       http://samachar.com/*
// @namespace     http://www.employees.org/~kommu/samachar.user.js
// ==/UserScript==
// Author: Srinivas Kommu (kommu@hotmail.com)
// Adapted from http://www.gozer.org/mozilla/greasemonkey/

(function() {
  var e = document.getElementById('frmSet');
  if (!e) {
    e = document.getElementById('fset');  // get the main frameset
  }

  if(e) {
    var p = e.getElementsByTagName('frame');

    if(p && p.length == 2) {
      e.removeChild(p[0]);                // remove the top frame

      e.setAttribute('rows', '*');        // adjust the frameset cols

      e.removeAttribute('id');            // remove the id so the frameset
                                          // cannot be found and adjusted
                                          // by any subscripts.
                                          // thanks ElZorro! :)
    }
  }
})();
