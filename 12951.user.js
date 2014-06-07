// ==UserScript==
// @name           Unity script reference title
// @namespace      http://gamepulp.com
// @description    Switch from "Unity Script Reference - Page title" to "Page title - Unity Script Reference"
// @include        http://unity3d.com/support/documentation/*
// @include        file:///Applications/Unity/Documentation/*
// ==/UserScript==

document.title = document.title.split(/ - | \u2013 /)[1];

//		/ - | \u2013 / => regex to get the title separator (" - ").
//		The manual and component reference use -, whereas the script reference
//		seems to use –, aka &ndash;, aka \u2013...

