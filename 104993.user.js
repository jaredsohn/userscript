// ==UserScript==
// @name           Cheaters Schedule
// @namespace      members.poolplayers.com
// @description    Avoid that stupid APA nav requirements to get a damn schedule.
// @include        http://members.poolplayers.com/*
// ==/UserScript==

var elmNewContent = document.createElement('a');
elmNewContent.href = 'http://members.poolplayers.com/Stats/TeamSchedule.aspx';
elmNewContent.appendChild(document.createTextNode('Cheaters Schedule'));
var elmButton = document.getElementById('ctl00_lbtnHome');
elmButton.parentNode.insertBefore(elmNewContent, elmButton);

