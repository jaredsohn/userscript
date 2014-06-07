// ==UserScript==
// @name           Imagebam.com adult warning remover
// @namespace      Wjb
// @description    Removes the adult warning and doesn't show the popup ad
// @include        http://*.imagebam.com/image/*
// @include        http://imagebam.com/image/*
// ==/UserScript==

var background = document.evaluate('/html/body/div[@id="overlayBg"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var confirm = document.evaluate('/html/body/div[@id="ajax_load_indicator"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if(background.snapshotLength == 1)
	background.snapshotItem(0).style.display = 'none';

if(confirm.snapshotLength == 1)
	confirm.snapshotItem(0).style.display = 'none';
