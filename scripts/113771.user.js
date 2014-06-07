// ==UserScript==
// @name          GR-MessageCounter
// @namespace     http://gr-tools.justlep.net/
// @description   Shows the number of messages in the window title and, thus, taskbar 
// @include http*://www.gayromeo.com/*main/top.php
// @include http*://www.gayromeo.com/*setcard/cluide/navigation.php*
// @include http*://www.planetromeo.com/*main/top.php
// @include http*://www.planetromeo.com/*setcard/cluide/navigation.php*
// @include http*://83.98.143.20/*main/top.php
// @include http*://83.98.143.20/*setcard/cluide/navigation.php*
// @version $Revision: 1.2 $
// @date    $Date: 2012/08/30 16:53:33 $
// @author LeP <gr-tools@justlep.net>
// ==/UserScript==

(function() {
	
	var TITLE_TEXT = '(%msg%|%vis%%visNote%)',
		topHead = self.document.getElementsByTagName('head')[0],
		js = self.document.createElement('script'),
		src = "(function(){var f = top.setDisplay;top.setDisplay = function(_o){var o=_o||{}; top.document.title = '"+ TITLE_TEXT +"'.replace(/%msg%/,o.msgCount||'?').replace(/%vis%/,o.visCount||'?').replace(/%visNote%/,(o.visNote)?'*':''); f(o);} })();";

	js = js.wrappedJSObject || js;
	js.type = 'text/javascript';
	js.innerHTML = src;
	topHead.appendChild(js);

})();