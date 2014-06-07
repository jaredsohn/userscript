// ==UserScript==
// @name           Spenden Beschleuniger
// @namespace      schulterglatze.de
// @include        http://www.schulterglatze.de/spenden/*
// @require        http://www.schulterglatze.de/js/jquery-1.4.2.min.js
// ==/UserScript==

var script = document.getElementById("content").getElementsByTagName("script")[0].firstChild.data;
var reg_ex = /setSpende\('"\+ (\d{1,6}) \+"', '"\+ (\d{1,6}) \+"', '"\+ (\d{10,}) \+"', '([0-9a-f]{40})'\)/;
var params = reg_ex.exec(script);

window.setTimeout("setSpende('"+ params[1] +"', '"+ params[2] +"', '"+ params[3] +"', '" + params[4] + "')", 0);

window.setTimeout(function() { document.getElementById("donationResponse").removeAttribute("id") }, 1400);