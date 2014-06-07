// ==UserScript==
// @name            SlaveHack Log Changer
// @description    Replaces your IP in the logfile when you log into an IP or access the logs
// @include        http://www.slavehack.com/*
// ==/UserScript==

var ipArr = new Array();
ipArr = document.getElementsByTagName('small');
ipString = ipArr[0].innerHTML;
ipAddress = ipString.substring(74).replace(']','');

var logContent = document.getElementsByName('logedt')[0].value;
var found = 0;

var ipPresent = logContent.match(ipAddress);

while(ipPresent != null)
{
found = found + 1;
logContent = document.getElementsByName('logedt')[0].value;
var newContent = logContent.replace(ipAddress, 'Bezoek ook eens Ramp6.net. Visit Ramp6.net also'); //Edit the word localhost to alter what your IP is changed to
document.getElementsByName('logedt')[0].value = newContent;
var ipPresent = logContent.match(ipAddress);
}
if (found != 0)
{
document.forms[1].submit();
}