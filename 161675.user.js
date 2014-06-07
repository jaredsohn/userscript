// ==UserScript==
// @name       Lupa add remover
// @namespace  http://userscripts.org/scripts/show/161675
// @updateURL  http://userscripts.org/scripts/show/161675
// @version    0.1
// @description  Removes advertisements from Lupa.cz
// @match      http://www.lupa.cz/*
// @creator    petr.adamek@outlook.com
// @require    http://code.jquery.com/jquery-1.8.1.min.js
// ==/UserScript==

jQuery(".promo-in-article").remove()