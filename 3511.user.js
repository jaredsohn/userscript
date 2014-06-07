// ==UserScript==
// @name          Eurogamer Tidy
// @namespace     http://insin.woaf.net
// @description   Tidies up the redesigned eurogamer.net
// @include       http://eurogamer.net/*
// @include       http://www.eurogamer.net/*
// @include       http://195.157.98.220/*
// ==/UserScript==

(
    function()
    {
        GM_addStyle("#banner, #extra, #toolBar, div.mpuAd, i.comC, p.nologinComments { display: none; }\n#browserMaster { margin: -26px auto 0 auto; width: 800px; }");
    }
)();