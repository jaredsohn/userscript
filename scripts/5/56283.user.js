// ==UserScript==
// @name           DoNotMerge
// @namespace      http://forums.goha.ru/*
// @description    Не объединять с предыдущим сообщением
// @include        http://forums.goha.ru/*
// ==/UserScript==

var ankName = document.getElementById('cb_merge_post');
ankName.checked = false;