// ==UserScript==
// @name       Drawception Wacom Tablet support (firefox)
// @author     Talon
// @namespace  http://drawception.com/player/204803/talon/
// @version    0.5
// @description  This tiny script enables you to use the pressure support of your Wacom Pen Tablet with firefox
// @match      http://drawception.com/play/*
// @match      http://drawception.com/sandbox/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* Wacom Support
-- made with code samples of http://www.wacomeng.com/web

// NOTES
-- maybe $('#drawingCanvas').mousemove(function(){ stops working in some rare cases.

// DISCLAIMER
-- This might be seen as cheating in some eyes, in mine it's giving the tablet back his full potential.
-- I'm not responsible what happens to your Drawception account when you use this script.
-- Use at your own risk!
*/

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

// basic variables on startup
var pointerSize = 12;
var usePressureSupport = false;
var useBrushSizeHotkeys = false;
$(document).ready(function(){

//adding the plugin
$('body').append('<object id="wtPlugin" type="application/x-wacomtabletplugin" WIDTH=1 HEIGHT=1 style="position:absolute; left:100px; top:100px"><!-- <param name="onload" value="pluginLoaded" /> --></object>');

// shortcut to the penAPI
function wt() {
    return document.getElementById('wtPlugin').penAPI;
}

// check on pressure change
function checkPressure() {
    $('.drawingForm')
        .mousemove(function (e) {
        if (usePressureSupport && wt()) {
            var brush = wt().pressure * pointerSize;
          try{  drawApp.setSize(brush);
} catch(err){
}
           $('#feedback .pressure')
                .css('width', wt().pressure * 120);
            if (wt().isWacom) {
                $('#feedback .status').html(Math.round(brush) + " / " + pointerSize);
            } else {
                $('#feedback .status').html('disconnected D:');
            }
        }
   });
}

// listeners on the brush sizes
$('#brush-2').click(function () {
    pointerSize = 2;
});
$('#brush-5').click(function () {
    pointerSize = 5;
});
$('#brush-12').click(function () {
    pointerSize = 12;
});
$('#brush-35').click(function () {
    pointerSize = 35;
});

$("body").keypress(function(e) {
    switch(e.keyCode){
        case 91: pointerSize--; break; // [
        case 93: pointerSize++; break; // ]
    }
    if(pointerSize <= 0) pointerSize = 1;
});

// and finally, lets add a button to turn this on and off at will
$('.drawingForm')
    .append('<button id="pressureToggle" style="float:right; color:red;">Pressure off</button>');

$('<div/>', {
    id: 'feedback',
    style: 'float:right; margin-top:1px; margin-right:3px; display:none; width:120px; height:22px; border:1px solid grey'
})
    .appendTo(".drawingForm");

$('<div/>', {
    class: 'pressure',
    style: 'width:0px; position:absolute; height:22px; background:lightgrey'
})
    .appendTo("#feedback");


$('<div/>', {
    class: 'status',
    style: 'position:absolute; width:120px; text-align:center;'
})
    .appendTo("#feedback");

$('#pressureToggle')
    .toggle(

        function () {
        
            checkPressure();
        
            $(this)
                .html('Pressure on')
                .css('color', "green");
            usePressureSupport = true;
        
            $('#feedback')
                .css('display', 'block');
        
        },
        
        function () {
        
            $(this)
                .html('Pressure off')
                .css('color', "red");
            usePressureSupport = false;
            try{ drawApp.setSize(pointerSize); } catch(err){}
        
        
            $('#feedback')
                .css('display', 'none');
            $('#feedback .pressure')
                .css('width', 0);
        });
});