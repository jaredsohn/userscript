// ==UserScript==
// @name        Reeeder
// @namespace   http://userscripts.org/users/scturtle
// @description Reeder style Google Reader
// @include     http://www.google.com/reader/view/*
// @include     https://www.google.com/reader/view/*
// @version     1.03
// ==/UserScript==

function multilineString(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

var css = multilineString(function() {/*!
#viewer-container {
  font-size: 130% !important;
 }
#entries.list .collapsed .entry-source-title, #entries.list .collapsed .entry-title, #entries.list .collapsed .entry-date{
  padding-top: 3px !important;
}
#entries.list .entry .collapsed, #entries.list #current-entry.expanded .collapsed {
  height: 32px !important;
}
div.entry-main{
  width:50% !important;
  margin-left:25% !important;
  line-height:200% !important;
}
div.item-body{
text-indent: 2em;
}
div.entry-body a, div.entry-body span.link, #no-entries-msg span.link {
  color: black !important;
  text-decoration:none !important;
  border-bottom: gray 2px dotted;
  font-weight: bold !important;
}
#no-entries-msg span.link {
  color:black !important;
}
div.entry-main a, div.entry-main h2.entry-title {
  color:black !important;
}
div#viewer-header-container, div#viewer-header {
  background-image: -moz-linear-gradient(top, #EEEEEE, #BFBFBF) !important;
  background-image: -webkit-linear-gradient(top, #EEEEEE, #BFBFBF) !important;
}
.entry .collapsed {
  background: #f3f3f3 !important;
}
.entry.read .collapsed, #current-entry.expanded .collapsed {
  background: #e5e5e5 !important;
}
#current-entry .collapsed {
  background: #fffff9 !important;
}
div.expanded .collapsed {
  box-shadow: 0px 3px 10px #888888;
}
div.expanded .entry-actions {
  box-shadow: 0px 3px 13px #888888;
}
#current-entry .entry-container {
  border-left: 0px !important;
}
div.entry-actions {
  border-left: 0px !important;
}
.collapsed {
  border-left: 0px !important;
}
div#viewer-entries-container {
  background: #E0E0E0 !important;
}
div#chrome-fullscreen-top-toggle {
  background: #BFBFBF !important;
  border: 0px !important;
}
div#chrome-fullscreen-top-toggle-icon {
  border-color: #BFBFBF #BFBFBF #EEEEEE !important;
}
div.entry-container{
  margin: 15px 0px !important;
  background: #F7F5F2 !important;
}
div.entry, #no-entries-msg {
  background: #F7F5F2 !important;
}
#gbx1, #gbx2, #nav,
#nav div[class*="section"],
#nav li{
  background: #F1F1F1 !important;
}
#nav #overview-selector,
#nav #lhn-selectors .selector,
#nav #sub-tree-header,
#nav a{
  border-left: 0px !important;
  }
#entries {
  padding: 0px 1px 0 2px !important;
}
*/}); 
//alert(css);

var head = document.getElementsByTagName("head")[0];
var style = document.createElement('style');
style.rel = "stylesheet";
style.type = "text/css";
style.innerHTML = css;
head.appendChild(style);
