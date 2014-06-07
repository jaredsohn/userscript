// ==UserScript==
// @name           V1
// @namespace      file://here
// @include        https://www10.v1host.com/OPPENH01/*
// ==/UserScript==



function injectCSS(cssdata)
{
    head = document.getElementsByTagName("head")[0];
    style = document.createElement("style");
    style.setAttribute("type", 'text/css');
    style.innerHTML = cssdata;
    head.appendChild(style);
} 

function onLoadHandler(){
GM_log('Loading page and applying GreaseMonkey v1.user.js', 0);

//GM_addStyle("table#MainMenu tr td.selected table tr td.m { background: url(\"https://www10.v1host.com/OPPENH01/gradient.img?w=1&h=52&b=9FE90F&f=57761E\")   repeat-x scroll left bottom #8BC914; }");
//GM_addStyle("table#MainMenu tr td.selected table tr td.tl,table#MainMenu tr td.selected table tr td.tm,table#MainMenu tr td.selected table tr td.tr { background: url(\"https://www10.v1host.com/OPPENH01/gradient.img?w=1&h=52&b=9FE90F&f=57761E\")   repeat-x scroll left top #57761E; }");
//GM_addStyle("table#MainMenu tr td.selected table tr td.l, table#MainMenu tr td.selected table tr td.r { background: url(\"https://www10.v1host.com/OPPENH01/gradient.img?w=1&h=52&b=9FE90F&f=57761E\")   repeat-x scroll left bottom #9FE90F; }");

GM_addStyle("table#MainMenu tr td.selected table tr td.m { background: #9FE90F }");
GM_addStyle("table#MainMenu tr td.selected table tr td.tl,table#MainMenu tr td.selected table tr td.tm,table#MainMenu tr td.selected table tr td.tr { background: #9FE90F; }");
GM_addStyle("table#MainMenu tr td.selected table tr td.l, table#MainMenu tr td.selected table tr td.r { background: #9FE90F; }");

// Top menu items
GM_addStyle("table#MainMenu tr td.none-selected table tr td.bl, table#MainMenu tr td.none-selected table tr td.br { background: #9FE90F }");

// Gradient heading bars
GM_addStyle(".logo {background-image: url(\"http://deniwprod/iw/tinymce/jscripts/tiny_mce/tmp/gb/topleft-logo_gb2.png\")}");
GM_addStyle(".StoryBoard, .story-card {background-image: url(\"http://deniwprod/iw/tinymce/jscripts/tiny_mce/tmp/gb/logo_02_85fade_100.png\")}");

GM_addStyle(".ScopeContext table tr.top td.top-left, .ActionList table.footer tr.b td, table.layoutbody table.layoutcontent tr.header td.lcr {background-image: url(\"https://www10.v1host.com/OPPENH01/gradient.img?w=1&h=20&f=9FE90F&b=57761E\")}");

// Gradient heading corners
GM_addStyle(".ScopeContext table tr.top td.top-right img { background: url(\"http://deniwprod/iw/tinymce/jscripts/tiny_mce/tmp/gb/canvas_rightcurve_gb.png\"); }");
GM_addStyle("table.layoutbody table.layoutcontent tr.header td.lcl { background: url(\"http://deniwprod/iw/tinymce/jscripts/tiny_mce/tmp/gb/canvas_leftcurve_gb.png\"); }");

    var allImgs,thisImg;
    allImgs = document.evaluate('//img[@src]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

  for (var i = 0; i < allImgs.snapshotLength; i++) {
            var thisImg = allImgs.snapshotItem(i);
            var src = thisImg.src;
            var srcMatch = src.match('Feature-Icon.gif');

            if (srcMatch != null) {
                thisImg.src = 'http://deniwprod/iw/tinymce/jscripts/tiny_mce/tmp/gb/staypuft_24.png';
            }
            srcMatch = src.match('Defect-Icon.gif');  

            if (srcMatch != null) {
                thisImg.src = 'http://deniwprod/iw/tinymce/jscripts/tiny_mce/tmp/gb/slimer_24.png';
            }
            srcMatch = src.match(/Task-Icon.gif/i);  

            if (srcMatch != null) {
                thisImg.src = 'http://deniwprod/iw/tinymce/jscripts/tiny_mce/tmp/gb/logo_02_20.png';
            }
         }   
}

window.addEventListener('load',onLoadHandler,true);
