// ==UserScript==
// @name            Fade In and Out FoxySpeed
// @description     Adds fade out effect when the page is unloaded
// @version        1.0
// updateURL       http://userscripts.org/scripts/source/399638.meta.js
// @updateURL      http://userscripts.org/scripts/source/399638.meta.js
// @downloadURL    http://userscripts.org/scripts/source/399638.user.js
// @author          Ismail Iddakuo
// @Original-s-    3.0 http://userscripts.org/scripts/show/135732
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