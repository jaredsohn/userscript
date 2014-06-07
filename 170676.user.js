// ==UserScript==
// @name        HF Group Notice Remover
// @namespace   http://www.sublyme.net
// @description This is a test script to remove the Group Leader notice that bugs Cryptic.
// @include     *hackforums.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     0.5
// ==/UserScript==

function groupAlertRemover2(){
    $(".pm_alert:contains('pending group membership join request')").hide();
}

function main(){
    groupAlertRemover2();
}

main()