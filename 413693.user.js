// ==UserScript==
// @name          DragonzCity-Wide
// @description   Enjoy Dragon City as wide-screen!
//
// @namespace    Doyousketch2
// date          March 15, 2014
// @version      0.5
//
// @grant      GM_info
// @grant      GM_getValue
// @grant      GM_setValue
// @grant      GM_xmlhttpRequest
// @grant      GM_registerMenuCommand
//
// @match        https://apps.facebook.com/dragoncity*
// @include      *dc-canvas.socialpointgames.com*
// @require      http://sizzlemctwizzle.com/413693.js
// @require      http://code.jquery.com/jquery-2.1.0.min.js
//
// @copyright     (c) 2014 USA, Doyousketch2 (TM)
// Released under the GNU General Public License, version 3 (GPL-3.0)
// https://gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

// Remove stuff at top
$('div#notice') .remove();
$('div#crosspromotion') .remove();
$('div#offer-banner') .remove();
$('div#progressbar') .css('height','28px');
$('div#progressbar') .css('background','none');
$('div#progressbar a.link-ios') .remove();
$('div#progressbar iframe#fb-mobile') .remove();

// Remove stuff at right
$('div#rightCol') .remove();

// Increase size
$('div#flashtab') .css('height','830px');

// Remove stuff at bottom
$('div#footer div.banner') .remove();