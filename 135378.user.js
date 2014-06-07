// ==UserScript==
// @name           Bypass Facebook Be Careful
// @version        0.1
// @copyright      2012 Nicolai Ehemann (en@enlightened.de)
// @description    Bypass Facebook Be Careful
// @namespace      http://www.enlightened.de
// @include       *.facebook.com/l.php*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

window.location = unescape(unescape(window.location.href.substring(32).split('&')[0]));
