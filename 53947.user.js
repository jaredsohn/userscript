// ==UserScript==
// @name           Bigcharts for EeePc
// @namespace      http://userscripts.org
// @description    Makes top frame (log) invisible - actually resize the frame
// @include        http://*bigcharts.marketwatch.com/*
// ==/UserScript==


frames = document.getElementsByTagName("frame");

for (var i = 0; i < frames.length; i++) 
{
    src = frames[i].getAttribute("src");

    if (src.indexOf("logo.asp?") == 0) 
    {
        GM_log("Bigcharts remove ads frameset");
        frameset = frames[i].parentNode;
        frameset.parentNode.removeChild(frameset);
    } 
    if  (src.indexOf("main.asp?") == 0)
    {
        GM_log("Bigcharts.resize frameset");
        frameset = frames[i].parentNode.parentNode;
        frameset.setAttribute("rows", "28, *");
//        frames[i].setAttribute("rows", "0%, 100%");
    } 

}
