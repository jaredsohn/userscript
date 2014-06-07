// ==UserScript==
// @name           Google Reader UI Fixer
// @author         StealthMonkey
// @namespace      http://www.stealthmonkey.com
// @description    Fixes multiple issues with the Google Reader user interface
// @homepage       https://userscripts.org/scripts/show/116868
// @updateURL      https://userscripts.org/scripts/source/116868.meta.js
// @downloadURL    https://userscripts.org/scripts/source/116868.user.js
// @include        http*://www.google.*/reader/*
// @version        2.4
// ==/UserScript==

// Version 2.4:
//  - Updated script meta data for automatic updating

// Version 2.3:
//  - Updated script to fix navbar padding and border for the new Google UI
//  - Made clicking the Google logo navigate to Google Reader for the new Google UI
//
// Version 2.2:
//  - Updated script to handle Google Reader changes on 12/14/2011
//
// Version 2.1:
//  - Reduced size of dropdown menu items
//  - Reduced size of tab headers
//  - Adjusted padding around cards
//
// Version 2.0:
//  - Updated script to handle Google Reader changes on 11/28/2011
//  - Made other minor adjustments to miscellaneous UI elements
//  - Refactored and reorganized script
//
// Version 1.6:
//  - Fixed incorrect display of items in list view due to Google change
//  - Locked the width of the navbar across all display densities to ensure things always display properly
//  - Tweaked the alignment of the Google Reader logo, Subscribe button, and the search field
//  - Reduced height of item footers
//  - Adjusted alignment of footer stars
//  - Removed obsolete code
//
// Version 1.5:
//  - Fixed compatibility with the Google Reader Preview Enhanced script
//
// Version 1.4:
//  - Fixed indentation of tree items if they are not in a folder
//
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
GM_addStyle("#lhn-add-subscription-section, #viewer-header, #sections-header { height: 43px; margin-right: inherit; }");
GM_addStyle("#lhn-add-subscription, #viewer-top-controls-container, #sections-header .contents { margin-top: -15px; }");

// Resize Third Bar
GM_addStyle("#title-and-status-holder { padding: 2px 0px 0px 5px; }");

// Resize Home Page Elements
GM_addStyle("#sections-holder { padding-right: 0px; }");
GM_addStyle("#sections-header .settings-button-container { margin-right: 3px; }");

// Resize Dropdown Menu Items
GM_addStyle(".goog-menuheader, .goog-menuitem { padding-top: 1px; padding-bottom: 1px; border: none; }");
GM_addStyle(".goog-menu { padding: 0px; }");

// Resize Tab Headers
GM_addStyle(".tab-header, #settings #settings-navigation .link { padding: 4px; }");

// Resize Navbar, Center Logo and Subscribe Button, Line Up Search Field and Refresh Button
GM_addStyle("#nav, #lhn-add-subscription-section, #scrollable-sections-top-shadow, #scrollable-sections-bottom-shadow { width: 264px; }");
GM_addStyle("#search { margin-left: 267px; }");
GM_addStyle("#logo { margin-left: 60px; }");
GM_addStyle("#lhn-add-subscription { margin-left: 80px; top: 23px !important; }");
GM_addStyle("#lhn-add-subscription-section { height: 45px !important; width: 263px; border-right: #EBEBEB solid 1px; }");
GM_addStyle("#logo-section { height: 31px; line-height: 31px; padding-left: 16px; }");

// Add Navbar Border
GM_addStyle("#scrollable-sections-holder { border-right: #EBEBEB solid 1px; }");

// Make Navbar Scroll Boundaries Less Dark
GM_addStyle("#scrollable-sections-top-shadow { border-top: 1px solid rgba(0, 0, 0, 0.15); }");
GM_addStyle("#scrollable-sections-bottom-shadow { border-bottom: 1px solid rgba(0, 0, 0, 0.15); }");

// Resize Home, All Items, Starred Items, Trends, Browse, & Subscription Navlinks
GM_addStyle("#scrollable-sections-holder .section-minimize { left: -1px; top: 3px; }");
GM_addStyle("#scrollable-sections-holder .lhn-section-primary { line-height: 21px; }");
GM_addStyle("#reading-list-unread-count, #reading-list-selector .label { display: inline; }");
GM_addStyle("#home-section { padding: 0px; }");
GM_addStyle("#overview-selector, #sub-tree-header, #lhn-selectors .selector, #lhn-selectors .lhn-section-secondary .selector.no-icon { padding-left: 13px; }");

