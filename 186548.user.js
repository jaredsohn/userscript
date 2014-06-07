// ==UserScript==
// @name         Fakku top ad remover
// @namespace    http://userscripts.org/users/186548
// @description  Remove the top ad of fakku image viewer
// @include      http://www.fakku.net/*
// @version      0.1
// @updateURL    https://userscripts.org/scripts/source/186548.meta.js
// @downloadURL  https://userscripts.org/scripts/source/186548.user.js
// ==/UserScript==
var p = document.getElementsByClassName('header');
for(var i=p.length; --i>=0;)
    p[i].parentNode.removeChild(p[i]);

