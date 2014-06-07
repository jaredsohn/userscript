// ==UserScript==
// @name     Recolor the new YouTube
// @include  http://www.youtube.com/*
// @author   KovacsA
// @version  0.0.5
// ==/UserScript==
document.body.style.background = "#000";
document.getElementById("channel-subheader").style.backgroundImage = "url('http://jegkocka.tk/youtube/tabs.png')";
document.getElementById("channel-subheader").style.backgroundRepeat = "repeat";
document.getElementsByClassName("epic-nav-item-heading").style.backgroundImage = "url('http://jegkocka.tk/youtube/tabs_current.png')";