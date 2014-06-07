// ==UserScript==
// @name           420chan Menu Fix
// @namespace      wikked.info
// @description    The menu bar on 420chan.org stays stuck open sometimes. I think this script fixes that.
// @include        http://*.420chan.org/*
// ==/UserScript==

var mainFunc = function()
{
    var divs = document.getElementsByTagName("div");
    var div = null;
    for (i = 0; i < divs.length; i++)
    {
        if (divs[i].className == "globalmenu")
        {
            div = divs[i];
            break;
        }
    }
    if (div != null)
    {
        var mouseoutFunc = function() {
            // emulates wakaba's show(''); function
            for (var i = 1; i<=50; i++) 
            {
                if (document.getElementById('tmenu'+i)) {
                    document.getElementById('tmenu'+i).style.display='none';
                }
                if (document.getElementById('smenu'+i)) {
                    document.getElementById('smenu'+i).style.display='none';
                }

            }
        };
        div.addEventListener("mouseout", mouseoutFunc, true);
    }
}
//window.addEventListener("load", mainFunc, true);
mainFunc();