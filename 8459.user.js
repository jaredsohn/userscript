// ==UserScript==
// @name           collegehumor wider, no adverts
// @namespace      znerp
// @include        http://www.collegehumor.com/*
// ==/UserScript==

var width = 0.94 * window.innerWidth;
var centreColn = parseInt(0.58*(width));
var rightColn = parseInt(0.38*(width));
var soHot = parseInt(rightColn / 152) * 152;

var css = "@namespace url(http://www.w3.org/1999/xhtml);"+
          ".bannerAd, .boxAd, .towerAd, .friends, .partner_links_wrapper, #whatsgoingon, .chtv_home_promo { display: none !important; }"+
          ".avatar { float: right !important; }"+
          ".logo { top: 23px !important; }"+
          ".header .navigation, .header .navTabs  { "+
          "   width: auto !important;"+
          "   max-width: "+width+"px; !important; }"+
          ".global { width: 95% !important; }"+
          ".sectionHeader { overflow: hidden !important; }"+
          ".home .columnsCenter { "+
          "   width: auto !important;"+
          "   max-width: " + centreColn + "px !important; }"+
          ".columnsRight { "+
          "   overflow: hidden !important;"+
          "   max-width: " + rightColn + "px !important; }"+
          ".home .soHotRightNow .staffpicks .scrollContainer { width: "+ (rightColn - 20) +"px !important; }"+
          ".home .soHotRightNow .staffpicks .details { float: none !important; width: auto !important; }"+
          ".home .soHotRightNow ul{"+
          "   height: auto !important;"+
          "   background: #fff !important;}"+
          "#footer_links { width: auto !important;}"

if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.innerHTML = css;
    heads[0].appendChild(node);
  }
}

var allDivs = document.getElementsByTagName("div");
for (i = allDivs.length - 1; i >= 0; i-- ) {
  var thisDiv = allDivs[i];
  var class = thisDiv.getAttribute('class');
  if (class)
    if (class == "firstModule") {
      thisDiv = thisDiv.getElementsByTagName('div');
	  if (thisDiv[0].getElementsByTagName("a")[0].href.match("keepitclean") != null)
        thisDiv[0].setAttribute("style", "display: none !important;");
    }
}
