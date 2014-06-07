// ==UserScript==
// @name        Podio Improver
// @namespace   http://codebuffet.co
// @description A better Podio for better people
// @include     https://podio.com/*
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==
$(function () {
    console.log('Podio Improver Inited: A better Podio for better people');
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    var debounce = function (a, b, c) {
        var d;
        return function () {
            var e = this,
            f = arguments;
            clearTimeout(d),
            d = setTimeout(function () {
                d = null,
                c || a.apply(e, f)
            }, b),
            c && !d && a.apply(e, f)
        }
    }
    var clampFrame = function ($f) {
        // Cache old height
        $f.get(0) .oldHeight = $f.height();
        $f.height(maxHeight);
        
        var shadowHeight = maxHeight / 2;
        
        $f.css('overflow', 'hidden');
        $f.css('position', 'relative');
        
        var $l = $($f.parent() .find('.frame-label:first'));
        var $shadow = $("<div class='shadow' style=\"background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.4)));background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.4) 100%);background: -o-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.4) 100%);background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.4) 100%);background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.4) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#66000000',GradientType=0 );-webkit-border-bottom-right-radius: 5px;-webkit-border-bottom-left-radius: 5px;-moz-border-radius-bottomright: 5px;-moz-border-radius-bottomleft: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;\" />");
        $shadow.css({
            overflow:'hidden',
            position:'absolute',
             width: $f.width(),
             height: shadowHeight + 'px',
             bottom: 0
        });
        $f.append($shadow);
        $f.mouseover(function () {
            var $this = $(this);
            $this.find(".shadow").stop().animate({
                opacity: 0
            });
            $this.stop() .animate({
                height: $this.get(0) .oldHeight
            });
        }) .mouseout(function () {
            var $this = $(this);
            $this.find(".shadow").stop().animate({
                opacity: 1
            });
            $this.stop() .animate({
                height: maxHeight
            });
        });
    }
    var newFrames = debounce(function () {
        // Grab all frames
        $frames = $('.frame-content');
        // Max height per frame is n.PX
        maxHeight = 100;
        for (var i = 0; i < $frames.length; i++) {
            $f = $($frames[i]);
            if (typeof $f.get(0) .podioClamped === 'undefined') {
                h = $f.height();
                if (h > maxHeight) {
                    if((h - maxHeight) > 20) {
                        console.log('Frame ' + i + ' (height: ' + h + ') exceeds maxHeight of ' + maxHeight);
                        clampFrame($f);
                        $f.get(0) .podioClamped = true;
                    }
                }
            }
        }
    }, 100);
    $(document) .bind('DOMSubtreeModified', newFrames);
});
