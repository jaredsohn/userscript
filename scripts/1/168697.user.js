// ==UserScript==
// @id             netflix.com-899f85b9-10d5-4b8c-a1e9-b4ecd0730de3@scriptish
// @name           Netflix Sharing Prompt Remover
// @version        1.0
// @author         William Linna
// @license        Public Domain
// @description    Removes annoying sharing prompt that sometimes appears in Netflix
// @match        http://*.netflix.com/*
// @run-at         document-end
// ==/UserScript==

(function() {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.connect-overlay { display: none;}';
    head.appendChild(style);
})();
