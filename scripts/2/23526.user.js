// ==UserScript==
// @name           FluidBlip
// @namespace      http://filip.tepper.pl
// @include        http://blip.pl/dashboard
// @include        http://www.blip.pl/dashboard
// ==/UserScript==

if (window.fluid)
{
    var FB_unreadCount = 0;
    var FB_hasFocus = true;

    window.fluid.setDockBadge("");

    document.addEventListener('DOMNodeInserted', function(e)
    {
        if (typeof e.target.id !== 'undefined' && FB_hasFocus === false)
        {
            FB_unreadCount += 1;
            if (FB_unreadCount > 15)
            {
                FB_unreadCount = 15;
            }
            window.fluid.setDockBadge(FB_unreadCount.toString() + "");
        }
    }, true);

    window.onfocus = function(e)
    {
        FB_hasFocus = true;
        FB_unreadCount = 0;
        window.fluid.setDockBadge("");
    }

    window.onblur = function(e)
    {
        FB_hasFocus = false;
    }
}