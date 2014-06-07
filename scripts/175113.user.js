// ==UserScript==
// @name         Hide Multireddit Sidebar
// @description  Collapse the annoying sidebar by default.
// @version      1.0.1
// @license      Public Domain
// @include      http*://*.reddit.com/
// @include      http*://*.reddit.com/r/all
// @grant        none
// ==/UserScript==

$('body').addClass('listing-chooser-collapsed');
store.set('ui.collapse.listingchooser', true);
