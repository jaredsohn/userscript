// ==UserScript==
// @name          etradeUncenter
// @namespace     http:www.tranzoa.net/~alex
// @description	  Puts etrade pages on the left so wide pages don't need to be side-scrolled so aggressively.
// @include       https://*.etrade.com/*
// ==/UserScript==
//
//      February 4, 2006        bar         http://www.tranzoa.com  alex_greasemonkey __ tranzoa.com
//
//

(function()
{
    var n = document.getElementById("etContainer");

    if (n)
    {
        /***
            Note !!!! This code to replace any 'float: ....' value in the DIV's style is untested
                      (and I've not even done regx's in Javascript before).
                      At script coding time, the DIV had no style attribute.
        ***/

        var a       = n.getAttribute('style');
        if (!a)
        {
            a   = "";
        }
        else
        {
            a  += ";"

            r       = /^\s*float\b[^;]+/i
            a.replace(r, "");
            r       = /;\s*float\b[^;]+/i
            a.replace(r, "");
        }

        n.setAttribute("style", a + "float: left");
    }

})()



/* eof */
