// ==UserScript==
// @name	Wikia Mobile skin mod
// @version       0.1
// @description	Adds buttons to the header
// @include	*http://*.wikia.com/*
// ==/UserScript==
//Wow, it looks disgusting :P
function addOasisToolbarButtons () {
   if (skin == 'wikiaphone) {
$('<a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit" title="Edit this Page" class="wikia-button secondary">Edit</a>&nbsp;<a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=history" title="History of this Page" class="wikia-button secondary">History</a>&nbsp;<a href="/wiki/Special:MovePage/'+encodeURIComponent(wgPageName)+'" title="Move this Page" class="wikia-button secondary">Move</a>&nbsp;<a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=purge" title="Purge this Page" class="wikia-button secondary">Purge</a>').appendTo('#mobile-header');
break;
}
}