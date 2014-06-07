// ==UserScript==
// @name           zsave
// @namespace      http://userscripts.org/users/ans
// @description    Od noordunga fkradeno shranjevanje ZSjev
// @include        http://www.joker.si/mn3njalnik/*act=Msg*
// ==/UserScript==

var es = document.getElementsByName("add_sent");
if (es.length > 0) {
    es[0].checked = true;
}
