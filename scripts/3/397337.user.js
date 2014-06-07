// ==UserScript==
// @name       Adfly onbeforeunload dampener
// @namespace  http://mattman00000.com
// @version    0.0.1
// @description  Removes adfly onbeforeunload scripts
// @match      http://adf.ly/*
// @copyright  2014+, mattman00000
// ==/UserScript==

window.onbeforeunload = null;