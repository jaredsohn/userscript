// ==UserScript==
// @name        Auto Message Signature
// @namespace   Travian T4 Message Signature
// @description This script will automatically add a signature in every new message.
// @created by: Deyaa EL-Nadi
// @include     http://*.travian.*.*/nachrichten.php?t=1&newdid=*
// @include     http://*.travian.*.*/nachrichten.php
// @include     http://*.travian.*.*/nachrichten.php?t=1&id=*&newdid=*
// @include     http://*.travian.*.*/nachrichten.php?t=*
// @include     http://*.travian.*.*/nachrichten.php?t=1&id=*
// @include     http://*.travian.*/nachrichten.php?t=1&newdid=*
// @include     http://*.travian.*/nachrichten.php
// @include     http://*.travian.*/nachrichten.php?t=1&id=*&newdid=*
// @include     http://*.travian.*/nachrichten.php?t=*
// @include     http://*.travian.*/nachrichten.php?t=1&id=*

// ==/UserScript==

// EDIT THIS
var line0 ="بعد التحيه.."
var line1 ="  أعتذر عن التأخير في الرد علي رسالتك رغم اهميتها .. وسيتم الرد عليك بأقرب وقت ممكن .. هذا الرد ألي و لا يجب عليك إعاده الرد عليه ;)"
var line2 ="[عريض]ابو ساره[/عريض]"
var line3 ="[عريض]فريق إدارة المعجزه[/عريض]"

// DO NOT EDIT THIS - NE MENJATI OVO
var Text = line0+"\n"+line1+"\n\n"+line2+"\n"+line3

var message = document.getElementById('message');

if (message) {
	message.innerHTML = Text+ message.innerHTML;
}