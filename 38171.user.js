// ==UserScript==
// @name           Logout-Reminder hide
// @namespace      Stefan 'noff'
// @description    Blendet den Erinnerer für den Logout aus
// @include        http://*.studivz.net/*
// @include        http://*.meinvz.net/*
// ==/UserScript==
document.getElementById("PhxDialog0").style.visibility = "hidden";
document.getElementById("PhxCover").style.visibility = "hidden";