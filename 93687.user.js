// ==UserScript==
// @name          Get MP3! Enhanced Edition
// @version       0.4
// @author	  Jaimie van Santen
// @namespace     http://jaimievansanten.nl
// @description   Adds a button menu on Youtube to convert the currently playing video to mp3 format.
// @include       http://www.youtube.com/*
// ==/UserScript==

var s = location.href.split("&");
var url=s[0];

document.getElementById('watch-headline-user-info').innerHTML += '<button class="yt-uix-button yt-uix-tooltip" style="margin-right:4px;"><span class="yt-uix-button-content">Download as MP3</span> &nbsp; <img class="yt-uix-button-arrow" src="" alt="" />'
																 + '<ul style="display:none;" class="yt-uix-button-menu">'
																		+ '<li><a target="_newtab" style="text-decoration:none;" href="http://2conv.com/?url='+ url + '"><span class="yt-uix-button-menu-item" loop="1">Download with 2Conv</span></a></li>'
																		+ '<li><a target="_newtab" style="text-decoration:none;" href="http://www.listentoyoutube.com/?url='+ url + '"><span class="yt-uix-button-menu-item" loop="2">Download with ListenToYoutube</span></a></li>'
																		+ '<li><a target="_newtab" style="text-decoration:none;" href="http://www.youtube-mp3.org/redir?url='+ url + '"><span class="yt-uix-button-menu-item" loop="3">Download with Youtube-MP3</span></a></li>'
																		+ '<li><a target="_newtab" style="text-decoration:none;" href="http://www.vidtomp3.com/?url='+ url + '"><span class="yt-uix-button-menu-item" loop="4">Download with VidToMP3</span></a></li>'
																	+ '</ul>'
																 + '</button>';