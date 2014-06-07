// ==UserScript==
// @name          Confirm leave
// @namespace     em/lrdwhyt/leave
// @description   Script that prevents accidental suicides
// @include       http://www.epicmafia.com/game/*
// ==/UserScript==

var removee = document.getElementById('leavetable');
if (removee) {
removee.onmousedown = function() {
if (confirm('Leave table?') == false) {
return false;
}
};
}