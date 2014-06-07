// ==UserScript==
// @name            pownce reload page
// @description     reload pownce pages
// @include         http://pownce.com/*
// @include         http://*.pownce.com/*
// @exclude         http://*.pownce.com/settings/
// @exclude         http://pownce.com/settings/

// ==/UserScript==

var time = 60000;

window.setTimeout(
    function(){ window.location.reload(); }, time
);
