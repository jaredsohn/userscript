// ==UserScript==
// @name    		Add Class Name
// @namespace    	srazzano
// @description    	Adds a class for specified users (to be used as css selector) for http://forum.userstyles.org/discussion and http://custombuttons.sourceforge.net/forum/viewtopic
// @include    		http://forum.userstyles.org*
// @include        	http://custombuttons.sourceforge.net*
// @version    		1.0.0
// @author    		Sonny Razzano
// @homepage		http://userscripts.org/scripts/show/158077
// @updateURL		https://userscripts.org/scripts/source/158077.user.js
// @dropbox		https://dl.dropbox.com/u/77691265/AddClassName.js
// ==/UserScript==

// ========== SETTINGS ===================================================================================
// (aProfile) Userstyles profiles "US/ + number" and Custombuttons profiles "CB/ + number".
// (aProfile) Separate multiple entries with comma and no spacing.
// (aClass) Assign a unique class name.
// (aClass) Use backslash as break point (PROFILE 1), or string inline without any backslashes (PROFILE 2). 
// (aCSS) Ensure correct class selector name matches aClass name used for each profile.

// PROFILE 1
var aProfile1 = ["US/1234","US/56789","CB/123"]; 
var aClass1 = "noise";
var aCSS1 = "\
  .noise img {\
    max-height: 40px !important;\
    max-width: 40px !important;\
  }\
  .noise img:hover {\
    max-height: 100% !important;\
    max-width: 100% !important;\
    left: 0 !important;\
    position: relative !important;\
    top: 0 !important;\
  }\
";

// PROFILE 2
var aProfile2 = ["US/99999"];
var aClass2 = "noisy";
var aCSS2 = ".noisy .Message {color: red !important;}.noisy .Message span {display: none !important;}";

// PROFILE 3
var aProfile3 = [];
var aClass3 = "noisier";
var aCSS3 = "\
";

// PROFILE 4
var aProfile4 = [];
var aClass4 = "noisiest";
var aCSS4 = "\
";
// ========== END SETTINGS ===============================================================================

var url = window.location.href.toLowerCase();
var fuso = url.match("http://forum.userstyles.org/discussion");
var cbsf = url.match("http://custombuttons.sourceforge.net/forum/viewtopic");

initGM();
function initGM() {
  isGM = typeof GM_getValue != "undefined" && typeof GM_getValue("a", "b") != "undefined";
  addStyle = isGM ? GM_addStyle : function(css) {
    var head = $g("head")[0]; 
    if (!head) return; 
    var style = $c("style", {type:"text/css", innerHTML:css}); 
    head.appendChild(style);
} }

function $g(q, root, single, context) {
  root = root || document;
  context = context || root;
  if (q[0] == "#") return root.getElementById(q.substr(1));
  if (q.match(/^[\/*]|^\.[\/\.]/)) {
    if (single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
    var arr = []; var xpr = root.evaluate(q, context, null, 7, null);
    for (var i = 0; i < xpr.snapshotLength; i++) arr.push(xpr.snapshotItem(i));
    return arr;
  }
  if (q[0] == ".") {
    if (single) return root.getElementsByClassName(q.substr(1))[0];
    return root.getElementsByClassName(q.substr(1));
  }
  if (single) return root.getElementsByTagName(q)[0];
  return root.getElementsByTagName(q);
}

function $c(type, props, evls) {
  var node = document.createElement(type);
  if (props && typeof props == "object") {
    for (prop in props) {
      if (typeof node[prop] == "undefined") node.setAttribute(prop, props[prop]);
      else node[prop] = props[prop];
  } }
  if (evls instanceof Array) {
    for (var i = 0; i < evls.length; i++) {
      var evl = evls[i];
      if (typeof evl.type == "string" && typeof evl.fn == "function")
        node.addEventListener(evl.type, evl.fn, false);
  } }
  return node;
}

if (fuso) {
  var proLnk = $g(".ProfileLink"), prefix = "/profile/";
}

if (cbsf) {
  var proLnk = $g(".postprofile"), prefix = "u=";
}

for (var i = 0; i < proLnk.length; i++) {
  if (fuso) var curClass = proLnk[i].offsetParent.className;
  if (cbsf) var curClass = proLnk[i].parentNode.parentNode.className;
  if (aProfile1 != "") {
    for (var j in aProfile1)
    if (fuso) {
      if (proLnk[i].href.indexOf(prefix + aProfile1[j].split("US/")[1]) != -1)
        proLnk[i].offsetParent.className = curClass + " " + aClass1;
    }
    if (cbsf) {
      if (proLnk[i].innerHTML.indexOf(prefix + aProfile1[j].split("CB/")[1]) != -1)
      proLnk[i].parentNode.parentNode.className = curClass + " " + aClass1;
    }
    addStyle(aCSS1);
  }
  if (aProfile2 != "") {
    for (var k in aProfile2)
    if (fuso) {
      if (proLnk[i].href.indexOf(prefix + aProfile2[k].split("US/")[1]) != -1)
        proLnk[i].offsetParent.className = curClass + " " + aClass2;
    }
    if (cbsf) {
      if (proLnk[i].innerHTML.indexOf(prefix + aProfile2[k].split("CB/")[1]) != -1)
      proLnk[i].parentNode.parentNode.className = curClass + " " + aClass2;
    }
    addStyle(aCSS2);
  }
  if (aProfile3 != "") {
    for (var l in aProfile3)
    if (fuso) {
      if (proLnk[i].href.indexOf(prefix + aProfile3[l].split("US/")[1]) != -1)
        proLnk[i].offsetParent.className = curClass + " " + aClass3;
    }
    if (cbsf) {
      if (proLnk[i].innerHTML.indexOf(prefix + aProfile3[l].split("CB/")[1]) != -1)
      proLnk[i].parentNode.parentNode.className = curClass + " " + aClass3;
    }
    addStyle(aCSS3);
  }
  if (aProfile4 != "") {
    for (var m in aProfile4)
    if (fuso) {
      if (proLnk[i].href.indexOf(prefix + aProfile4[m].split("US/")[1]) != -1)
        proLnk[i].offsetParent.className = curClass + " " + aClass4;
    }
    if (cbsf) {
      if (proLnk[i].innerHTML.indexOf(prefix + aProfile4[m].split("CB/")[1]) != -1)
      proLnk[i].parentNode.parentNode.className = curClass + " " + aClass4;
    }
    addStyle(aCSS4);
} }