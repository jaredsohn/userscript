// ==UserScript==
// @name           Google Reader Compact (Stb)
// @description    Reduces margins on the new Google Reader layout, Changes link colors to something legible, add visible box around post, hide top header and navigation bar, hide feed title (Push 'W' to show header and navigation bar )
// @include        http*://www.google.*/reader/*
// @version        1.2.1
// ==/UserScript==


GM_addStyle(" \
#top-bar { height:40px !important; background: #fff !important } \
#main { background: #fff !important } \
#search { padding:8px 0 !important; } \
#viewer-header { height:35px !important; } \
#lhn-add-subscription-section { height:35px !important; } \
#lhn-add-subscription, #viewer-top-controls-container \
{ margin-top:-13px !important; } \
#entries { padding:0 !important; } \
#title-and-status-holder { padding:0.3ex 0 0 0.5em !important; background: #f6f6ff !important ; margin-right: 0 !important } \
.collapsed { line-height:2.2ex !important; padding:2px 0 !important; } \
.entry-icons { top:0 !important } \
.entry-source-title { top:2px !important } \
.entry-secondary { top:2px !important } \
.entry-main .entry-original { top:4px !important } \
.section-minimize { left: 0px !important } \
#overview-selector, #lhn-selectors .selector, .folder .name.name-d-0, \
#sub-tree-header \
{ padding-left: 15px !important; } \
.folder .folder .folder-toggle { margin-left:13px !important } \
.folder .sub-icon, .folder .folder>a>.icon { margin-left:27px !important } \
.folder .folder>ul .icon { margin-left:34px !important } \
.folder .folder .name-text { max-width:160px; !important } \
#reading-list-selector .label { display:inline !important } \
a { color: #0022aa !important } \
#scrollable-sections { border-right: 1px #ebebeb solid !important ; background: transparent !important } \
.lhn-section-primary { line-height: normal !important } \
#reading-list-unread-count { margin-top: 0 !important } \
.lhn-section { line-height: normal !important ; background: transparent !important } \
.selectors-footer { margin-bottom: 0 !important ; padding-bottom: 5px !important } \
.scroll-tree li { background: transparent !important } \
#viewer-header { background: transparent !important } \
.card-content {padding-left: 4px !important; border: #ebebeb 1px solid !important; border-width: 1px 1px 0 1px !important ; padding: 3px !important; background: transparent !important; border-radius: 7px 7px 0 0 !important;} \
.card-bottom { padding-left: 4px !important; border-radius: 0 0 7px 7px !important } \
.card-actions { background: #fcfcfc !important } \
.goog-flat-menu-button, #lhn-add-subscription, .goog-button-base-inner-box, .jfk-button { height: 22px !important; line-height: 22px !important } \
.goog-button-base-content { padding-top: 3px !important } \
.jfk-textinput { height: 20px !important } \
.read div.card-content, .read div.card-bottom { padding-left: 3px !important; border-color: #99c !important } \
#logo { margin-top: -13px !important } \
.card-common { background: transparent !important} \
#entries .entry, #entries.list .entry-container { background: transparent !important } \
#current-entry .card-content, #current-entry .card-bottom { border-color: #44b !important;} \
.card { border-style: none !important } \
");

GM_addStyle("#top-bar {display: none;}");
//GM_addStyle("#gb {display: ;}");
GM_addStyle("#title-and-status-holder {display: none;}");



 function KeyDownEvent(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     userIsTyping = (element.type == "text" || element.type == "password");
   } else {
     userIsTyping = (elementName == "textarea");
   }
   if (userIsTyping) return true;
   if (String.fromCharCode(event.which) == "W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
     toggle_visibility();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }