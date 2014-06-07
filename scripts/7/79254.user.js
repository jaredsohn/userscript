// ==UserScript==
// @name            Colorschemedesigner - input color through URL
// @author          Jari Pennanen
// @version         0.8    
// @description     Access the "mono" setting faster by typing the color in #RRGGBB to URL, e.g. http://colorschemedesigner.com/#00FF00
// @include         http://colorschemedesigner.com/
// @match           http://colorschemedesigner.com/
// ==/UserScript==

if (document.location.hash.length == 7) {
    // Note: unsafeWindow.enterRGB2 does not work, it is not defined for some reason.
    location.href = "javascript:void(enterRGB2(document.location.hash.substring(1)));";
}
