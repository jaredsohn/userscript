// ==UserScript==
// @name           Facebook Beeper Disabler
// @description    Hides facebook notifications while playing games. Works only for games based at apps.facebook.com.
// @include        http://apps.facebook.com*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.1.1
// @copyright      Charlie Ewing
// ==/UserScript== 

(function() { 

	var version = "0.0.1";

	//addGlobalStyle from diveintogreasemonkey.org
	function addGlobalStyle(css) {
    		var head, style;
    		head = document.getElementsByTagName('head')[0];
    		if (!head) { return; }
    		style = document.createElement('style');
    		style.type = 'text/css';
    		style.innerHTML = css;
    		head.appendChild(style);
	}

	//redefine beeper classes to be always hidden
	addGlobalStyle('.UIBeeper{bottom: 30px;left: 15px;position: fixed;width: 230px;z-index: 99;display: none !important;}');

})(); // anonymous function wrapper end