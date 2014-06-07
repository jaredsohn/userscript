// ==UserScript==
// @name           GReader UI Fixer - FP Mod
// @namespace      http://www.stealthmonkey.com
// @description    Fixes multiple issues with the Google Reader user interface
// @include        http*://www.google.*/reader/*
// @version        1.3
// ==/UserScript==

// Version 1.3:
//  - Made items in list view take up less vertical space
//  - Renamed script from 'Fix New Google Reader Layout' to 'Google Reader UI Fixer'
//
// Version 1.2:
//  - Implemented sizing fixes for top of page and navbar (Removes need for Google Reader Demarginfier script)
//  - Centered subscribe button under Google Reader logo
//  - Made navbar gradient scroll boundaries less dark
//  - Removed Explore section on navbar
//
// Version 1.1:
//  - Cards now have rounded borders
//  - Stars now appear before title in card view, all stars are vertically aligned
//  - The selected item in list view now has a border on all sides
//  - Increased contents max width
//  - Decreased card padding
//  - Removed padding on right of card and list views (only if not using Google Reader Demarginfier script)
//
// Version 1.0:
//  - Initial release

// Resize First Bar
GM_addStyle("#top-bar { height: 45px; }");
GM_addStyle("#search { padding-top: 8px; }");

// Resize Second Bar
GM_addStyle("#lhn-add-subscription-section { height: 45px; }");
GM_addStyle("#lhn-add-subscription { margin-top: -15px; }");
GM_addStyle("#viewer-header { height: 45px; margin-right: inherit; }");
GM_addStyle("#viewer-top-controls-container { margin-top: -15px; }");

// Center Subscribe Button Under Google Reader Logo
GM_addStyle("#lhn-add-subscription { margin-left: 63px; }");

// Resize Third Bar
GM_addStyle("#title-and-status-holder { padding: 0.3ex 0 0 0.4em; }");

// Resize Home, All Items, Starred Items, Trends, Browse, & Subscription Navlinks
GM_addStyle(".section-minimize { left: 0px; top: 3px; }");
GM_addStyle(".lhn-section-primary { line-height: 21px; }");
GM_addStyle("#reading-list-unread-count, #reading-list-selector .label { display: inline; }");
GM_addStyle("#home-section { padding-bottom: 0px; }");
GM_addStyle("#overview-selector, #lhn-selectors .selector, #lhn-selectors .lhn-section-secondary .selector.no-icon { padding-left: 15px; }");
GM_addStyle("#sub-tree-header { padding-left: 13px; }");

// Resize Navbar Divider
GM_addStyle(".selectors-footer { margin-left: 0px; margin-bottom: 10px; padding-bottom: 10px; }");

// Hide Explore Navlink
GM_addStyle("#lhn-recommendations { display: none; }");

// Resize Folder Navlinks
GM_addStyle(".folder-toggle { margin-left: 11px !important; margin-top: 2px !important; }");
GM_addStyle(".folder .folder a .icon { margin-left: 25px; }");

// Resize Feed Navlinks
GM_addStyle(".folder .folder ul .icon { margin-left: 35px; }");
GM_addStyle(".folder .folder .name-text { max-width: 158px; }");

// Add Card Border
GM_addStyle(".card { border: #CBCBCB solid 1px; }");

// Round Card Border
GM_addStyle(".card { border-radius: 3px; }");

// Add Navbar Border
GM_addStyle("#scrollable-sections-holder { border-right: #EBEBEB solid 1px; }");

// Make Navbar Scroll Boundaries Less Dark
GM_addStyle("#scrollable-sections-top-shadow { border-top: 1px solid rgba(0, 0, 0, 0.15); }");
GM_addStyle("#scrollable-sections-bottom-shadow { border-bottom: 1px solid rgba(0, 0, 0, 0.15); }");

// Add Side Border to List Item
GM_addStyle("#entries.list #current-entry { border-left: 2px solid #999999; border-right: 2px solid #999999; }");
GM_addStyle("#entries.list #current-entry.expanded .entry-actions { border-left: 0px; padding-left: 4px; border-right: 0px; padding-right: 4px; }");
GM_addStyle("#entries.list #current-entry .collapsed { margin-left: -2px; margin-right: -2px; }");

// Fix Card Margin & Padding
GM_addStyle(".card { margin-left: 10px; padding-left: 10px; margin-right: 9px; padding-right: 8px; }");
GM_addStyle(".card-content { padding-top: 6px !important; }");

// Fix Card & List View Padding
GM_addStyle("#entries { padding-right: 15px; }");

// Fix Card Footer Size
GM_addStyle(".card-bottom { margin-left: -14px; margin-right: -9px; margin-bottom: -1px; }");
GM_addStyle(".entry-actions .star { height: 12px; }");

// Feed Title!!!
GM_addStyle(".entry-title-link { color: #0000CC !important; }");

// Move Star Before Title
GM_addStyle(".card .entry-title-link { margin-left: 20px; }");
GM_addStyle(".entry-icons-placeholder { position:absolute; left:0px; top:0px; }");
GM_addStyle(".entry-icons { margin-left: 0px !important; }");

// Line Up Header & Footer Stars
GM_addStyle(".card .entry-actions .star { margin-left: 5px; }");

// Resize Collapsed List Items
GM_addStyle("#entries.list .collapsed { padding: 2px 0px 7px 0px !important; line-height: 2.7ex !important; }");
GM_addStyle("#entries.list .collapsed .entry-icons, #entries.list .collapsed .entry-source-title, #entries.list .collapsed .entry-secondary { top: 6px !important; }");
GM_addStyle("#entries.list .collapsed .entry-original { top: 6px !important; }");


// Blue Title
GM_addStyle("#chrome-title a { color: #0000CC; font-size: 20px; }");

// SUBSCRIBE BUTTON
GM_addStyle(".jfk-button-primary, .jfk-button-action { background: #0d1926; border-color: black; }");

// Increase Item Max Width
GM_addStyle(".entry .entry-body, .entry .entry-title, .entry .entry-likers { max-width: 750px !important; }");

// Hide Google+
GM_addStyle(".item-plusone { display: none !important; }");
