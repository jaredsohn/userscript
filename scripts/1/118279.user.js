// ==UserScript==
// @name           UoP: Time Out Disabler
// @namespace      http://userscripts.org/users/108930
// @description    Stops University of Phoenix from trying to time out your session and stealing browser focus.
// @include        *phoenix.edu*
// ==/UserScript==

window.onload = function() {
    var d = document;   // shorthand
    var scripts = d.getElementsByTagName('script');
    for(var i = 0; i < scripts.count; i++) {
        if(scripts[i].src.indexOf('/afm217/shared/scripts/1.57.2/SessionWarningTimer.js') != -1) {
            scripts[i].src = '';
        } else if(scripts[i].src.indexOf('/afm218/shared/scripts/1.57.2/SessionWarningTimer.js') != -1) {
            scripts[i].src = '';
		}
    }
}
