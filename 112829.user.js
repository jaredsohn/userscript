// Ultibot's Confirm Navigate Away
// Copyright (c) 2011, Ultimater at gmail dot com 
// You can reach me at the above email address if you have inquiries regarding this script
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html
// http://www.gnu.org/licenses/gpl.html

// ==UserScript==
// @name	Ultibot's Confirm Navigate Away
// @namespace	http://ultimater.net/kol/public/namespaces/confirm-navigate-away
// @description	User must confirm if they want to navigate away from KoL
// @include	http://www*.kingdomofloathing.com/game.php

// @include	http://localhost:*/game.php

// @include	http://127.0.0.1:*/game.php
// @license	GNU-GPL http://www.gnu.org/licenses/gpl.html
// @version	1.0

// ==/UserScript==

unsafeWindow.onbeforeunload=function()
{
	var str="You have attempted to leave the KoL website.\n"
		+"You will lose your chat messages and any unsaved changes in pages you may have open.";
	return str;
}