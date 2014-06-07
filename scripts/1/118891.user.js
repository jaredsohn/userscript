// ==UserScript==
// @id             NoAutostart
// @name           Fairfax Video Anti-Start
// @version        1.0
// @namespace      autostart
// @author         Josh Bode
// @description    Prevent the awful auto-start videos on fairfax sites from starting.
// @include        /^http://www\.(theage|watoday|brisbanetimes|smh)\.com\.au/.*$/
// @run-at         document-end
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(".playCountdownStop").click();