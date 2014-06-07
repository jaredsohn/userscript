//
// ==UserScript==
// @name          Spiceworks Ad and Community Remover
// @namespace     Spiceworks Ad and Community Remover
// @description   Remove ads, community content and enable full width
// @include       http://localhost:*/*
// ==/UserScript==

(function() {
    document.getElementById('content_wrapper').style.paddingRight = 0;
	document.getElementById('sidebar').style.display = 'none';
	document.getElementById('community-content').style.display = 'none';
})();