// ==UserScript==
// @name           fs-noad
// @namespace      http://userscripts.org/users/133663
// @description    Remove ad div, making adblock-free browsing possible
// @include        http://www.formspring.me/account/inbox
// ==/UserScript==

var a = document.getElementById('Formspringme_Inbox_300x250');
a.innerHTML = '';
a.parentNode.parentNode.removeChild(a.parentNode);
delete a;