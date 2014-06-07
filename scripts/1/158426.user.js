// ==UserScript==
// @name WoT Forum Old Style Labels
// @match http://forum.worldoftanks.ru/*
// ==/UserScript==

document.styleSheets[0].insertRule(".mlabel-link  {opacity: 1 !important; font-size: 12px !important; font-weight: bold; padding: 1px 2px !important; background: url() !important;}", 0);
document.styleSheets[0].insertRule(".mlabel-link__red {color: red !important; border: 2px solid red;}", 0);
document.styleSheets[0].insertRule(".mlabel-link__green {color: green !important; border: 2px solid green;}", 0);
document.styleSheets[0].insertRule(".mlabel {background: url() !important; font-size: 11px !important; font-weight: bold; margin: 0 !important; width: auto !important; height: auto !important; line-height: normal !important; padding: 1px 2px !important;}", 0);
document.styleSheets[0].insertRule(".mlabel.marked {color: green !important; border: 2px solid green;}", 0);
document.styleSheets[0].insertRule(".mlabel.unmarked {color: red !important; border: 2px solid red;}", 0);

var marked_label = document.getElementsByClassName('marked');
var unmarked_labels = document.getElementsByClassName('unmarked');

marked_label[0].innerHTML = 'ОТМЕЧЕНО';
for(var i = 0; i <= unmarked_labels.length; i++)
{
    unmarked_labels[i].innerHTML = 'ОТМЕТИТЬ';
}