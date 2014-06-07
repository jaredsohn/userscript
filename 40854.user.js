// ==UserScript==
// @name           Sensible WoW Forums
// @namespace      Sensible
// @description    Removes extraneous "WoW Forums..." from title. Credit to previous.
// @include        http://forums.worldofwarcraft.com/*
// ==/UserScript==

document.title = document.title.replace(/World of Warcraft - English \(NA\) Forums -> /, 

'')