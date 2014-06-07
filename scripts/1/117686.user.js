// ==UserScript==
// @name           Megaupload Popup Remover
// @namespace      http://www.feit.fr
// @description    kills damn megaupload.com popup that used to survive Mozilla popup blocker and AdBlockPlus
// @author         feit
// @version        1.0

// @include        http://www.megaupload.com/?d=*
// @include        https://www.megaupload.com/?d=*

// ==/UserScript==

document.getElementById('downloadlink').getElementsByTagName("A")[0].setAttribute("onclick", "");