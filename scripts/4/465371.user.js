// ==UserScript==
// @name        Uprocket
// @namespace   http://cratemuncher.net
// @include     http://reddit.com*
// @include     https://reddit.com*
// @include     http://*.reddit.com*
// @include     https://*.reddit.com*
// @version     1
// @grant       none
// ==/UserScript==

// jQuery plugin: 'flyOffPage'
// @description Selected element/'s will fly off page in random or pre-defined direction.
// @version 0.1
// @author James Padolsey
// @info http://james.padolsey.com/javascript/new-jquery-plugin-fly-off-page/

(function($,W,D){
    
    // Define all possible exit positions:
    var exitPositions = {
        top: function(el) {
            return {
                top: 0 - el.height(),
                left: el.offset().left
            };
        },
        topLeft: function(el) {
            return {
                top: 0 - el.height(),
                left: 0 - (el.width()/2)
            };
        },
        topRight: function(el) {
            return {
                top: 0 - el.height(),
                left: $(W).width() + (el.width()/2)
            };
        },
        left: function(el) {
            return {
                top: el.offset().top,
                left: 0 - el.width()
            };
        },
        right: function(el) {
            return {
                top: el.offset().top,
                left: $(W).width() + el.width()
            };
        },
        btmLeft: function(el) {
            return {
                top: getWindowHeight() + el.height(),
                left: 0 - (el.width()/2)
            };
        },
        btmRight: function(el) {
            return {
                top: getWindowHeight() + el.height(),
                left: getWindowHeight() + (el.width()/2)
            };
        },
        btm: function(el) {
            return {
                top: getWindowHeight(),
                left: el.offset().left
            };
        }
    };
    
    function getWindowHeight() {
        return W.innerHeight || $(window).height();   
    }
    
    function randDirection() {
        
        var directions = [],
            count = 0;
        
        // Loop through available exit positions:
        for (var i in exitPositions) {
            // Push property name onto new array:
            directions.push(i);
            count++;
        }
        
        // Return random directions property (corresponds to exitPositions properties):
        return directions[ parseInt(Math.random() * count, 10) ];
    
    }
    
    function prepareOverflow() {
        
        // The various overflow settings will be set to hidden,
        // but only if it does not conflict with the current document:
        var oX = $(D).width() <= $(W).width(),
            oY = $(D).height() <= $(W).height(),
            oR = oX && oY;
        oX && $('body').css('overflow-x','hidden');
        oY && $('body').css('overflow-y','hidden');
        oR && $('body').css('overflow','hidden');
        
    }
    
    function flyElement(s) {
        
        // Main functionality of plugin:
        
        // Create shortcut to element:
        var el = $(this),
        
            // Handle random direction:
            direction = s.direction.toLowerCase() === 'random' ? randDirection() : s.direction,
        
            // New objext: Tweens - All tweens, including user-defined ones and ours:
            // (Gives our tweens precedence):
            tweens = $.extend(s.tween, exitPositions[direction](el)),
            
            // Define all properties associated with layout/position:
            positionProps = 'position,left,top,bottom,right,width,height,paddingTop,paddingRight,paddingBottom,paddingLeft,marginTop,marginRight,marginBottom,marginLeft,zIndex,overflow,clip,display',
            // New element: clone of original (remove unique identifier):
            // (Must re-apply all layout styles because the ID may have been CSS hook):
            clone = $(el.clone())
                        .removeAttr('id')
                        .attr('id', 'replaced-element-' + (+new Date()))
                        .css((function(){
                            // Loop through each position/layout property
                            // and return object containing all:
                            var props =  positionProps.split(','),
                                length = props.length,d
                                styles = {};
                            while(length--) { styles[props[length]] = el.css(props[length]); }
                            return styles;
                        })());
        
        // Prepare document overflows:
        prepareOverflow();
        
        
        $(el)
            
            // Style new element:
            .css({
                left: tweens.left ? el.offset().left : null,
                top: tweens.top ? el.offset().top : null,
                position: 'absolute',
                zIndex: 999,
                width: el.outerWidth(),
                height: el.outerHeight()
            })
            
            // Animate using collective 'tweens' object:
            .animate(tweens, s.duration, 'easeInCubic', function(){
                // On comepletion, remove the animated element:
                el.remove(); 
            })
            
            .filter(function(){
                // Filter:
                // (will only continue with chain if user set 'retainSpace' to true)
                return !!s.retainSpace;
            })
            
            // Insert clone before original element: (make clone invisible)
            .before($(clone).css('opacity',0));

            if (s.retainSpace && typeof s.retainSpace === 'object') {
                $(clone).animate(s.retainSpace, s.duration, function(){
                    $(this).remove();
                });
            }
        
    }
    
    // Expose functionality to jQuery namespace:
    $.fn.flyOffPage = function(userDefinedSettings) {
        
        // Define settings
        var s = $.extend({
            direction: 'random',
            tween: {},
            retainSpace: true,
            duration: 500
        }, userDefinedSettings);
        
        // Initiate:
        return this.each(function(){
            flyElement.call(this,s);
        });
        
    };
    
})(jQuery,window,document);

jQuery.extend( jQuery.easing,
{
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	}
});

// The actual code

$(document).on("click",".upmod",function(){
	if ($(this).attr('class').indexOf('upmod') > -1) {
        $(this).flyOffPage({
            duration: 2500,
            retainSpace: true,
            direction: "top"
        });
    }
});