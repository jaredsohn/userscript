// ==UserScript==
// @name          Fix Youtube Share
// @description   Fixes YouTube Share
// @include http*://*youtube.com*
// @include http*://*youtu.be*
// @include http*://173.194.39.72*
// @author AbyssBG <tweeton@ymail.com>
// ==/UserScript==
	
/*
* Fix Youtube Share
* http://userscripts.org/scripts/show/151675
*/

document.getElementById('watch-share').click(); 
window.setTimeout(Pauza, 3000);

function Pauza(){
document.getElementById('watch-actions-share-panel').innerHTML = document.getElementById('watch-actions-share-panel').innerHTML.replace(/%26/g,'&');
};