// ==UserScript==
// @name        AtTask-MyWork-CleanUp
// @namespace   hellochameleon.com
// @description Minor streamlining to unhide the important stuff
// @include     https://harryanddavid.attask-ondemand.com/myWork
// @version     1
// ==/UserScript==

GM_addStyle('#MyWorkList .work-item { background: #fcfcf9; overflow: visible; min-height: 104px; }');
GM_addStyle('.work-item .work-item-container { padding-left:12px }');
//GM_addStyle('.work-item .priority, .work-item.selected .priority { margin-left: -2px; margin-top: -4px; }');
GM_addStyle('.work-item .item-name, .work-item .item-name a:link, .work-item .item-name a:visited, .work-item .item-name a:hover, .work-item .item-name:active { font-weight: bold; }');
GM_addStyle('.work-item a, .work-item.selected .item-name, work-item.selected .item-name a, work-item.selected .item-name a:link, work-item.selected .item-name a:visited { color:#00557a!important; }');
GM_addStyle('.show-when-selected {display:inline!important;}');
GM_addStyle('#MyWorkList .custom-view-fields { max-height: 90px; }');
GM_addStyle('.work-item .comment { font-size:13px; color:#777; }');
GM_addStyle('.work-item .last-update, .work-item .user-actions { display: block; }');
GM_addStyle('.custom-view-fields .column_1, .custom-view-fields .column_3 {margin-bottom:5px; font-size:13px; width:100%!important; float:left!important; text-align:left!important;');
GM_addStyle('.work-item.selected .due-container, .work-item .due-container { background-color:#f9f9f6!important; background-image:none!important; border:1px solid #ccc; height: 79px; margin-right: -1px; padding-right: 5px; visibility: visible; width: 102px; }'); 
GM_addStyle('.work-item .due-container .DoneButton { clear: both; display: block; } span.DoneButton { padding-left: 15px!important }'); 
GM_addStyle('.DoneButton { background-color:#ccccb9!important; color:#999; border: solid 1px #999!important; background-image:none!important; box-shadow:none!important; border-radius:4px!important; }');

// Stuff to hide
GM_addStyle('.work-item .priority, .work-item.selected .priority, .custom-view-fields .column_0, .custom-view-fields .column_2, .custom-view-fields .column_4, #MyWorkList .user-actions, .work-item .hide-when-selected, .work-item .condition, .work-item.selected .condition, .ColorDot, .work-item .project-name, .work-item .number, .button-text .glyph, span.DoneButton.DropDown .glyph { display:none!important; }');