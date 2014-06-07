// ==UserScript==
// @name            Bwtorrents popup blocker
// @version	    1.1
// @description     block tht annoying things
// @namespace       Doc Marco & die PC-Helfer <http://www.sdm-scholz.de>
// @author	    Ðð¢ M@rco PC-Træk
// @include         http://www.bwtorrents.com/*
// @copyright	    © Ðð¢ M@rco PC-Træk & die PC-Helfer
// @source          http://userscripts.org/scripts/show/62989
// @license         GNU General Public License GPLv3
// ==/UserScript==
/**
* This script is licensed  under:
* GNU General Public License GPLv3
* To view a copy of this license, visit http://www.gnu.org/licenses/gpl.html
* Thanks to: Rycochet vor the English translation
* Copyright © Doc Marco & die PC-Helfer, 2009-2010
* Initial script © Copyright Doc Marco & die PC-Helfer (aka Ðð¢ M@rco PC-Træk), 2009
**/

//alert ("start");
window.setTimeout(5000,bwstopper);
function bwstopper()
{
var topbar=document.getElementById("topbar")
topbar.style.visibility="hidden";
alert (topbar.style.visibility);
}
//alert (topbar.style.visibility);