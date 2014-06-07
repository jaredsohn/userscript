// CrunchyRoll spoiler blocker
// version 0.1
// 
// Copyright (c) 2010, Sulaiman A. Mustafa
//
// --------------------------------------------------------------------
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CrunchyRoll spoiler blocker
// @namespace     http://people.sigh.asia/~sulaiman
// @description   Blocks unwanted spoilers displayed in a yellow message box above the video.
// @include       http://www.crunchyroll.com/*
// ==/UserScript==

org="<div id='blocked-message-with-happyface' style='display:none'>"+document.getElementById("message_box").getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML+"</div>";
sub="<div style='background-color:#FFFFCC;padding:6px 16px;cursor:pointer' onClick=\"document.getElementById('blocked-message-with-happyface').style.display='block';this.style.display='none'\"> This message has been blocked &#9786;. click to see it.</div>";
document.getElementById("message_box").getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML=org+sub;

// not everything can be said
document.getElementsByClassName("guestbook")[0].style.display="none";