// ==UserScript==
// @name           saveOutgoingHotmail
// @namespace      http://www.martufone.info/gm
// @description    Checks "Copy Message to Sent Folder" in order to save outgoing emails when composing (new, reply, forward)
// @include        http://*.hotmail.msn.com/cgi-bin/compose?*
// ==/UserScript==

//20070503_1 8:50 DST CET

(function(){
	var elem = document.getElementsByName('outgoing')[0]
	if(elem && !elem.checked) {
		elem.click()
	}
})();

