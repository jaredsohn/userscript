// ==UserScript==
// @name          SalesForce Nice Look
// @description   Prevents comments table from stretching
// @namespace     https://na3.salesforce.com/*
// @include       https://na3.salesforce.com/*
// @include       https://e2cp.na3.visual.force.com/*
// ==/UserScript==

setTimeout(
    function(){
        var cells = document.getElementsByClassName("dataCell");
        for (var i=0; i<cells.length; i++) {
            cells[i].style.wordBreak="break-all";
        }
    },10000);