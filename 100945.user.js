// ==UserScript==
// @name			Easy 4shared MP3 Downloader
// @author			denzjhoena - denzjhoena@live.it
// @description			This a simple script to download mp3 from 4shared with direct link.
// @include			http://4share.com/*
// @include			http://www.4shared.com/*
// @include			http://*.4shared.com/
// @include			http://*.4shared.com/*
// ==/UserScript==

// Set Elements
pos = document.getElementById("userInfo");
link = document.getElementsByTagName("meta").item(13).content;
title = document.getElementsByTagName("meta").item(14).content;
style = 'class="sbtn dm" style="width: 100px; display: inline; text-decoration: none;">';

// Download Link
pos.innerHTML+='<br /><hr class="absmid"><div style="display: inline;">&nbsp;&nbsp;||&nbsp;<b class="absmid">DOWNLOAD MP3 : </b><a href="#" onClick="startDownload();" title="'+title+'" '+style+' CLICK HERE </a></div><hr class="absmid">'
