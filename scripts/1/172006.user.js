// ==UserScript==
// @name       KSML webcam feed updater
// @namespace  http://userscripts.org/users/522672
// @version    1.0
// @description  Reloads KSML webcam pictures
// @match      http://www.ksml.fi/uutiset/video-kuva/webkamerat/*
// @copyright  2013+, Sampo L.
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

window.setInterval(function()
{
	$("[alt='Kompassi']").attr("src", "http://217.152.196.254/snapshotJpeg?Resolution=640x480&Quality=Standard");
    $("[alt='Vesilinna']").attr("src", "http://195.255.142.50/snapshotJpeg?Resolution=640x480&Quality=clarity");
}, 3000);