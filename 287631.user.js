// ==UserScript==
// @name           TODOIST anywhere
// @description    Starts Todoist anywhere in gmail
// @include        *mail.google.com/mail/u/0/?pli=1*
// @grant          none
// @version        1.1
// ==/UserScript==

window.addEventListener('load', function() {
    javascript: (function() { var doc = top.document; if(top.js && top.js.document) doc = top.js.document; var script = doc.createElement('script'); doc.todoist_script = script; script.type = 'text/javascript'; script.src = 'https://todoist.com/anywhere/getJavaScript'; doc.getElementsByTagName('head')[0].appendChild(script); })(); void(0);
}, false);