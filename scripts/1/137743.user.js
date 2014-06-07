// ==UserScript==
// @name          Stackoverflow favicon counter
// @author        Sergey Shchur aka antyrat (http://stackoverflow.com/users/186535/antyrat)
// @description   Adds unread questions counter to favicon
// @include       http://www.stackoverflow.com/questions/tagged/*
// @include       http://stackoverflow.com/questions/tagged/*
// @version       1.0
// ==/UserScript==

// insert jQuery to the script
var script = document.createElement( "script" );
script.type = "text/javascript";
script.textContent = "(" + addFaviconCounter.toString() + ")( jQuery )";
document.body.appendChild( script );

function addFaviconCounter( $ ) {

    // get title tag
    var titleElement = document.getElementsByTagName("title")[0];

    if (document.documentElement && document.documentElement.addEventListener) {
	
	    // attach to DOMSubtreeModified event. So we can listen to <title> change
        document.documentElement.addEventListener("DOMSubtreeModified", function(e) {
    
            var changedElement = e.target; // get current element that has been changed
			
            if (changedElement === titleElement || ( changedElement.parentNode && changedElement.parentNode === titleElement ) ) {

                var titleValue = titleElement.innerText.match(/^\((\d+)\)/), // trying to get counter value
                  faviconURL = 'http://cdn.sstatic.net/stackoverflow/img/favicon.ico'; // path to stackoverflow default favicon
                  
                if( titleValue ) {
                    var counterValue = ( titleValue[1] > 99 ) ? '\u221E' : titleValue[1], // get counter value (we show infinity symbol if counter excided 99 value)
                      canvas = document.createElement("canvas"), // create canvas element to draw favicon
                      ctx = canvas.getContext('2d'),
                      faviconImage = new Image(); // tmp image for original favicon

                    canvas.width = 16;
                    canvas.height = 16;

                    faviconImage.onload = function() {
                        // draw original favicon
                        ctx.drawImage(faviconImage, 0, 0);
                        
                        // draw counter rectangle holder
                        ctx.beginPath();
                        ctx.rect( 6, 6, 16, 10 );
                        ctx.fillStyle = "#FF9900";
                        ctx.fill();
                        
                        // copunter font settings
                        ctx.font = "10px Normal Tahoma";
                        ctx.fillStyle = "#000000";
                        
                        // get counter metrics
                        var metrics = ctx.measureText(counterValue );
                          counterTextX = ( metrics.width == 10 ) ? 6 : 9, // detect counter value position
                          
                        // draw counter on favicon
                        ctx.fillText( counterValue , counterTextX , 15, 16 );
                        
                        // append new favicon to document head section
                        faviconURL = canvas.toDataURL();
                        $('link[rel$=icon]').remove();
                        $('head').append( $('<link rel="shortcut icon" type="image/x-icon" href="' + faviconURL + '"/>' ) );                        
                        
                    }
                    faviconImage.src = faviconURL; // create original favicon
                }  else {
                    // if there is no counte value we draw default favicon
                    $('link[rel$=icon]').remove();
                    $('head').append( $('<link rel="shortcut icon" type="image/x-icon" href="' + faviconURL + '"/>' ) );                
                }
            }
        }, false);
    }	
}