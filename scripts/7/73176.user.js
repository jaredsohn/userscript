// ==UserScript==
// @name           KILLCHURCH
// @namespace      kc@kwierso.com
// @include        http://roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://captaindynamic.com/*
// @include        http://roosterteethcomics.com/*
// @include        http://achievementhunter.com/*
// ==/UserScript==

(function() {
    var addColl = document.getElementsByName("add");
    addColl[2].removeChild(addColl[2].getElementsByTagName("script")[0]);

})();