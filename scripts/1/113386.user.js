// ==UserScript==
// @name           ESPN - Remove GameHQ - recover vertical space
// @namespace      userscripts.org
// @include        http://*espn.go.com/*
// ==/UserScript==
var scoreboard = document.getElementById('ootScoreboard');
scoreboard.parentNode.style.display = 'none';
