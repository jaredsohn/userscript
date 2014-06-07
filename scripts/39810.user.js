// ==UserScript==
// @name           ca.org
// @namespace      javascript
// @description    removes massive black spam from conceptart.org
// @include        http://www.conceptart.org/forums/*
// @include        http://www.conceptart.org/*
// ==/UserScript==


var adSidebar = document.getElementById('thumbgrid');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}