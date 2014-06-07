// ==UserScript==
// @name           feedly light view
// @namespace      thekryz
// @description    more compact design for the new Google Reader with G+ Integration
// @include        http*://cloud.feedly.*/*
// @include        http*://*.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

var paras;
paras = document.getElementsByTagName("img");
//paraNum循环变量，用于选中每个单独的段落
var paraNum;
//从零开始循环，paras.length是段落节点的个数

for (var paraNum=0;paraNum<paras.length;paraNum++)
 { 
  //操作：给段落设置边框。 
  paras[paraNum].removeAttribute("style");
 }

// feedly
GM_addStyle(".entryHolder { border: 0px solid !important;   cursor: auto;    display: block;    float: left;    width: 1000px; }");
GM_addStyle("element.style { border: 1px solid !important;    clear: both;    display: block;    opacity: 1;    text-align: center;}");
GM_addStyle(".condensed .entryholder .u100entry {  float: left;    margin-left: auto;    margin-right: auto;    max-width: 980px !important;}");
GM_addStyle(".entryBody {  max-width: 800px!important;}");
GM_addStyle(".inlineFrame {  border: 1px solid #000000!important;}");
GM_addStyle("element.style {   display: block;    margin-bottom: 17px;    margin-top: 17px;    max-width: 1000px !important;}");
GM_addStyle("img { max-width: 1000px !important;}");// useless




// digg reader
GM_addStyle(".tory-detail-view {border: 1px solid #000000!important;}");
GM_addStyle(".story-detail-content { margin-left: 20px!important;  width: 850px !important;}");
GM_addStyle(".story-detail-view-container {border: 1px solid #000000!important;}");
GM_addStyle(".detail-body img {max-width: 1000px!important;}");
GM_addStyle(".feed-item-focused .feeditem-feedtitle, article.expanded .feeditem-feedtitle, .feed-item-focused .feeditem-list-content, article.expanded .feeditem-list-content{background: #f1fafa;!important;}");

/* Main entry section */
/*
.entryHolder {
    background-color: #EEEEEE;
    border: 1px solid;
    cursor: auto;
    display: block;
    float: left;
    width: 1000px;



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
*/

/* Top section */

// Fixes main button line
GM_addStyle("#viewer-header                                                         { height:39px !important;}");

// Fixes "Subscribe" Button "line"
//GM_addStyle("#lhn-add-subscription-section                                          { height:39px !important;}");
// Fixes position of buttons in main button line
GM_addStyle("#viewer-top-controls-container                                         { margin-top:-15px !important;}");
// Fixes position of "Subscribe"-button
//GM_addStyle("#lhn-add-subscription                                                  { margin-top:-15px !important;}");
// Fixes Google-Logo size
GM_addStyle("#gbql                                                                  { background-position: 0 -186px !important; height: 37px !important; width: 95px !important;}");
// Fixes Google-Logo position
GM_addStyle("#gbqlw                                                                 { height:44px !important;}");
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

GM_addStyle("#entries.list #current-entry.expanded .entry-container         { background:none repeat scroll 0% 0%  #dddddd !important;}");//single
GM_addStyle(" #entries.cards .card-content         { background:none repeat scroll 0% 0% #dddddd !important;}");//expand
//rgb(204, 232, 207) green #ffffe3 yellow  #entries.cards .card-content   
//grey #cbcbcb   e5e5e5  dddddd darkgrey #808080 #cacaca #cecece  #cbcbcb
//yellow#ffffcb

/* Left sidebar */
/*
// fixes caption positions on the left sidebar
GM_addStyle(".lhn-section-primary                                                   { line-height:21px !important;}");
// shrinks spaces between second parts of the left sidebar
GM_addStyle(".lhn-section-footer                                                    { margin-bottom:0px !important; padding-bottom:0px !important;}");
// less space between elements on the left sidebar (eg folders)
GM_addStyle(".scroll-tree li                                                        { margin:0px !important;}");
GM_addStyle(".scroll-tree li.folder .link, .scroll-tree li.sub                      { height:19px !important;}");
// smaller menu items (dropdown-menus)
GM_addStyle(".goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem        { padding-top:0px !important; padding-bottom: 0px !important; padding-left: 20px !important; border:0px !important;}");
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
*/
// removes "Google Reader" Logo