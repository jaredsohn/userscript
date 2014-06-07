// ==UserScript==
// @name        AtTask-MyWork-Sparse
// @namespace   hellochameleon.com
// @description AtTask MyWork stripped down to the essentials
// @include     https://harryanddavid.attask-ondemand.com/myWork
// @version     1
// ==/UserScript==

// Adjust the 'Working On' list display
GM_addStyle('#layout-container {max-width:960px!important; min-width:816px; padding:0 20px;}')
GM_addStyle('#layout-content {bottom:0px;}')
GM_addStyle('.Navbar .secondary {float:left;}')
GM_addStyle('.Navbar .secondary .recents-favorites {left:250px;right:0;}')
GM_addStyle('.Navbar .secondary .notifications {left:280px;right:0;}')
GM_addStyle('.Navbar .secondary .notifications .notification-trigger {border-right:1px solid #D3D3D3;}')
GM_addStyle('#mywork #rightColumn {position:static;}')
GM_addStyle('#mywork .data-list {top:33px;}')
GM_addStyle('.attask-switch-banner #layout-content {top:60px;}')
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
GM_addStyle('span.DoneButton, button.DoneButton { background-color:#eeeede9!important; background-image: linear-gradient(#F6F6F6, #E7E7E7)!important; color:#505050; border: solid 1px #999!important; box-shadow:none!important; border-radius:4px!important; }');
GM_addStyle('span.DoneButton:hover, button.DoneButton:hover { background-color:#D0E4FF!important; background-image: none!important; border-color:#4271AD!important; }');
GM_addStyle('span.DoneButton .arrow, button.DoneButton .arrow {background-position:0 -656px;}')

// Stuff to hide
GM_addStyle('footer, .Navbar .primary, #mywork #leftColumn, #mywork #calendarcontainer, #attask-new, .work-item .priority, .work-item.selected .priority, .custom-view-fields .column_0, .custom-view-fields .column_2, .custom-view-fields .column_4, #MyWorkList .user-actions, .work-item .hide-when-selected, .work-item .condition, .work-item.selected .condition, .ColorDot, .work-item .project-name, .work-item .number, .button-text .glyph, span.DoneButton.DropDown .glyph { display:none!important; }');
