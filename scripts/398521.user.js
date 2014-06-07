// ==UserScript==
// @name			Game of Thrones Ascent Better Readability
// @namespace			http://userscripts.org/scripts/show/398521
// @description			Get better readability for Game of Thrones Ascent and don't worry about the correct number of required items for camp upgrading
// @include			*.disruptorbeam.com*
// @include			*apps.facebook.com/gamethrones*
// @include			*.kongregate.com/games/DisruptorBeam/game-of-thrones-ascent
// @grant			none
// @run-at			document-end
// @copyright			2014+, cattoaster
// @version			0.1.4
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* CHANGELOG
0.1.4 (3/07/2014)
	- set correct namespace 
0.1.4 (2/24/2014)
	- assigned font family for "reqcount" CSS class 

0.1.3 (2/23/2014)
	- initial release
	- adjusted to the new play symbol in the youtube title feature
	- adjusted to the current layout
	- small CSS edits for camp information, such as amount of items, silver, storage items
	- possible to edit ingame chat, uncomment but functional
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// ###
// ingame chat and activity
// edit color hex-value, font size and family and uncomment the following lines
//
// player chat messages: normal (dismissed bold) sans-serif fonts with clearer/brighter color, 
//addGlobalStyle('.pchat { color: #FCFCFC !important; font-weight: normal !important; font-family: sans-serif !important; font-size: 0.8em !important;}');
//
// chat activity
//addGlobalStyle('.pactivity  { color: #0CF !important; }');
//


// ###
// camp info
//
// amount of items is left-aligned, clearer/brighter color
addGlobalStyle('.reqcount  { width: initial !important; font-weight: normal !important; font-size: 0.8em !important; font-family: cambria,"times new roman",georgia,serif !important; color: #FFF !important; right: inherit !important; left: 2px !important; bottom: 1px !important;}');
addGlobalStyle('.reqcount.empty  { font-weight: normal !important; border: 1px solid #c00 !important;}');
//
// camp info (silver) is left-aligned, clearer/brighter colore
addGlobalStyle('.silveramt  { height: initial !important; font-weight: bold !important; font-family: cambria,"times new roman",georgia,serif !important; font-size: 0.9em !important; color: #fff !important; }'); 
addGlobalStyle('.silveramt.empty { border: 1px solid #c00 !important;}');
//