// ==UserScript==
// @name           The Student Room De-Default-Anoner (Global)
// @description    If you post as anon once, you automatically are anon by default. This script changes it back so you are not anon by default.
// @author         Robert Humphries
// @include        http://www.thestudentroom.co.uk/*
// @version        1.0
// ==/UserScript==

var anon_box = document.getElementById('cb_anonymous');
if(typeof anon_box != 'undefined'){
    if(anon_box.checked){
        anon_box.checked =false;
    }
}