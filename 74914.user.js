// ==UserScript==
// @name           surfthechannel.com - ad remover
// @namespace      stc
// @include        http://www.surfthechannel.com*
// ==/UserScript==

var adFrame = document.getElementsByTagName('iframe');
adFrame[0].src = "";
adFrame[1].src = "";
adFrame[2].src = "";