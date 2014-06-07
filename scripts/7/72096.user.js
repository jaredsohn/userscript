// ==UserScript==
// @name           UserVoice remover
// @namespace      big earl
// @description    Removes the UserVoice button at the side
// @include        http://www.schuelervz.net/*
// ==/UserScript==

var obj = document.getElementById('uservoice_link');
obj.style.visibility = 'hidden';