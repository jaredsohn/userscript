// ==UserScript==
// @name          Soodabang Color Fix
// @namespace     http://whatever.com
// @description	  Changes blue color to white
// @include       http://soodabang.com/*
// ==/UserScript==

        
var allTDs, thisTD, bigString = '';

allTDs = document.getElementsByTagName('table');
for (var i = 0; i < allTDs.length; i++) {
    thisTD = allTDs[i];
    if (document.defaultView.getComputedStyle(thisTD, '').getPropertyValue('background-color') == 'rgb(0, 0, 224)') {
        bigString = bigString + document.defaultView.getComputedStyle(thisTD, '').getPropertyValue('background-color') + "\n";
        thisTD.bgColor = 'white';
    }
} 

allTDs = document.getElementsByTagName('tr');
for (var i = 0; i < allTDs.length; i++) {
    thisTD = allTDs[i];
    if (document.defaultView.getComputedStyle(thisTD, '').getPropertyValue('background-color') == 'rgb(0, 0, 224)') {
        bigString = bigString + document.defaultView.getComputedStyle(thisTD, '').getPropertyValue('background-color') + "\n";
        thisTD.bgColor = 'white';
    }
}        

allTDs = document.getElementsByTagName('td');
for (var i = 0; i < allTDs.length; i++) {
    thisTD = allTDs[i];
    if (document.defaultView.getComputedStyle(thisTD, '').getPropertyValue('background-color') == 'rgb(0, 0, 224)') {
        bigString = bigString + document.defaultView.getComputedStyle(thisTD, '').getPropertyValue('background-color') + "\n";
        thisTD.bgColor = 'white';
    }
}                 