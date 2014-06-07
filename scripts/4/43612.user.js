// ==UserScript==
// @name           Blip.fm downloads
// @namespace      http://userscripts.org/users/82672
// @include        http://blip.fm/*
// ==/UserScript==

function added(action, args) {
if (args.length && args[0].url.indexOf('http://') == 0) {
var playDiv = document.getElementById('playpause' + args[0].id);
addDownloadButton(args[0].id, args[0].url, playDiv); }}

function addDownloadButton(musicNum, musicUrl, playDiv) {
var dl_link = document.createElement("a");
dl_link.appendChild(document.createTextNode("download"));
dl_link.id = "dl_link" + musicNum;
dl_link.href = musicUrl; }