// ==UserScript==
// @name       Drawception Disable Tooltips
// @namespace  http://drawception.wikia.com/wiki/Drawception_Wiki#Player_Tools
// @version    0.1.2
// @description  All credit for code goes to Talon, all blame for breakage to me.
// @match http://drawception.com/play/
// @copyright  2012+, Brett Unis, Creative Commons
// ==/UserScript==

unsafeWindow.jQuery('*[rel=tooltip]').removeAttr('rel');