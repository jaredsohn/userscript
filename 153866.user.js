// ==UserScript==
// @name        Runescape Forum Timestamps
// @namespace   Shaun Dreclin
// @include     *services.runescape.com/m=forum/*
// @require     http://raw.github.com/timrwood/moment/1.7.2/moment.js
// ==/UserScript==

var timezone_offset = -300 //Timezone offset in minutes
var timestamp_format = "MMM Do YYYY @ h:mm A"; //Format of output timestamp - Documentation at http://momentjs.com/docs/#/displaying/format/

document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replace(/<span>[0-9]{2}-[A-Za-z]+-[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}<\/span>/g, function(match) { return "<span>" + moment(match, "DD-MMM-YYYY HH:mm:ss").add("m", timezone_offset).format(timestamp_format) + "</span>"; });