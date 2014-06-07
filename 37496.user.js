// ==UserScript==
// @name           420chan Menu Stay-at-Top-of-Page
// @namespace      wikked.info
// @description    Forces the 420chan Menu to stay at the top of the page, instead of the top of the window.
// @include        http://*.420chan.org/*
// ==/UserScript==

var mainFunc = function()
{
    var divs = document.getElementsByTagName("div");
    var tofind = 2;
    for (i = 0; i < divs.length; i++)
    {
        if (divs[i].className == "globalmenu")
        {
            divs[i].style.position = "absolute";            
            tofind--;
            continue;
        }
        if (divs[i].className == "vertical")
        {
            divs[i].style.position = "absolute";            
            tofind--;
            continue;
        }
        if (tofind <= 0)
        {
            break;
        }
    }
}
//window.addEventListener("load", mainFunc, true);
mainFunc();
