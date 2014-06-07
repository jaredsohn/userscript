// ==UserScript==
// @name           Game Jump
// @namespace      
// @description    Insert a game number and this script takes you there!
// @include        http://www.conquerclub.com/*
// @include        https://www.conquerclub.com/*
// ==/UserScript==


var li = document.createElement('li');
li.innerHTML = "<span style=\"\" class=\"divider\"><input maxlength=\"7\" style=\"font-size:1em;width:145px;padding:0em;text-indent:0.1em\" value=\"Insert Game #\" onfocus=\"if (this.value == 'Insert Game #') this.value = '';\"id=\"gamenumber\" type=\"text\"  /></span>";
var ul = document.getElementById("leftColumn").getElementsByTagName("ul");
ul[0].appendChild(li);

document.getElementById('gamenumber').addEventListener('keypress', function(event) {
if(event.keyCode == 13) {window.location.href = window.location.protocol + "//www.conquerclub.com/game.php?game=" + document.getElementById("gamenumber").value}
}, false);

document.getElementById('gamenumber').addEventListener('keypress', function(event) {
event.stopPropagation();
}, false);