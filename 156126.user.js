// ==UserScript==
// @name       		iStock Grabber 
// @namespace  		http://joro.me/blog/
// @version    		0.1
// @description  	Opens a larger copy of the photo/illustration in a new window.
// @match      		http://www.istockphoto.com/stock-p*
// @match      		http://www.istockphoto.com/stock-i*
// @copyright  		2012+, Georgi Kalaydzhiev
// @require    		http://code.jquery.com/jquery-latest.js
// ==/UserScript==

jQuery.noConflict();
jQuery(document).ready( function() {
    var userScriptBarHTML = '<div id="istockgrabber"><p>Zoom, select size and...</p><a href="javascript:();">Grab Image</a></div>';
    
    var userScriptBarCSS = {
        'opacity' : '0',
        'margin' : '15px 0 0',
        'padding' : '10px 10px 12px',
        'border' : '1px solid #ccc',
        'font' : '700 16px/33px Arial, Tahoma, sans-serif',
        'background' : '#eee',
        'height' : '0',
        'width' : '360px'
    };
    
    var userScriptBarTextCSS = {
        'float' : 'left',
        'margin' : '0',
        'font' : '700 19px/37px Arial, Tahoma, sans-serif'
    }
    
    var userScriptBarButtonCSS = {
		'float' : 'right',
        'width' : '125px',
        'height' : '32px',
        'margin' : '0',
		'background' : '#2a98ed',
        'color' : '#fafafa',
        'text-shadow' : '0 1px 0 rgba(0, 0, 0, .3)',
        'font-weight' : 'bold',
        'text-align' : 'center',
        'text-decoration' : 'none',
        'border' : '1px solid #2473b0',
        'border-radius' : '4px',
        'box-shadow' : '0 1px 2px rgba(0, 0, 0, .3), inset 0 1px rgba(255, 255, 255, .25)'
    };
    
    var userScriptBarButtonHoverCSS = {
		'background' : '#4fabf3'
    };
    
    jQuery(userScriptBarHTML).appendTo('#file-preview').css(userScriptBarCSS).not(':animated').animate({opacity: '1', height: '32px'}, 300);
    jQuery("#istockgrabber > p").css(userScriptBarTextCSS);
    jQuery("#istockgrabber > a").css(userScriptBarButtonCSS);
    jQuery("#istockgrabber > a").hover( function() {
        jQuery(this).css(userScriptBarButtonHoverCSS);
    }, function() {
        jQuery(this).css(userScriptBarButtonCSS);
    });
    
    var iStockBaseURL = 'http://www.istockphoto.com';

    jQuery("#istockgrabber > a").on('click', function(){
        if (jQuery('#ZoomDraggableDiv > div[id^="s"]:visible').size() > 0) {
			var generatedURL = jQuery('#ZoomDraggableDiv > div[id^="s"]:visible > div:first-child img').attr('src');
            window.open(iStockBaseURL + generatedURL, '_blank');
        }
        else
            alert('Click on the image and select size!');
    });
    
});