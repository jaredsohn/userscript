// ==UserScript==
// @name           WoW Forums Automatic Title Renamer
// @namespace      Vux from USA-Dragonblight
// @description    Automatically removes the text "WoW Forums -> " from titles and tabs!
// @include        http://forums.worldofwarcraft.com/*
// ==/UserScript==

document.title = document.title.replace(/^WoW Forums -> /, '')
document.title = document.title.replace(/^WotLK Beta \(US-English\) Forums ->/, '')
document.title = document.title.replace(/^World of Warcraft \(English\) Forums ->/, '')