// Version 1.0
// Calfinated Software
//
// ==UserScript==
// @name           Motorola Surfboard Log TimeStamp Changer
// @namespace      http://mywebsite.com/myscripts
// @description    Changes the default timestamp on Motorola Surfboard log files to something more readable
// @include       http://192.168.100.1/*

// ==/UserScript==

var allText, thisText, match, ts, YY,MO,DD,HH,MI,SS, newts;

var regex = new RegExp("^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$");

allText = document.getElementsByTagName('td');
for (var i = 0; i < allText.length; i++) {    
    thisText = allText[i];
    match = regex.exec(thisText.innerHTML);

    if (match) {
        ts = match[0];

        YY = ts.charAt(0) + ts.charAt(1);
        MO = ts.charAt(2) + ts.charAt(3);
        DD = ts.charAt(4) + ts.charAt(5);
        HH = ts.charAt(6) + ts.charAt(7);
        MI = ts.charAt(8) + ts.charAt(9);
        SS = ts.charAt(10) + ts.charAt(11);

        newts = MO+'-'+DD+'-'+YY+'  '+HH+':'+MI+':'+SS

        thisText.innerHTML = newts;
    }
}