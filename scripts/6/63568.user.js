// ==UserScript==
// @name            Twisty Sidebar Remover test
// @namespace       theVDude
// @description     Removes TwistyPuzzle's sidebar
// @include         http://twistypuzzles.com/forum/*
// @include         http://www.twistypuzzles.com/forum/*
// ==/UserScript==

var tds = document.getElementsByClassName('InnerLayoutSideboxes');
tds[0].parentNode.removeChild(tds[0]);