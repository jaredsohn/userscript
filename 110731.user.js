// ==UserScript==
// @name           Attack Rounds Reverser
// @namespace      wes1190@hotmail.com
// @description     Reverses the attack rounds excluding 1
// @author         Wes R (Artemis)
// @include        http://*.pardus.at/ship*
// ==/UserScript==

var rounds = document.getElementsByTagName("option");

var x = 0;
var y = 19;

while(x < y){
    var newRounds = rounds[x].value;
    var newText = rounds[x].text;

    rounds[x].value =  rounds[y].value;
    rounds[x].text =  rounds[y].text;

    rounds[y].value =  newRounds;
    rounds[y].text =  newText;

    x += 1;
    y -= 1;
}