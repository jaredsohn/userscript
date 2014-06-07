// ==UserScript==
// @name           4shared contry search
// @namespace      4shared
// @description    activate contry filed in search form 
// @include        http://search.4shared.com/*
// ==/UserScript==
var elm =document.getElementById('countryfiled');
elm.disabled = 0;