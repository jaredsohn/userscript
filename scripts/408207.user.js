// ==UserScript==
// @name    Divxatope.com Adblock
// @match   *://*.divxatope.com/*
// @match   *://divxatope.com/*
// @run-at  document-end
// @version 1
// @grant   GM_addStyle
// ==/UserScript==

    ads = [
        "*[id*=ads]",
        "[class*=ads]",
        "*[id^=ad]",
        "*[href*='adk']",
        "#CashSlideDiv",
        "div[style*='z-index: 10000']",
        "div[style*='width:300px;height:250px']",
        "div[style*='width:618px;height:265px;']",
        "div[style*='width:728px;height:90px;']",
        "#Movie1",
        "#navigation",
        ".adk2-olAd",
        "#adk2_img",
        "*[style*='width:94%;height:70px']",
        "iframe[src*=ad]",
        ".box-left:last-child",
    ].join(",");

    GM_addStyle(ads+"{display:none!important;height:0!important;width:0!important;}");
    
    Array.prototype.forEach.call(document.querySelectorAll(ads),function(e){
      e.parentElement.removeChild(e);
      console.log("removing "+e);
    });

    Array.prototype.forEach.call(document.querySelectorAll(".btn-download-file_"),function(e){
      e.href=e.href.replace(/redirect\.php\?file\=.+\&link=/,"");
      console.log("fixing redirect from "+e);
    });