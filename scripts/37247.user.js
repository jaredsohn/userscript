// ==UserScript==

// @name          paikia's Google Reader Optimized

// @namespace     http://userstyles.org

// @description	  Modify based on Nathan's Google Reader Optimized.

// @author        paikia

// @homepage      http://www.paikia.com

// @include       http*://www.google.com/reader*

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





addGlobalStyle('body,html{font-family:Corbel, arial, sans-serif !important;}#home{margin:6px 0 0 10px 

!important;}h1,h2,#chrome-stream-title a{font-weight:700;font-family:\"Trebuchet MS\", sans-serif !important;}#chrome-stream-title a,#nav 

*,#viewer-top-links *{text-decoration:none !important;border:0 !important;}body.hide-nav #chrome{margin-left:15px 

!important;}#chrome{margin-left:230px !important;padding:0 !important;}#main,#body,#html,.mozilla{background:#fff !important;margin:0 

!important;padding:0 !important;}#chrome-footer-container{height:18px !important;margin:0 !important;}#viewer-top-links{margin:0px 0 0 -1px 

!important;padding:4px 0 2px 8px !important;}#chrome-stream-title{background:#C3D9FF !important;display:none 

!important;text-align:right;margin-right:5px !important;margin-top:28px !important;margin-left:220px !important;max-width:280px 

!important;}.hide-nav-with-menu.home-hidden{display:none !important;}#view-search{display:none !important;}#message-area-inner{padding:2px 

6px !important;}#message-area-outer .c{border:1px solid #fff !important;}#message-area-outer{float:left !important;margin-top:2px 

!important;z-index:100 !important;}#viewer-header{display:none !important;background:#C3D9FF !important;width:280px !important;float:right 

!important;margin-top:7px !important;height:20px !important;}viewer-details{padding-right:10px;}#stream-prefs-menu{margin:1px 8px 0 0 

!important;}#loading-area{border:1px solid #fff !important;background:#C3D9FF !important;width:100px !important;height:29px 

!important;text-align:center !important;}#loading-area p{padding:4px 0 0 !important;}.entry-body{clear:both !important;}.entry-body 

div:first-child{margin:0 !important;padding:0 !important;}.item-body img{border:solid #ccc 1px !important;margin:8px !important;padding:4px 

!important;}.item-body a img{border:solid #b7b7d0 1px !important;background:#f5f5fb !important;}.item-body a img:hover{border:solid #9595bf 

1px !important;}.entry-main .entry-title{float:left !important; }.entry-main .entry-author{float:left !important;line-height:2.1em 

!important;margin-left:6px !important;}#view-list *{background:#C3D9FF !important;}.entry-container{margin:0 0 5px 5px 

!important;}#viewer-refresh{position:absolute;left:150px;top:3px;}#mark-all-as-read{position:absolute;left:20px;top:3px;}#search{float:righ

t !important;margin-top:-223px !important;margin-left:28px !important;z-index:100 !important;}#add-subs{border:0 !important;background:none 

!important;margin:2px 0 0 !important;padding:0 !important;}#viewer-controls-container{display:none 

!important;}#selectors-container{font-size:10.5px !important;}#chrome-stream-title,#message-area,#viewer-top-links,#entries{font-size:12px 

!important;}#nav{padding-left:10px;padding-top:30px;background:#e5edf7 !important;font-size:12px !important;max-width:220px 

!important;}#logo-container,#footer,#viewer-box .s,.entry-title img,#view-cards .s,#view-list .s,#gbh,#message-area,#message-area-outer 

.s,#gbar,#ogspacer,.gbh,#global-info{display:none !important;visibility:hidden !important;border:0 !important;margin:0 !important;padding:0 

!important;}#nav *{max-width:210px !important;}#entries .entry-body{max-width:none !important;padding-right:0 !important;}#entries 

.entry-title{max-width:400px !important;text-align:justify 

!important;margin-top:-223px}#viewer-controls-container-main,#nav,#selectors-box,#add-box,#sub-tree-box,.selector,#sub-tree-refresh,#search

-restrict,#selectors-container{margin:0 !important;}.gbh,#gbar,#logo,#footer,.entry-title-go-to,.entry-original,.tl,.tr,.bl,.br,#entries 

.scroll-filler-message,.section-header,.entry-author,.view-enclosure-parent a,#selectors-box .selector-icon,#sub-tree img.icon{display:none 

!important;}');
