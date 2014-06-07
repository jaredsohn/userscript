// ==UserScript==
// @name          lib.rus.ec улучшеное чтение книг 
// @namespace     http://userscripts.org/ 
// @description	  Меняет стили абзацов текста для более легкого чтения (крупный шрифт с засечками, ограниченая ширина, и т.п.)
// @include       http://lib.rus.ec/b/*
// ==/UserScript==

GM_addStyle("p.book { " + 
    "font-family: Georgia;" +
    "font-size: 1.5em;" +
    "text-indent: 0;" +
    "margin-top: 0.8em;" +
    "margin-right: auto;" + 
    "margin-left: auto;" +
    "width: 35em;" +
    "line-height: 1.4em;" +
" }");

GM_addStyle("h3.book { " + 
    "font-family: 'Lucida Grande', Verdana;" +
    "font-size: 1.8em;" +
    "margin-top: 0.8em;" +
" }");
