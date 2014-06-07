// ==UserScript==
// @name          Submit In Select
// @namespace     http://www.arantius.com/article/arantius/submit+in+select/
// @description	  Submits a form when a select box is focused and you press enter.
// @include       *
// ==/UserScript==

//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

(function() {
function submitOnSelect(e) {
    if ('SELECT'==e.target.tagName && 13==e.keyCode && e.target.form) e.target.form.submit();
}

var sels=document.getElementsByTagName('select');
for (var i=0; i<sels.length; i++) {
	sels[i].addEventListener('keyup', submitOnSelect, true);
}
})();
