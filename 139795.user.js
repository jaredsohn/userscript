// ==UserScript==
// @name        Travian T4 Message Signature
// @namespace   Travian T4 Message Signature
// @description This script will automatically add a signature in every new message. Ova skripta ce automatski dodati potpis u svaku novu poruku.
// @created by: EmptySD
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

// EDIT THIS - IZMENITI OVO
var line0 ="Greeting,"
var line1 ="Message text"
var line2 = "Best regards"
var line3 ="[i]Your Signature[/i]"

// DO NOT EDIT THIS - NE MENJATI OVO
var Text = line0+"\n"+line1+"\n\n"+line2+"\n"+line3

var message = document.getElementById('message');

if (message) {
	message.innerHTML = Text+ message.innerHTML;
}