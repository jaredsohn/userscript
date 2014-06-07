// ==UserScript==
// @name        Bukkit.org Remove Curse Footer
// @autor       WarmakerT
// @description Remove the Curse Footer from the Bukkit Forums!
// @namespace   localhost
// @include        *://forums.bukkit.org/*
// @include        *://bukkit.org/*
// @include        *://www.bukkit.org/*
// @version     0.1
// ==/UserScript==

var elem = document.getElementsByClassName("main t-footer u-icon u-icon-a group")[0];
elem.remove();