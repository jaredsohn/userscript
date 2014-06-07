// ==UserScript==
// @name           Better Tiberium Alliances Password Save
// @namespace      Better_Tiberium_Alliances_Password_Save
// @description    Allows to save your password (better) on alliances.commandandconquer.com
// @include        https://alliances.commandandconquer.com/*/login/*
// @include        https://alliances.commandandconquer.com/login/*
// @version        1.0
// @author         davidkn
// ==/UserScript==

document.getElementById("password").autocomplete = 'on';