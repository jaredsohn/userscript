// ==UserScript==
// @name           Fix New Facebook
// @namespace      http://tramchase.com/
// @description    Swap columns, hide ads, and fix tiny fonts in the new Facebook design (July 2008) 
// @include        http://www.new.facebook.com/*
// @author         Jamie Wilkinson <jamie@tramchase.com>
// ==/UserScript==

// from diveintogreasemonkey.com -- thanks
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// the magic
addGlobalStyle(

  // swap home screen columns
  '#home_sidebar { float: left !important; }'
  +'#home_main { float: right !important; }'

  // fix the menubar's tiny font size per Greg, http://halvfet.com
  +"#dropmenu_container div, #fb_menubar { font-size: 12px; }"

  // and remove "social ads" in newsfeeds, sidebar "sponsors", and the entire ad column
  +".social_ad, .sponsor, .adcolumn { display: none !important; }"
  
);
