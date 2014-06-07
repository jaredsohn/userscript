// ==UserScript==
// @name        Nuke button
// @namespace   facebook_nuke
// @description Replace like with nuke button
// @version     1.5
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       none;
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

this.fbnuke_render = function() {
    $('#facebook button[type="submit"], '+
      '#facebook a.UFILikeLink,'+
      '#facebook span.uiButtonText,'+
      '#facebook a.fbUpDownVoteOption'
      ).each(function() {
         var jThis = $(this);
         jThis.html( jThis.html().replace('Like','Nuke'));
    })
}

this.fbnuke_render();
setTimeout(this.fbnuke_render,3000);
setTimeout(this.fbnuke_render,7000);
var int_id = setInterval(this.fbnuke_render,10000);