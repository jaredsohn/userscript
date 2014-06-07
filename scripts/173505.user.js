// ==UserScript==
// @name          SeeMore skip
// @description   Skip seemore.ru links automatically back to source. Originally was created for fontanka.ru.
// @author        dluciv
// @license       WTFPLv2 (http://wtfpl.net/)
// @version       0.0.0.4
// @namespace     http://userscripts.org/scripts/review/173505
// @homepage      http://userscripts.org/scripts/show/173505
// @updateURL     http://userscripts.org/scripts/source/173505.meta.js
// @downloadURL   http://userscripts.org/scripts/source/173505.user.js
//
// @match         http://www.seemore.ru/from/*/*
// ==/UserScript==

window.location.replace(
  'http://www.seemore.ru/go/' +
  window.location.href.split('/').slice(-1)[0]
)
