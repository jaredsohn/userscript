// ==UserScript==
// @name       Feedly Compact Layout
// @namespace  http://userscripts.org/users/137033
// @version    1.0.1
// @description  Removes extra space
// @match      http://www.feedly.com/home*
// @copyright  2013+, André de Jager
// ==/UserScript==
GM_addStyle(
'div.content img {\
    width: auto !important;\
    height: auto !important;\
    max-width: none !important;\
}\
div.inlineFrame {\
    padding-left: 33px !important;\
}\
.entryBody {\
    max-width: none !important;\
}');