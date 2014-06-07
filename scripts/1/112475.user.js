// ==UserScript==
// @name           Nix HuskyJobs Header
// @namespace      bdjnk.grease
// @description    Removes the huge unnecessary header from huskyjobs
// @include        https://washington-csm.symplicity.com/students/*
// ==/UserScript==

var main = document.getElementById('csm-wrap');
var tables = main.getElementsByTagName('table');
for ( var i=0; i<tables.length; i++ ) {
    var table = tables[i];
    if ( table.parentNode.id == 'csm-wrap') {
        table.parentNode.removeChild(table);
    }
}
var bad = document.getElementById('si_ei_wrap').previousElementSibling;
bad.parentNode.removeChild(bad);
