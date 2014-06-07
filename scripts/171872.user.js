// ==UserScript==
// @name          Codecademy: Relocate instructions to top of pane
// @namespace     http://lawrencealan.com
// @description	  move the instructions to the top
// @author        lawrencealan
// @homepage      http://lawrencealan.com
// @version		  2013.06.25.01
// @require 	  http://code.jquery.com/jquery-1.10.0.js
// @include       http://codecademy.com/*
// @include       https://codecademy.com/*
// @include       http://*.codecademy.com/*
// @include       https://*.codecademy.com/*
// @run-at        document-start
// ==/UserScript==

$(function(){
    $(".lesson-left-bar").on("DOMSubtreeModified", function() { run_steps(this); });
});

function run_steps(p) {
    var ins = $('.lesson-checkpoint__instructions'); 
    if($(ins).is('.mod')) return; 
     $(ins).addClass('mod');
    if (ins.length>0) {
        ins.parent().prepend(ins); 
        ins.css({ marginTop: "-1px", paddingTop: "15px" });
    }
    
    // a fix for the completed ribbon
    var ribbon = $('.lesson-completed-ribbon');
    if(ribbon.length>0) {
        ribbon.css({height: 32});
    }
    
}