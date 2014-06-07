// ==UserScript==
// @name AMO Theme Names
// @namespace srazzano
// @version 1.0.1
// @description Theme names for thumbnails
// @include https://addons.mozilla.org/en-US/firefox/themes/
// @run-at document-end
// ==/UserScript==

initGM();
function initGM() {
  isGM = typeof GM_getValue != "undefined" && typeof GM_getValue("a", "b") != "undefined";
  addStyle = isGM ? GM_addStyle : function(css) {
    var head = $("head")[0]; 
    if (!head) return; 
    var style = $c("style", {type:"text/css", innerHTML:css}); 
    head.appendChild(style);
} }

function $(q, root, single, context) {
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

var data = document.querySelectorAll(".persona-preview a");
for (var i = 0, a; a = data[i]; i++) {
  var title = a.getAttribute("data-browsertheme").split('"name":"')[1].split('"')[0];
  a.setAttribute("theme", title);
}

addStyle("\
  #featured-addons.personas-home .featured-inner.themes {\
    height: 360px !important;\
  }\
  #featured-addons .personas-slider {\
    height: 295px !important;\
  }\
  .arrow.next {\
    top: 344px !important;\
  }\
  .persona-preview {margin: 0 0 13px 0 !important;}\
  .persona-preview a:after {\
    bottom: -18px !important;\
    color: #3D6DB5 !important;\
    content: attr(theme) !important;\
    font-size: 12px !important;\
    font-weight: bold !important;\
    left: 0 !important;\
    position: absolute !important;\
  }\
");

