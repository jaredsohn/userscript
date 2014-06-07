// ==UserScript==
// @name           YouTube: Remember Quicklist
// @namespace      http://www.n-regen.bplaced.de
// @description    Changes the lifetime of the cookie that contains your YouTube-Quicklist to 1 year (or any other time you want).
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

// How many days do you want the quicklist to be kept?
var days = 365;


var divs = document.getElementsByTagName("div");
for (divi in divs)
{
    if (divs[divi].className == "addtoQL90")
    {
        divs[divi].addEventListener("mouseout", function()
            {
                document.cookie = "watch_queue=empty; expires=Wed, 20 Jul 1983 23:15:00 GMT;";
                var car = document.cookie.split("; ");
                for (cari in car)
                {
                    if (car[cari].split("=")[0] == "watch_queue")
                    {
                        var a = new Date();
                        a = new Date(a.getTime() + 1000*60*60*24*days);
                        document.cookie = car[cari] + "; expires=" + a.toGMTString()+";";
                    }
                }
            }, false);
    }
}
