// ==UserScript==
// @name       Trello screen real estate optimizer
// @namespace  http://userscripts.org/scripts/show/394551
// @version    0.1
// @match      https://trello.com/*
// @copyright  2012+, Zoltan Nagy <abesto@abesto.net>
// @grant    GM_addStyle
// ==/UserScript==

GM_addStyle(".list { margin-top: 5px; }");

function updateSize() {
	var $board = $('#board'),
    	$listArea = $('.list-area');    
    $listArea.width($board.width());
}

setInterval(updateSize, 500);