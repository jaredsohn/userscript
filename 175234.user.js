// ==UserScript==
// @name       Ez5sing
// @namespace  http://blog.zhuogu.net/
// @author	   Guguke <zyu@zhuogu.net>
// @version    0.1
// @description  Allow download 5sing music without login by replacing download link.
// @homepage	https://userscripts.org/scripts/show/175234
// @updateURL	https://userscripts.org/scripts/source/175234.meta.js
// @downloadURL	https://userscripts.org/scripts/source/175234.user.js
// @match      http://yc.5sing.com/*.html
// @match      http://fc.5sing.com/*.html
// @match      http://bz.5sing.com/*.html
// @copyright  2013+, Guguke
// ==/UserScript==

document.getElementsByClassName('func_icon3')[0].getElementsByTagName('a')[0].href = wplayer.playList[0].file;