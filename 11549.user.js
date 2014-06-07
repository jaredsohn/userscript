// ==UserScript==
// @name          Wikipedia - Clean and Professional
// @namespace     http://userscripts.org/users/23523
// @description   Changes Wikipedia's layout to be more clean and professional
// @author        Sean
// @version     11/25/2007
// @include       http://*.wikipedia.org/wiki/*
// @include       *.wikipedia.org/w*
// ==/UserScript==
var css =   "body { font-family: Calibri, serif !important; background: #F8F7FF url('') 0 0 no-repeat !important; }"+
      ".firstHeading {padding-top: 10px!important;}"+
      "#globalWrapper { width: 810px !important; margin: 100px auto auto 110px !important; padding: 0px !important; }"+
      "#column-content { position: relative !important; margin: 0 !important; padding: 0 !important; }"+
      "#content { background: white !important; margin: 0 !important; padding: 15px 20px 20px 20px !important; width: 100% !important; border: none !important; border-left: 1px solid !important; border-right: 0px solid !important; border-color: #DDDDDD !important; top: 80px !important; }"+
      "div#bodyContent { width: 100% !important; text-align: left !important; font-size: 100% !important; font-weight: 100 !important; margin: 0 !important; padding: 0 !important; }"+
      "a:link { text-decoration: underline !important; color: #000082 !important; }"+
      "a:visited { text-decoration: underline !important; } a:hover { text-decoration: underline !important; }"+
      "a:active { text-decoration: underline !important; }"+
      "#column-one { position: absolute !important; width: 985px !important; height: 155px !important; padding: 0px !important; margin: 15px 15px 15px 0px !important; top: 0px !important; text-align: left !important; z-index: 10 !important; white-space: normal !important; font-size: 11px !important; background-image: url(http://upload.wikimedia.org/wikipedia/commons/7/7f/Wikipedia-logo-en.png) !important; background-repeat: no-repeat !important; }"+
      "ol.references {font-weight:bold!important;font-size:11px!important;}"+
      ".mw-headline {font-weight:bold!important;}"+
      ".portlet {margin: 0 !important;}"+
      ".portlet h5 {display:none !important;white-space: normal !important;} "+
      "portlet ul { line-height: 1.5em !important; list-style-type: square !important; list-style-image: url(bullet.gif) !important; font-size: 100% !important; }"+
      ".portlet ul, .portlet li {display: inline !important;margin: 0 !important;}"+
      ".portlet h5 {display:none !important;}"+
      ".pBody {padding: 0 !important; font-family: Calibri, sans-serif !important; background-color: transparent !important; }"+
      ".pBody ul li { margin: 0 !important; padding: 0 0.1em 0 0.1em !important; }"+
      ".pBody li a { display: inline !important; }"+
      "#p-interaction {display:none !important;}"+
      "#p-cactions { position: absolute !important; top: 165px !important; left: 0 !important; width: 86.35% !important; margin: 0 auto 0 0 !important; padding: 0 !important; float:left !important; text-transform: uppercase !important; white-space: normal !important; border-bottom:1px solid #DDDDDD !important; }"+
      "#p-cactions ul { margin: 0 !important; padding: 0em !important; }"+
      "#p-cactions li { padding: 0.2em 0em 0.2em 0em !important; margin: 0 !important; border-style: solid solid none solid !important; border-color: #999 !important; }"+
      "#p-cactions li.selected { border-style: solid solid none solid !important; border-color: #999 !important; padding: 0.2em 0em 0.3em 0em !important; }"+
      "#p-cactions li.selected a { letter-spacing: 0.5em !important; }"+
      "#p-cactions li a { background-color: #ffffff !important; color: #333 !important; font-family: Calibri, sans-serif !important; text-transform: uppercase !important; }"+
      "#p-personal { width: 400px !important; padding: 0 134px !important; margin: 0 !important; position: absolute !important; float: right !important; left: auto !important; right: 0px !important; text-align: right !important; top: 80px !important; z-index: 999 !important; }"+
      "#p-personal .pBody li { margin: 0 0 0 0.8em !important; padding: 0 !important; }"+
      "#p-personal ul { margin: 0 !important; padding: 0 !important; }"+
      "#p-personal li { margin: 0 0 0 1em !important; text-align: right !important; }"+
      "#p-personal li a { color: gray !important; text-transform: capitalize !important; color: #AAAAAA !important; }"+
      "#p-personal li a:hover { background-color: transparent !important; padding-bottom: 0 !important; }"+
      "#p-search { position:relative !important; margin: 0px 0px 0px 0px !important; padding: 0px 129px !important; float: right !important; }"+
      "#p-search ul li {display:none !important;}"+
      "#searchBody { text-align: center !important; }"+
      "#searchBody ul li {display:none !important;}"+
      "#searchInput { margin-bottom: 4px !important; }"+
      "#searchInput ul li {display:none !important;}"+
      "#p-lang { margin: 3px 0 0px 0 !important; position: relative !important; width: 750px !important; float: left !important; left: 75px !important; color: white !important; }"+
      "#p-lang ul li:before { content: \"\00BB \0020\" !important; }"+
      "#p-lang ul li {display:none !important;}"+
      "#p-navigation { margin: 0 0 3px 0 !important; float: left !important; position: relative !important; left: 75px !important; width: 750px !important; }"+
      "#p-navigation ul li:before { content: \"\00BB \0020\" !important; }"+
      "#p-navigation ul li {display:none !important;}"+
      "#p-tb { margin: 3px 0 3px 0 !important; position: relative !important; width: 735px !important; float: left !important; left: 90px !important; }"+
      "#p-tb ul li:before { content: \"\00BB \0020\" !important; }"+
      "li#pt-userpage,li#pt-anonuserpage,li#pt-login { background: none !important; padding-left: 0 !important}"+
      "#p-tb ul li {display:none !important;}"+
      "div#p-logo {display:none !important;}"+
      "div#siteNotice {display: none !important}"+
      "#footer { border-top: none !important; border-bottom: 0px !important; border-left: 1px solid !important; border-color: #DDDDDD !important; margin: 0 -40px 0 0 !important; padding: 150px 0 50px 0 !important; }"+
      "div#f-poweredbyico, div#f-copyrightico { display: none !important }"+
      "h1 { border-bottom: none !important; padding-top: 0 !important; font-family: Arial, serif !important; color: #000082 !important; font-weight: 100 !important; font-size: 180% !important; }"+
      "h3 { font-weight: 100 !important; }"+
      "h4 { font-size: 100% !important; }"+
      "#contentSub { font-size: 100% !important; line-height: 1.2em; margin: 0 0 1.4em 0em !important; color: #7d7d7d; width: auto; }"+
      "h3#siteSub { font-size: 80% !important; color: gray; }"+
      "dl > dd > .dablink { margin-left: -2em !important; }"+
      ".metadata {top: 35px !important;}"+
      "div.messagebox { }"+
      "li#n-portal, li#n-currentevents, li#n-Featured-articles, li#n-randompage, li#n-help, li#n-contact, li#t-specialpages, li#t-recentchangeslinked, li#t-upload {display:none}"+
      "#siteSub { display: none; }"+
      "#footer {display: none;}"+
      "#editpage-copywarn2 {display: none;}"+
      "#editpage-specialchars {display: none;}"+
      "pre {overflow: auto;}"+
      "pre {border: 1px solid #aaa;}"+
      "#catlinks {padding:0 5px 0 5px; margin-top:0.5em; -moz-border-radius:.5em; border:1px solid #CDCDCD; clear:both;}"+
      "#p-cactions ul li, #p-cactions ul li a { -moz-border-radius-topleft: 1em; -moz-border-radius-topright: 1em; }"+
      "#p-navigation.portlet, #p-tb.portlet, #p-lang.portlet {display: none; border:none!important;}"+
      "table.toc, div.thumbinner, table.wikitable table { -moz-border-radius-topleft: 1em; -moz-border-radius-bottomleft: 1em; -moz-border-radius-topright: 1em; -moz-border-radius-bottomright: 1em; }"+
      "#searchBody {border: none!important;}"+
      "#content { -moz-border-radius-topleft: 1em; -moz-border-radius-bottomleft: 1em; }"+
      "div.pBody { -moz-border-radius-topright: 1em; -moz-border-radius-bottomright: 1em; }"+
      "li#pt-userpage { background: none }"+      
      "li#f-copyright, li#f-lastmod, #editpage-copywarn { display: none; }"+
      ".portlet li, #BodyContent li { /*list-style-image: url(\"/style/monobook/bullet.gif\");*/ list-style-type: square; list-style-image: url(\"http://en.wikipedia.org/upload/6/69/AAAAAA_Bullet.png\"); }"+
      ".portlet li:hover, #BodyContent li:hover { list-style-type: square; list-style-image: url(\"http://en.wikipedia.org/upload/4/44/000000_Bullet.png\"); }"+
      "table.diff { background:white; width: 50%; height: 100%; overflow: auto; }"+
      "td.diff-otitle { background:#ffffff; }"+
      "td.diff-ntitle { background:#ffffff; }"+
      "td.diff-addedline { background: #f5f5f5; color: #4169e1; font-size: 100%; }"+
      "td.diff-deletedline { background: #f5f5f5; color: #b22222; font-size: 100%; }"+
      "td.diff-context { background:#e6e6fa; color: #708090; font-size: 100%; }"+
      "span.diffchange { color: #00008b; }"+
      ".messagebox.standard-talk { border: 1px solid #696969; background-color: #f5f5f5; }"+
      ".messagebox.cleanup { border: 1px solid #aaaaaa; background-color: #f5f5f5; }"+
      ".messagebox { border: 1px solid #aaaaaa; background-color: #f5f5f5; }"+
      ".usermessage { background-color: lightgreen; border-color: #B5F; color: black; font-weight: bold; margin: 2em 0em 1em 0em; padding: 0.5em 1em; vertical-align: middle; -moz-border-radius-topleft: 1em; -moz-border-radius-bottomleft: 1em; -moz-border-radius-topright: 1em; -moz-border-radius-bottomright: 1em; text-align: center; }"+
      ".votesupport { background-color: lightgreen; color: Black; border:1px solid green; display:inline; -moz-border-radius:20px; padding:0px 5px 3px 5px; }"+
      ".voteoppose { background-color: red; color: Black; border:1px solid green; display:inline; -moz-border-radius:20px; padding:0px 5px 3px 5px; }"+
      ".votekeep { background-color: lightblue; color: Black; border:1px solid green; display:inline; -moz-border-radius:20px; padding:0px 5px 3px 5px; }"+
      ".votedelete { background-color: red; color: Black; border:1px solid green; display:inline; -moz-border-radius:20px; padding:0px 5px 3px 5px; }"+
      ".rfacomment { background-color: orange; color: Black; border:1px solid green; display:inline; -moz-border-radius:20px; padding:0px 5px 3px 5px; }"+
      ".commentimportant { background-color: red; color: Black; border:1px solid green; display:inline; -moz-border-radius:20px; padding:0px 5px 3px 5px; }"+
      ".commentmediumpriority { background-color: yellow; color: Black; border:1px solid green; display:inline; -moz-border-radius:20px; padding:0px 5px 3px 5px; }"+
      ".commentlowpriority { background-color: lightgreen; color: Black; border:1px solid green; display:inline; -moz-border-radius:20px; padding:0px 5px 3px 5px; }"+
      "#p-cactions li { position: relative; float: left; }"+
      "#p-cactions li li { float: none; display: block; border: 1px solid #aaaaaa; border-top: none; text-align: center; background: #F8FCFF; background-color: #F8FCFF; }"+
      ".tabmenu ul { display: none; z-index: 2; position: relative; top: -2px; border-top: 1px solid #aaaaaa; padding: 0px; margin: 0px; background: #F8FCFF; background-color: #F8FCFF; }"+
      ".tabmenu:hover ul { display: block; }"+
      ".tabmenu a { padding: 0pt 0.8em !important; background: #F8FCFF; background-color: #F8FCFF; }"+
      ".tabmenu ul a:hover { font-weight: bold; }"+
      "#searchform input#searchGoButton {display:inline !important; font-weight: normal;} input#wpSave {font-weight: normal;}"+
      "#BoardCandidateNotice {display: none;}"+
      "#recentchangestext, .infobox {display: none;}";
      
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