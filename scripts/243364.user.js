// ==UserScript==
// @name        Doodle or Die confirmation
// @description Never send an unfinished doodle anymore!
// @namespace   http://mrqqn.net/
// @include     /^https?://doodleordie.com/play(\?|#)?/
// @version     1.0
// @grant       none
// ==/UserScript==
(function($)
{
    window.HoldAnimator =
    {
        gradient: function(color1, color2, angle)
        {
            return function(element)
            {
                var baseBackground = $(element).css("background-image");
                return function (progress)
                {
                    if(progress == 0)
                    {
                        $(element).css("background-image", baseBackground);
                    }
                    else
                    {
                        var opacity = Math.min(1, progress * 10);
                        var gradient = linearGradient(angle, [
                            {color: color1, position:0, alpha: opacity},
                            {color: color2, position:progress, alpha: opacity},
                            {color: color2, position:progress, alpha: 0},
                            {color: color2, position:1, alpha: 0}
                        ]);
                        $(element).css("background-image", gradient+", "+baseBackground);
                    }
                }
            }
        }
    };

    function linearGradient(angle, parts)
    {
        var angleStr = typeof angle == "string" ? angle : angle+"deg";

        function gradientPart(part)
        {
            var percentPosition = part.position*100;
            var alpha = part.alpha !== undefined ? part.alpha : 1;
            return cssRGBA(part.color, alpha)+" "+percentPosition+"%";
        }
        return "linear-gradient("+angleStr+", "+parts.map(gradientPart).join(", ")+")";
    }

    function cssRGBA(color, alpha)
    {
        var rgb = extractRGB(color);
        return "rgba("+rgb.r+","+rgb.g+","+rgb.b+","+alpha+")";
    }

    function extractRGB(color)
    {
        return {
            r: (color >> 16) & 0xFF,
            g: (color >> 8) & 0xFF,
            b: color & 0xFF
        };
    }

    $.fn.hold = function(options)
    {
        var defaults =
        {
            duration: 2000,
            animator: HoldAnimator.gradient(0xAA0000, 0xFF0000, "to right")
        };
        var settings = $.fn.extend({}, defaults, options);

        return this.each(function()
        {
            initHold(this, settings.duration, settings.animator);
        });
    }

    function initHold(element, duration, animator)
    {
        var startTime = null;
        var animationInterval = null;
        var activable = false;
        var animateCallback = animator(element);

        $(element)
            .off("click.holdPlugin")    .on("click.holdPlugin", function(){ return activable; })
            .off("mousedown.holdPlugin").on("mousedown.holdPlugin", startTimer)
            .off("mouseup.holdPlugin")  .on("mouseup.holdPlugin", cancelTimer)
            .off("mouseout.holdPlugin") .on("mouseout.holdPlugin", cancelTimer);

        function startTimer()
        {
            if(startTime === null)
            {
                activable = false;
                startTime = Date.now();
                animationInterval = setInterval(updateAnimation, 20);
                setAnimationProgress(0);
            }
        }

        function cancelTimer()
        {
            if(startTime !== null)
            {
                activable = false;
                startTime = null;
                clearInterval(animationInterval);
            }
            setAnimationProgress(0);
        }

        function updateAnimation()
        {
            var elapsedTime = Math.min(duration, Date.now() - startTime);
            setAnimationProgress(elapsedTime);
            if(elapsedTime == duration)
            {
                startTime = null;
                clearInterval(animationInterval);
                activable = true;
            }
        }

        function setAnimationProgress(elapsedTime)
        {
            var progress = Math.min(1, elapsedTime/duration);
            animateCallback(progress);
        }
    }

})(jQuery);

$(function(){

    function initSubmit()
    {
        $("input#submit").hold({
            duration: 2000,
            animator: HoldAnimator.gradient(0x91E842, 0xD2FF52, "to right")
        });
    }

    var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        initSubmit()
    });

    observer.observe($("div#game").get(0), {
        subtree: true,
        attributes: false,
        childList: true,
        characterData: false,
        attributeOldValue: false,
        characterDataOldValue: false
    });

});
