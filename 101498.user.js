// ==UserScript==
// @name           lepreader
// @namespace      http://userscripts.org/users/26596
// @description    Lepreader
// @include        http://leprosorium.ru/
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/
// @include        http://*.leprosorium.ru/*
// ==/UserScript==


if (document.querySelector(".b-aside_president")) {
    
  var Lepreader = Lepreader || {};

  Lepreader.style = document.createElement("style");
  Lepreader.style.type = "text/css";
  Lepreader.style.innerHTML = "\
    .lepreader-close .b-aside_wiki_nav, .lepreader-close .b-gertruda, .lepreader-close .b-aside_item { display: none; }\
    .lepreader-close .l-content_aside { background: none !important; min-height: 0 !important; padding-top: 0 !important}\
    .8lepreader-close .l-i-content_main { margin-left: 35px !important; }\
    .8lepreader-close .l-content__subsite .l-i-content_main { margin-left: 245px !important; }\
    .lepreader-close .l-content_main { margin-left: -215px !important; width: auto !important; }\
    .lepreader-close .b-logo { overflow: hidden; left: 0 !important; width: 46px !important; top: -46px !important; }\
    .lepreader-close .l-header_subsite .b-logo { left: 65px !important; width: 46px !important; top: 31px !important; }\
    .lepreader-close .b-subsite_header { padding: 10px !important; margin-left: 100px}\
    .lepreader-close #js-subsite_logo { position: absolute; z-index: 100; }\
    #lepreader-toggler { position: fixed; top: 0; left: 0; opacity: .3; bottom: 0; border-right: 1px solid #eee; width: 5px; background: white; z-index: 100; color: #999; font-size: 12px; cursor: pointer; padding: 51% 0 0; }\
    #lepreader-toggler:hover { background: #ccc; color: #333; opacity: 1; }\
  ";
  document.body.appendChild(Lepreader.style);
  
  Lepreader.mode = localStorage.getItem('mode') || 'open';
  Lepreader.bodyClass = document.body.className;
  
  if (Lepreader.mode == 'closed') {
    document.body.className = Lepreader.bodyClass + ' lepreader-close';
  }
  
  Lepreader.toggler = document.createElement("span");
  Lepreader.toggler.id = "lepreader-toggler";
  Lepreader.toggler.innerHTML = ":";
  Lepreader.toggler.addEventListener("click", function() {
    if (Lepreader.mode == 'open') {
      document.body.className = Lepreader.bodyClass + ' lepreader-close';
      Lepreader.mode = 'closed';
    } else {
      document.body.className = Lepreader.bodyClass;
      Lepreader.mode = 'open';
    }
    localStorage.setItem('mode',Lepreader.mode);
  }, false); 
  document.body.appendChild(Lepreader.toggler);

}
