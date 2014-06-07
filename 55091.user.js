// ==UserScript==
// @name           RT - Remove navbar spaces
// @namespace      rtrns@kwierso.com
// @include        http://roosterteeth.com/*
// @include        http://roosterteethcomics.com/*
// @include        http://redvsblue.com/*
// @include        http://achievementhunter.com/*
// @include        http://strangerhood.com/*
// ==/UserScript==

(function() {
    var buttonholder = document.getElementById("searchTd").parentNode.getElementsByTagName("table")[0].getElementsByTagName("td")[0];
    buttonholder.innerHTML = buttonholder.innerHTML.replace(/&nbsp;/g, "");
    buttonholder.innerHTML = buttonholder.innerHTML.replace(/  /g, "");
})();
