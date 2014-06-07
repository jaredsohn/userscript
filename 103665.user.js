// 60 Second Songs
// version 0.1 BETA!
// 2011-05-27
// Copyright (c) 2011, Bryan Helmig
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Grooveshark Power Hour
// @namespace     http://bryanhelmig.com/
// @description   Goes to next song every 60 seconds
// @include       http://grooveshark.com/*
// ==/UserScript==

alert("Power hour starting!");
for (var i=1; i < 61; i++) { setTimeout("$('#player_next').click()", i*60*1000) };
      