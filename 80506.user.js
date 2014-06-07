// ==UserScript==
// @name           All Forums
// @namespace      All Forums
// @description    Adds all forums to the 'Community' dropdown menu.
// @include        http://*bungie.net/*
// ==/UserScript==

var gameForumsList = document.getElementsByClassName("flyOut").item(2).getElementsByTagName("li").item(9);
gameForumsList.innerHTML += '<ul><li><a href="/Forums/topics.aspx?forumID=304365">Halo: Reach</a></li><li><a href="/Forums/topics.aspx?forumID=304364">Halo 3: ODST</a></li><li><a href="/Forums/topics.aspx?forumID=105242">Halo 3</a></li><li><a href="/Forums/topics.aspx?forumID=6">Halo 2</a></li><li><a href="/Forums/topics.aspx?forumID=2">Halo 1 & 2 for PC</a></li><li><a href="/Forums/topics.aspx?forumID=7">Halo: Combat Evolved</a></li></ul>';