// Resize Navbar Divider
GM_addStyle("#scrollable-sections-holder .selectors-footer { margin-left: 0px; margin-bottom: 10px; padding-bottom: 10px; }");

// Hide Explore Navlink
GM_addStyle("#lhn-recommendations { display: none; }");

// Resize Folder Navlinks
GM_addStyle("#scrollable-sections-holder .folder-toggle { margin-left: 11px; margin-top: 2px; }");
GM_addStyle("#scrollable-sections-holder .folder .folder a .icon { margin-left: 25px; }");

// Resize Feed Navlinks In Folders
GM_addStyle("#scrollable-sections-holder .folder .folder ul .icon { margin-left: 35px; }");
GM_addStyle("#scrollable-sections-holder .folder .folder .name-text { max-width: 158px; }");

// Resize Feed Navlinks Not In folders
GM_addStyle("#scrollable-sections-holder .folder .sub-icon { margin-left: 25px; }");

// Fix Padding of Card & List Views
GM_addStyle("#entries { padding: 0px; }");

// Increase Entry Max Width
GM_addStyle("#entries .entry .entry-body, #entries .entry .entry-title { max-width: 750px; }");

// Hide Google+
GM_addStyle("#entries .item-plusone { display: none !important; }");

// Round Card Border
GM_addStyle("#entries.cards .card { border-radius: 4px; }");

// Move Star Before Title In Card View
GM_addStyle("#entries.cards .card .entry-title-link { margin-left: 20px; }");
GM_addStyle("#entries.cards .entry-icons-placeholder { position: absolute; left: 0px; top: 0px; }");
GM_addStyle("#entries.cards .entry-icons { margin-left: 0px; }");

// Fix Card Margin & Padding
GM_addStyle("#entries.cards .card { margin-left: 6px; margin-right: 5px; }");
GM_addStyle("#entries.cards .card-content { padding: 5px 5px 5px 8px; }");
GM_addStyle("#entries.cards .entry { margin-top: 10px; margin-bottom: 10px; }");
GM_addStyle("#entries.cards .entry-0 { margin-top: 6px; }");

// Add Selected Card Border To All Sides
GM_addStyle("#entries.cards #current-entry .card { border-color: #4D90F0; }");

// Reduce Height of Card Footers
GM_addStyle("#entries.cards .card-actions { height: 25px; }");
GM_addStyle("#entries.cards .entry-actions { padding-top: 5px; }");
GM_addStyle("#entries.cards .entry-actions .star { padding-top: 0px; margin-left: 1px; }");

// Resize List Items
GM_addStyle("#entries.list .entry .collapsed { height: 22px !important; }");
GM_addStyle("#entries.list .collapsed .entry-source-title, #entries.list .collapsed .entry-title, #entries.list .collapsed .entry-date { line-height: 22px; }");

// Add Selected List Item Border To All Sides
GM_addStyle("#entries.list #current-entry { border: 1px solid #4D90F0; margin-top: -1px; }");
GM_addStyle("#entries.list #current-entry .collapsed .entry-date { margin-right: 29px; }");
GM_addStyle("#entries.list #current-entry .collapsed .entry-main .entry-original { margin-right: -1px; }");
GM_addStyle("#entries.list #current-entry > DIV { border-left: none !important; }");

// Reduce Height of List Item Footers
GM_addStyle("#entries.list .entry .entry-actions { height: 14px; padding-top: 5px; }");
GM_addStyle("#entries.list .entry .entry-actions .star { padding-top: 0px; margin-left: -2px; }");

// Make Google Logo Link to Google Reader
var logo = document.getElementById('gbqlw');
if (logo != null) {
    var baseUrl = document.location.protocol + "//" + document.location.hostname + document.location.pathname;
    logo.innerHTML = '<a href="' + baseUrl + '" style="outline: 0;">' + logo.innerHTML + '</a>';
}