// ==UserScript==
// @name           Tube8 FLV Linker
// @namespace      dodgy_gr
// @description    Replaces "Download Video" link with direct link to vid and removes iframes
// @include        http://www.tube8.com/*
// @history        first release
// ==/UserScript==

while(document.body.getElementsByTagName('iframe').length>0)
{
    document.body.getElementsByTagName('iframe')[0].parentNode.removeChild(document.body.getElementsByTagName('iframe')[0]);
}


var code="for (var a=0;a<document.links.length;a++){if (document.links[a].className=='btn-01 main-sprite-img relative'){document.links[a].href=flashvars.video_url;}}";
setTimeout(code,1000);
