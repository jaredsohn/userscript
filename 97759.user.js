// ==UserScript==
// @name           Resize Website Width
// @namespace      ch.acidburns
// @include        *
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var moving = false, mx, el, sw, ctrl;

function startResize(e)
{   
    if (ctrl) {
        moving = true;
        mx = e.pageX;
        sw = $(el).width();
        
        // get inverted background-color
        var rgb = $(el).css('background-color');
        var re = /(\d+)/g;
        invRgb = rgb.replace(re, function() {
            return 255 - RegExp.$1;
        } );
            
        
        $(el).css('border', 'dashed ' + invRgb)
             .css('border-width', '0px 1px')
             .css('margin', '0 auto');
        $('html').css('cursor', 'col-resize');
    }
}
function stopResize(e)
{
    moving = false;
    $(el).css('border', 'none');
    $('html').css('cursor', 'auto');
}
function moveResize(e)
{   
    if (moving) {
        var w = sw - (mx - e.pageX);
        window.status = w;
        $(el)
        .width( w )
        .css('max-width', w);
        
        //stop selecting text
        window.getSelection().collapse(document,0);
      
        $('pre').css('white-space', 'pre-wrap');
    }
} 

function keyPress(e)
{
    if (17 == e.which) {
        switch (e.type) {
            case 'keydown':
                ctrl = true;
                break;
            case 'keyup':
                ctrl = false;
                break;
        }
    }
}

$(document).ready( function() {
    el = $('body')
    .mousedown( startResize );
    
    $(window)
    .mouseup( stopResize )
    .mousemove( moveResize )
    .keydown( keyPress )
    .keyup( keyPress );
} );