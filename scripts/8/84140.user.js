// ==UserScript==
// @name           Server top 5 edit by Galkon
// @namespace      remove shit
// @include        http://wwww.rune-server.org/*
// ==/UserScript==
var tables,i;
tables = document.getElementsByTagName('table');
    for(i in tables)
    {
        if(/Server Top 5/.test(tables[i].innerHTML))
        {
        tables[3].innerHTML = "";
        void(0);
        }
    }