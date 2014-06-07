/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            Fade In and Out
// @namespace       http://userscripts.org/users/12
// @description     Adds fade out effect when the page is unloaded
// @version         3.0
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @homepageURL     https://userscripts.org/scripts/show/135732
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @updateURL       https://userscripts.org/scripts/source/135732.meta.js
// @downloadURL     https://userscripts.org/scripts/source/135732.user.js
// @include         *
// @run-at          document-start
// @grant           GM_addStyle
// ==/UserScript==

GM_addStyle("@-moz-keyframes fadein {\
  from { opacity: 0; }\
  to   { opacity: 1; }\
}\
@-webkit-keyframes fadein {\
  from { opacity: 0; }\
  to   { opacity: 1; }\
}\
@keyframes fadein {\
  from { opacity: 0; }\
  to   { opacity: 1; }\
}\
html {\
     -moz-animation: fadein ease-in 1000ms;\
  -webkit-animation: fadein ease-in 1000ms;\
          animation: fadein ease-in 1000ms;\
}")

addEventListener("beforeunload", function() {
  GM_addStyle("@-moz-keyframes fadeout {\
  from { opacity: 1; }\
  to   { opacity: 0; }\
}\
@-webkit-keyframes fadeout {\
  from { opacity: 1; }\
  to   { opacity: 0; }\
}\
@keyframes fadeout {\
  from { opacity: 1; }\
  to   { opacity: 0; }\
}\
html {\
     -moz-animation: fadeout ease-in-out 500ms;\
  -webkit-animation: fadeout ease-in-out 500ms;\
          animation: fadeout ease-in-out 500ms;\
  opacity: 0;\
}");
}, false)
