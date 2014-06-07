// ==UserScript==
// @name           Google Reader - compact design
// @namespace      thekryz
// @description    more compact design for the new Google Reader with G+ Integration
// @include        http*://www.google.*/reader/view/*
// ==/UserScript==


/* Main entry section */

// Standard entry line height: Smaller!
GM_addStyle("#entries.list .entry .collapsed                                        { height: 3.0ex !important;}");
// Fixes text height in entry line
GM_addStyle("#entries.list .collapsed .entry-source-title, #entries.list .collapsed .entry-title, #entries.list .collapsed .entry-date   { line-height: 3.0ex !important;}");
// Fixes padding for caption text above entries
GM_addStyle("#title-and-status-holder                                               { padding:0 0 0 0.5em !important;}");
// tiny fix for a pixel more space below caption text above entries
GM_addStyle("#chrome-title                                                          { padding-bottom:0 !important;}");
// fixes empty space (padding) on sides of entries
GM_addStyle("#entries                                                               { padding-right:0px !important; padding-left:0px !important;}");


/* Top section */

// Fixes main button line
GM_addStyle("#viewer-header                                                         { height:39px !important;}");
// Fixes "Subscribe" Button "line"
GM_addStyle("#lhn-add-subscription-section                                          { height:39px !important;}");
// Fixes position of buttons in main button line
GM_addStyle("#viewer-top-controls-container                                         { margin-top:-15px !important;}");
// Fixes position of "Subscribe"-button
GM_addStyle("#lhn-add-subscription                                                  { margin-top:-15px !important;}");
// Fixes Google-Logo padding and sizing
GM_addStyle("#gbqlw                                                                 { padding-top:3px !important; height: 44px !important; }");
GM_addStyle("#gbql                                                                  { background: url('//ssl.gstatic.com/gb/images/j_e6a6aca6.png') no-repeat scroll -242px 0 transparent !important; height: 37px !important; width: 95px !important;}");
// Fixes searchbar height
GM_addStyle("#gbq2                                                                  { padding-top:8px !important;}");
// Fixes Google+-bar height
GM_addStyle("#gb #gbu                                                               { padding-bottom:6px !important; padding-top:8px !important;}");
// Fixes section height
GM_addStyle("#gbx1                                                                  { height:44px !important;}");
// Fixes section height
GM_addStyle("#gb                                                                    { height:69px !important;}");
// Fixes section height
GM_addStyle("#gbx3                                                                  { height:24px !important;}");
// Fixes section height
GM_addStyle("#gbzw .gbt                                                             { line-height:21px !important;}");
// Fixes section height
GM_addStyle("#gbx1, #gb #gbx1, #gbq, #gbu, #gb #gbq, #gb #gbu                       { top:24px !important;}");


/* Left sidebar */

// fixes caption positions on the left sidebar
GM_addStyle(".lhn-section-primary                                                   { line-height:21px !important;}");
// shrinks spaces between second parts of the left sidebar
GM_addStyle(".lhn-section-footer                                                    { margin-bottom:0px !important; padding-bottom:0px !important;}");
// less space between elements on the left sidebar (eg folders)
GM_addStyle(".scroll-tree li                                                        { margin:0px !important;}");
GM_addStyle(".scroll-tree li.folder .link, .scroll-tree li.sub                      { height:19px !important;}");
// smaller menu items (dropdown-menus)
GM_addStyle(".goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem        { padding-top:1px !important; padding-bottom: 1px !important; padding-left: 20px !important; border:0px !important;}");
// fixes text position for recommended items in left sidebar
GM_addStyle("#recommendations-tree .lhn-section-primary                             { padding-bottom: 3px !important;}");
// fixes arrow icons for opening tree
GM_addStyle(".section-minimize                                                      { top: 3px !important;}");
// fixes unread article count-position for folders
GM_addStyle("ul#sub-tree.scroll-tree .folder-name                                   { line-height: 16px !important;}");
GM_addStyle(".folder-unread-count                                                   { line-height: 14px !important;}");
// fixes unread article count-position for items in folders
GM_addStyle(".sub-unread-count                                                      { line-height: 20px !important;}");
// small fix for folder icons-position
GM_addStyle(".scroll-tree .folder-icon, .scroll-tree .favicon                       { margin-top: -1px !important;}");
// fixes position of text for recommended feeds-tree
GM_addStyle("ul#recommendations-tree.scroll-tree                                    { line-height: 16px !important;}");
// fixes position of unread article count
GM_addStyle("#reading-list-unread-count                                             { line-height: 21px !important; margin-top: 0px !important;}");
// removes "Google Reader" Logo
GM_addStyle("#logo-section                                                          { display: none !important;}");
// puts "Subscribe" button into place
GM_addStyle("#logo-section + #lhn-add-subscription-section #lhn-add-subscription    { top: 20px !important;}");