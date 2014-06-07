// ==UserScript==
// @name           DeviantART V6 Ad Remover
// @namespace      Myspace
// @include        http://www.deviantart.com/*
// @include        http://*.deviantart.com/
// @include        http://*.deviantart.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('iframe[id*="difipage"], #shadow-holder, #ad-footprint-160x600, iframe[width="300"], div[style="border: 1px dashed gray; float: right; position: relative; width: 410px; text-align: left;"], div[style="float: right; position: relative; width: 410px; text-align: left;"], div[id="gallery-admaster"], *[class=ad-blocking-makes-fella-confused], *[class=bling] { display: none !important }#ad-blocking-makes-fella-sad, #comments .alink, .column2 .read>.subsection:first-child, .rr>.box+.box, #news-side-top .section+br+.section, #forum>.catbar+div, .ads, #adso-magnifico, #output>.ie-paintfix, #gallery-admaster, .sleekadbubble, .sleekadfooter, #moreAdFrame, .hidoframe, .hh>div[style~="overflow:"] { display:none !important; position:absolute !important; left:-9999px !important; top:-9999px !important; } .stream-ads { border:0 !important; }body.withad { background-image: url(/minish/main/gradient.gif) !important; }#rockdock-message-count a[title][href*="messages"]:after{ content: " ("attr(title)") "}#ad-blocking-makes-fella-sad, #comments .alink, .column2 .read>.subsection:first-child, .rr>.box+.box, #news-side-top .section+br+.section, #forum>.catbar+div, .ads, #adso-magnifico, #output>.ie-paintfix, #gallery-admaster, .sleekadbubble, .sleekadfooter, #moreAdFrame, .hidoframe, .hh>div[style~="overflow:"] { display:none !important; position:absolute !important; left:-9999px !important; top:-9999px !important; } .stream-ads { border:0 !important; }#forum>.comments { padding-right:0 !important; min-height:0 !important; }#comments>.c { background:#92A399 !important; }#world.withad #midSection { top: 27px !important; }#world.withad #midSection { top: 27px !important; }#world.withad #headerTop { height: 98px !important; }body.withad #appFolder {top:65px !important;}body.withad #appFolderShadow {top:60px !important;}#world.withad #headerTop i.tl, #world.withad #headerTop i.tr {top:90px!important;}');var ads = document.getElementById('gallery-admaster');

if (ads) {
    ads.parentNode.removeChild(ads);
}
