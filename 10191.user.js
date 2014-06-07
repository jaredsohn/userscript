// ==UserScript== 
// @name           Google SnapShots Preview
// @namespace      http://userscripts.org/scripts/source/10191.user.js
// @description    snap.com previews on google
// @version        0.2
// @include        *.google.*search?*
// ==/UserScript==
var insthere = document.getElementById('nn');
if (!insthere){
	var insthere = document.getElementById('logo');
}
if (insthere) {
var shots = document.createElement("script");
shots.defer = "defer";
shots.id="snap_preview_anywhere";
shots.type="text/javascript";
shots.src="http://shots.snap.com/ss/7d5bc8ff1c4cbf946dc131d5b42ebae5/snap_shots.js";
insthere.parentNode.insertBefore(shots, insthere.nextSibling);
}