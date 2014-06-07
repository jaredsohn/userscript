// ==UserScript==
// @name       Drawception Wacom Tablet support
// @author     Talon
// @namespace  
// @version    0.10
// @description  This tiny script enables you to use the pressure support of your Wacom Pen Tablet
// @match      http://drawception.com/play/*
// @match      http://drawception.com/sandbox/
// @exclude    http://drawception.com/play/panel/*
// @match      https://drawception.com/play/*
// @match      https://drawception.com/sandbox/
// @exclude    https://drawception.com/play/panel/*
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
console.log('this is chrome: '+is_chrome);

if(!is_chrome){
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

}

(function(){
    
    if(typeof unsafeWindow == 'undefined'){ 
    unsafeWindow = window;
    }
// Since jQuery is already loaded, lets use it
$ = unsafeWindow.jQuery;
var drawApp = unsafeWindow.drawApp;

// basic variables on startup
var pointerSize = 12;
var brushColor = 1;
var usePressureSupport = false;
var useBrushSizeHotkeys = false;
var eraserActive = false;
var cursorStr = 'url(http://www.thekohrs.net/dc/cursor/12.png) 5 5';
var mouseX = 0;
var mouseY = 0;
var selectedColor = "#000000";

//adding the plugin
$('body')
    .append('<object id="wtPlugin" type="application/x-wacomtabletplugin" WIDTH=1 HEIGHT=1 style="position:absolute; left:100px; top:100px"><!-- <param name="onload" value="pluginLoaded" /> --></object>');

// shortcut to the penAPI
function wt() {
    return document.getElementById('wtPlugin').penAPI;
}

// check on pressure change
function checkPressure() {
    $('.drawingForm')
        .mousemove(function (e) {
        if (usePressureSupport) {
            var brush = wt().pressure * pointerSize;
            drawApp.setSize(brush);
            drawBrush(brush, pointerSize);
            $('#feedback .pressure').css('width', Math.round(wt().pressure * 120)).parent().find('.status').html(brush.toFixed(1) + " / " + pointerSize);
            //console.log($('#feedback .pressure').css('width'));
            
            mouseX = e.pageX - drawApp.canvas.offset().left;
            mouseY = e.pageY - drawApp.canvas.offset().top;
            
            // eraser support
            if(wt().isEraser){
                eraserActive = true;
                $($('.colorPicker').get(16)).click();
            } else if(eraserActive){
                eraserActive = false;
                $($('.colorPicker').get(brushColor)).click();
            }
        }
    });
}

// listeners on the brush sizes
$('#brush-2').click(function () {
    pointerSize = 2;
    //setBrushCursor();
    drawBrush(1, pointerSize);
});
$('#brush-5').click(function () {
    pointerSize = 5;
    //setBrushCursor();
    drawBrush(1, pointerSize);
});
$('#brush-12').click(function () {
    pointerSize = 12;
    //setBrushCursor();
    drawBrush(1, pointerSize);
});
$('#brush-35').click(function () {
    pointerSize = 35;
    //setBrushCursor();
    drawBrush(1, pointerSize);
});





$('#drawingCanvas').bind("mousedown", handleMouseDown, !1);
$('#drawingCanvas').css('cursor', cursorStr);

function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.cursor = cursorStr;
}
    
    $('.colorPicker').click(function(){
       selectedColor = $(this).attr('data-color');
    });    
/*
var clHotkeys = ['q', '1', 
                 'w', '2', 
                 'e', '3', 
                 'r', '4', 
                 't', '5', 
                 'y', '6', 
                 'u', '7', 
                 'i', '8', 
                      '0'];

$('.colorPicker').each(function(i){
    $(this).append('<span style="display:inline-block; font-size:9px; position:relative; left:12px; top:2px; text-shadow:1px 1px 0px #000; color:white;">'+clHotkeys[i]+'</span');
});
*/
/* BROKEN
$(window).keypress(function(e) {
    var drawApp = drawApp;
    var brcl= brushColor;
    switch(e.keyCode){
        case 91: pointerSize--; setBrushCursor(); break; // [
        case 93: pointerSize++; setBrushCursor(); break; // ]
        case 48: drawApp.setColor('#fffdc9'); brushColor = 16; break; // 0 - eraser
        case 49: drawApp.setColor('#000'); brushColor = 1; break; // 1 - black
        case 50: drawApp.setColor('#FFFFFF'); brushColor = 3; break; // 2 - white
        case 51: drawApp.setColor('#c69c6d'); brushColor = 5; break; // 3 - light brown
        case 52: drawApp.setColor('#FF0000'); brushColor = 7; break; // 4 - red
        case 53: drawApp.setColor('#FF6600'); brushColor = 9; break; // 5 - orange
        case 54: drawApp.setColor('#0fad00'); brushColor = 11; break; // 6 - green
        case 55: drawApp.setColor('#0247fe'); brushColor = 13; break; // 7 - blue
        case 56: drawApp.setColor('#8601af'); brushColor = 15; break; // 8 - purple
        //case 57: drawApp.setColor('#444444'); break; // 9 - xxxxxxxxxxx
            
        case 113: drawApp.setColor('#444444'); brushColor = 0; break; // q - dark grey
        case 119: drawApp.setColor('#999999'); brushColor = 2; break; // w - light grey
        case 101: drawApp.setColor('#603913'); brushColor = 4; break; // e - brown
        case 114: drawApp.setColor('#FFDAB9'); brushColor = 6; break; // r - peach
        case 116: drawApp.setColor('#FFD700'); brushColor = 8; break; // t - yellow
        case 121: drawApp.setColor('#16ff00'); brushColor = 10; break; // y - lime
        case 117: drawApp.setColor('#00FFFF'); brushColor = 12; break; // u - cyan
        case 105: drawApp.setColor('#ec008c'); brushColor = 14; break; // i - damn hot pink
       // case 111: drawApp.setColor('#444444'); break; // o - xxxxxxxxxxx
       // case 112: drawApp.setColor('#444444'); break; // p - xxxxxxxxxxx

        default: console.log(e.keyCode);
    }
    if(pointerSize <= 0) pointerSize = 1;
    if(brcl != brushColor){
        $(".colorPicker").removeClass("selected");
        $($('.colorPicker').get(brushColor)).addClass("selected");
    }
});
*/

// and finally, lets add a button to turn this on and off at will
    $('<canvas id="brushCanvas" width="50" height="50" style="float:right; display:none; margin-top:1px; margin-right:3px; border:1px solid grey"></canvas>')
    .appendTo(".drawingForm");
    
    
    
    var bcs = $('#brushCanvas')[0];
    var bc = $('#brushCanvas')[0].getContext("2d");
    
    function drawBrush(size, maxsize){
        for(var i=0; i<1;i++){
            bc.clearRect(0,0,50,50);
            
            if(i == 1) {
                bc.drawImage(drawApp.canvas[0], -mouseX+25, -mouseY+25);
            }
            if(size != maxsize){
            bc.fillStyle = selectedColor;
            bc.strokeStyle = (selectedColor == "#FFF" ? '#000000' : '#FFF');
            bc.beginPath();
            
            bc.arc(25, 25, size/2, 0, Math.PI*2, true);
            bc.closePath();
            if(size < 2) bc.fill();
            bc.stroke();
            }
            
            bc.strokeStyle = '#FFF';
            bc.beginPath();
            bc.arc(25, 25, (maxsize+2)/2, 0, Math.PI*2, true);
            bc.closePath();
            bc.stroke();
            
            bc.strokeStyle = (size == maxsize ? '#ff0000' : '#000000');
            bc.beginPath();
            bc.arc(25, 25, maxsize/2, 0, Math.PI*2, true);
            bc.closePath();
            bc.stroke();
            
            if(i == 0){
                cursorStr = 'url('+bcs.toDataURL('image/png')+') 24 24,none';
                $('#drawingCanvas').css('cursor', cursorStr);
            }
        }
    }
    
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
            drawBrush(1, pointerSize);
            
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
            drawApp.setSize(pointerSize);
        
        
            $('#feedback')
                .css('display', 'none');
            $('#feedback .pressure')
                .css('width', 0);
        });
    drawBrush(1, pointerSize);
})();