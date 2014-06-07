// ==UserScript==
// @name           FurAffinity - Music Loop
// @namespace      http://www.furaffinity.net/user/shaundreclin
// @description    Loop music submissions on FA
// @include        *furaffinity.net/view*
// @version        2
// ==/UserScript==

document.getElementsByTagName("embed")[0].setAttribute("src", document.getElementsByTagName("embed")[0].getAttribute("src") + "?repeat=always");