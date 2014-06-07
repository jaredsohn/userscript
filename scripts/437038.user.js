// ==UserScript==
// @name			Pinkbike Cleanup
// @include			http*pinkbike.*
// @require			https://docs.google.com/uc?export=download&id=0B9jOEkntB-5YVjFqVG9ZaTFxWkU
// @icon			http://es.pinkbike.org/240/sprt/i/favicon.ico
// @run-at          document-start
// ==/UserScript==

/* Removes Ad's On Home Page */                 GM_addStyle('div#inner-r > div.centertext:nth-child(n) { display:none !important; }');
/* Invisible Ad Click On Header (All Pages) */  GM_addStyle('div#header > a { display:none !important; }');
/* Removes VOD Top Gap */                       //GM_addStyle('div[style="height: 130px;"] { display: none !important;}');
/* Removes Report Video Space On Videos */      GM_addStyle('div[style="background: #e8e8e8; padding: 10px 0 10px 10px; margin: 60px 0 20px;"] { margin: 0px !important; padding: 0px !important}');
/* Removes Blog Post Header Border */           GM_addStyle('div[style="border-top: 5px solid #000; padding-top: 20px;"] { border:none !important; padding: 0px !important}');
/* Fixes User Dropdown */                       GM_addStyle('#header { height: 1px !important; background: #000 !important;  }');
/* Removes Header Ad */                         GM_addStyle('#header-main { display: none !important; }');
/* Removes Video Ad */                          GM_addStyle('#adholder { display: none !important; }');
/* Removes Pointer From Background Video Ad */  GM_addStyle('#content-container { cursor: auto !important; }');
/* Removes Blog Post Wide Ad */                 GM_addStyle('#div-gpt-ad-photoview_160x600-0 { display: none !important; }');
/* Removes Blog Post Wide Ad */                 GM_addStyle('#div-gpt-ad-widescreen1024-0 { display: none !important; }');
/* Adds A Space Below Report Video */           GM_addStyle('.margin-bottom-15 { padding-bottom: 10px !important; }');
/* Removes Margin Spacing From Home Page */     GM_addStyle('.mt2 { display: none !important; }');
/* Removes Ads From Forum */                    GM_addStyle('.ibox_dark { display: none !important; }');
/* Disables Long Words/Small Comments */        GM_addStyle('.comtext { word-wrap: break-word !important; font-size: 13px !important }');
/* Disables Small Text Comments */              GM_addStyle('.badcomm { font-size: 13px !important }');
/* Removes Ads From Blog Posts */               GM_addStyle('.news-ads-box { display: none !important; }');
/* Removes Ads From Blog Posts */               GM_addStyle('.news-ads-box2 { display: none !important; }');
/* Centers Blog Section After Ad Removal */     GM_addStyle('.news-box { margin: 0 auto !important; float: none !important; }');
/* Centers Blog Post Section Post Ad */         GM_addStyle('.news-comments { margin: 0 auto !important; float: none !important; }');
/* Removes POD Top Gap */                       //GM_addStyle('.inner-m2 { padding: 1px 8px 0px 8px !important; }');

if ('MozBinding' in document.documentElement.style) {
/* Adds Padding To Center Video */              GM_addStyle('#photo-container { padding: 0 0 1px 1px !important; }');
/* Adds Padding To Center Comments */           GM_addStyle('.photo-comments { padding: 1px !important; }');
}

checkForBadJavascripts ( [
    [false, /openbglink=1/, null]
] );