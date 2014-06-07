// Written by Keito

// ==UserScript==
// @name           SmallerLogo
// @namespace      SmallerLogo
// @include        http://www.reddit.com/r/LinuxHacking
// @include        https://www.reddit.com/r/LinuxHacking
// @include        http://www.reddit.com/r/LinuxHacking/*
// @include        https://www.reddit.com/r/LinuxHacking/*
// ==/UserScript==

var logo;
logo = document.getElementById('header-img');
logo.style.height = "80px";