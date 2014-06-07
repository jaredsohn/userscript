// ==UserScript==
// @name        Grepolis Zoom
// @namespace   grepolis_zoom
// @include     http://*.grepolis.*/game*
// @icon http://s3.amazonaws.com/uso_ss/icon/414913/large.png?1394989662
// @version     0.1.56
// @grant       none
// ==/UserScript==

var uwd = unsafeWindow || window, $ = uwd.jQuery, GZM = {
    loaded: false,
    scale: 1.00,
    interval: false,
    zoom: function(e, delta) {
        
        delta = delta || e.detail || e.wheelDelta;
        
        if (!delta) {
           return true;   
        }
        
        clearInterval(GZM.interval);

        
        var m = $('#wmap'),
            d = .02 * delta, 
            w = m.parent().width(), 
            h = m.parent().height();
        
        GZM.scale += d;
        
        if (parseFloat(GZM.scale) > 1.3) GZM.scale = 1.3;
        if (parseFloat(GZM.scale) < .4) GZM.scale = .4;
        
        m.css({
            'scale': 'scale(' + GZM.scale + ')',
            '-moz-transform': 'scale(' + GZM.scale + ')',
            '-webkit-transform': 'scale(' + GZM.scale + ')',
            '-ms-transform-origin': '0 0',
            '-webkit-transform-origin': '0 0',
            '-moz-transform-origin': '0 0',
            '-o-transform-origin': '0 0',
            'transform-origin': '0 0',
            'width': w / GZM.scale,
            'height': h / GZM.scale
        });

        GZM.interval = setInterval(function(){
           $(document).trigger('resize');
        }, 500);
        
        e.preventDefault();
    },
    load: function() {
        if (!GZM.loaded) {

            $(document).bind('DOMMouseScroll mousewheel', GZM.zoom);
            $(document).bind('keyup', function(e) {
                switch(e.keyCode) {
                    case 107:
                        GZM.zoom(e, 1);
                        break;
                    case 109:
                        GZM.zoom(e, -1);
                        break;
                }
            });            

            GZM.loaded = true;
        }
    }
};

$(document).ajaxComplete(GZM.load);