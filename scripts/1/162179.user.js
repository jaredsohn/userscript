// ==UserScript==
// @name        BlackBoard Grade Center Optimizer
// @description Make BloackBoard Grade Center more readable by shrinking margins and useless sections. Update: Added changed BlackBoard frame URLs. Better metadata. Update: 2014/03/06 recognizes new elements.
// @namespace   http://userscripts.org/users/508312/bb-grade-center
// @source      http://userscripts.org/scripts/show/162179
// @identifier  http://userscripts.org/scripts/source/162179.user.js
// @downloadURL http://userscripts.org/scripts/source/162179.user.js
// @meta        http://userscripts.org/scripts/source/162179.meta.js
// @include     http://classes.emory.edu/webapps/portal/*
// @include     https://classes.emory.edu/webapps/portal/*
// @include     https://classes.emory.edu/webapps/gradebook/*
// @include     http://classes.emory.edu/webapps/gradebook/*
// @grant       none
// @version     1.2
// @data        2014-03-06
// ==/UserScript==

console.log("start GM: BlackBoard Grade Center Optimizer");
var elmFoo;

// This script will load separately for the base HTML and each frame. So make it succeed for each.

// This is for base HTML that contains the frameset. Make height of top frame 0 to make it disappear.
if ((elmFoo = document.getElementById("bbFrameset")) != null) {
  console.log("found bbFrameSet");
  elmFoo.rows = '0,*';
  //elmFoo.setAttribute('rows', '0,*');
  //elmFoo.parentNode.removeChild(elmFoo);
} else {
  console.log("bbFrameSet is NULL; we must be inside frames.");
}

/*console.log("Looking for frames");
var frames = window.frames;

console.log("found %d frames", frames.length);
for (var i = 0; i < frames.length; i++) {
 console.log("frame %d, doc: %s", i, frames[i].content.document.documentURI);
 elmFoo = frames[i].content.document.getElementById("bbFrameSet");
 if (elmFoo != null) { elmFoo.innerHTML = "aaa"; }
 //frames[i].removeAttribute("noresize");
 //frames[i].setAttribute("frameborder","1");
 //frames[i].setAttribute("scrolling","auto");
}*/

console.log("Looking for iframe components...");

// Top Frame

// Emory logo and stuff on top
if (((items = document.getElementsByClassName("brandingImgWrap")) != null) &&
     (items.length > 0)) {
     elmFoo = items.item(0);
     elmFoo.style.height = 0;
     console.log("Top Logo (brandingImgWrap) deleted.");
}

// The whole navframe on top
if ((elmFoo = document.getElementById("navFrame")) != null) {
  elmFoo.style.height = 0;
  console.log("Top nav bar (iframe#navFrame) completely deleted.");
}

// Part for bottom frame only. Shrink all unnecessary padding.

// Grade Center title
if ((elmFoo = document.getElementById("pageTitleDiv")) != null) {
  elmFoo.style.margin = 0;
  elmFoo.style.padding = 0;
  console.log("pageTitleDiv done");
}



if ((elmFoo = document.getElementById("breadcrumbs")) != null) {
  elmFoo.style.margin = 0;
  elmFoo.style.padding = 0;
  console.log("breadcrumbs done");
}


// grade box
if ((elmFoo = document.getElementById("containerdiv")) != null) {
  elmFoo.style.margin = 0;
  elmFoo.style.padding = 0;
  console.log("containerdiv done");
}

// Add global CSS
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.mainButton > a, .secondaryButton > a, .mainButton h2 > a, .secondaryButton h2 > a { padding: 2px; }');
addGlobalStyle('body { min-width: 100% !important; }');
addGlobalStyle('iframe#contentFrame { width: 100% !important; height: 770px; }');
addGlobalStyle('element { height: 770px !important; }');

// edit contentframe height
if ((elmFoo = document.getElementById("contentFrame")) != null) {
  elmFoo.style.height = '850px';
  console.log("contentFrame done");
}
