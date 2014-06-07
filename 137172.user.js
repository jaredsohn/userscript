// ==UserScript==
// @name           Woman's Day - Automatically submit entries
// @description    Automatically submits entries for Woman's Day, assuming the form has already been filled out
// @version        1.0
// @author         nick761
// @include        http://www.womansday.com/sweepstakes/*
// ==/UserScript==

window.setTimeout(runScript, 1000);

function runScript() {
    document.getElementById('btn_submit').click();
}