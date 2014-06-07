// ==UserScript==
// @name           Wikipedia - Reading Mode
// @namespace      iampradip
// @description    Hide/Show menus and extra links on Wiki page.
// @include        http://*.wikipedia.org/wiki/*
// @include        http://*.wiktionary.org/wiki/*
// @include        http://*.wikiquote.org/wiki/*
// @include        http://*.wikibooks.org/wiki/*
// @include        http://*.wikiversity.org/wiki/*
// @include        http://*.wikinews.org/wiki/*
// @include        http://*.wikimedia.org/wiki/*
// @include        http://*.wikisource.org/wiki/*
// @include        https://secure.wikimedia.org/*/wiki/*
// @version        1.0.3
// ==/UserScript==
var BODY_READING_CLASS="body-reading-mode";
var TRANSITION="transition: margin-left 500ms;";
function toggleReadingMode(){
  if(!document.body.className) {
    document.body.className="";
  }
  var bodyClass=document.body.className;
  document.body.className=(
    bodyClass.indexOf(BODY_READING_CLASS)==-1?
    bodyClass+" "+BODY_READING_CLASS:
    bodyClass.replace(BODY_READING_CLASS,"")
    ).trim();
};
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
  var node=document.createElement("style");
  node.type="text/css";
  node.appendChild(document.createTextNode(
    "#reading-mode-menu{\
      position:absolute;\
      top:29px;\
      right:16px;\
      color:blue;\
      font-size:80%;\
      text-decoration:underline;\
      cursor:pointer;\
    }\
    body.body-reading-mode .mw-editsection,\
    body.body-reading-mode .noprint,\
    body.body-reading-mode #footer,\
    body.body-reading-mode #siteNotice,\
    body.body-reading-mode .articleFeedback,\
    body.body-reading-mode .editsection{\
      display:none !important;\
    }\
    body.body-reading-mode #content .noprint{\
      display:inline !important;\
    }\
    body.body-reading-mode #content{\
      margin-left:0 !important;\
    }\
    body.body-reading-mode #mw-navigation,\
    body.body-reading-mode #protected-icon,\
    body.body-reading-mode .collapse-section{\
      display:none !important;\
    }\
    body.body-reading-mode h1,body.body-reading-mode h2,\
    body.body-reading-mode h1.collapse-section-header,\
    body.body-reading-mode h2.collapse-section-header{\
    }\
    body #content{"+
      TRANSITION+
      "-moz-"+TRANSITION+
      "-webkit-"+TRANSITION+
      "-o-"+TRANSITION+
    "}"
  ));
  heads[0].appendChild(node); 
}
toggleReadingMode();

var divMenu=document.createElement("div");
divMenu.id="reading-mode-menu";
divMenu.innerHTML="Toggle Reading Mode";
divMenu.addEventListener("click",toggleReadingMode,false);
document.body.appendChild(divMenu);