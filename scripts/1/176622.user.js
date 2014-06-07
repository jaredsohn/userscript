// ==UserScript==
// @id             bugzilla.mozilla.org-5c163655-6495-4043-b1a9-8a4e71f5ac6a@scriptish
// @name           Bugzilla Github Attachments
// @version        1.0
// @author         Erik Vold
// @include        https://bugzilla.mozilla.org/show_bug.cgi?id=*
// @run-at         document-end
// ==/UserScript==

let pullRegExp = /(https?:\/\/github\.com\/mozilla\/[\w-]+\/pull\/\d+)/i;
Array.slice(document.links).forEach(function(link) {
  if (pullRegExp.test(link.innerHTML)) {
    link.setAttribute('href', RegExp.$1);
    link.setAttribute('title', RegExp.$1);
  }
});
