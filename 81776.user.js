// ==UserScript==
// @name TVShack Notification Remover
// @description This script removes the boring, anoying and space wasting notification about a new domain.
// @include http://tvshack.cc/*
// @include http://www.tvshack.cc/*
// @include tvshack.cc/*
// @include tvshack.cc
// ==/UserScript==

window.setTimeout(function() { 
document.getElementById("palert").style.visibility="hidden";
}, 60);