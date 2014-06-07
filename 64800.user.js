// ==UserScript==
// @name           Travian ☣ Attack Log - Attack type shortcuts
// @namespace      http://userscripts.org/users/103897
// @description    Helps you easily view attacks by type: attack with/without victims, defence with/without victims, espionage, etc...
// @include        http://*.travian.*/allianz.php?s=3
// @include        http://*.travian.*/allianz.php?s=3&f=*
// @author         Jinnie
// @version        0.1.2
// ==/UserScript==


// Find bind spot
var content = document.getElementById('content');

var iconSpan = document.createElement('span');

// Add icons

for (var i = 1; i < 18; i++) {
    if (i == 8) {
        i = 14; //new icons/links added by Dorcas
        continue;
    }
    iconSpan.innerHTML += "<a href='allianz.php?s=3&f=" + i + "'><img class='iReport iReport" + i + "' src='img/x.gif'/></a>";
}

content.insertBefore(iconSpan, document.getElementById('offs'));