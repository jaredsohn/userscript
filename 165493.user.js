// ==UserScript==
// @name Fullscreen Ingress Intel Map
// @version 1.02
// @description See the Ingress Intel Map in Fullscreen
// @include http*://www.ingress.com/intel*
// @match http*://www.ingress.com/intel*
// @copyright 2013, Filoozom
// ==/UserScript==

var style = 0;
var $ = unsafeWindow.jQuery;
var map = unsafeWindow.a.q;

event_map = setInterval(function() {
    if(typeof map != 'undefined') {        
        map.setOptions({
            streetViewControl: false,
            zoomControl: false
        });
        
        clearInterval(event_map);
    }
}, 50);

event_style = setInterval(function() {
    if((style += $('.gmnoprint:not(:hidden)').hide().length + $('#snapcontrol:not(:hidden)').hide().length + $('#[src$="google_white.png"]:not(:hidden)').hide().length) >= 5) {
        clearInterval(event_style);
    }
}, 50);

$('#header').hide();
$('#map_canvas > div > div:not(:first)').hide();
$('#dashboard_container > div:not(:first)').hide();

$('#dashboard_container').css({
	'width': '100%',
	'height': '100%',
	'border': '0',
	'top': '0',
	'bottom': '0',
	'left': '0',
	'right': '0',
    'margin-bottom': '0'
});

$('body').css({
    'min-width': '0',
    'min-height': '0'
});

$('#geotools').show();
$('#geotools').css({
	'top': '5px',
	'left': '10px',
    'right': '0'
});