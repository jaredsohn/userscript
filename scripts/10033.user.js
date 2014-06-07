// ==UserScript==
// @name           facebook left menu always expanded
// @description    Makes the menu on the left always expended, with no 'more' or 'less' or horizontal bar.
// @namespace      znerp
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle(".divider_bar, .more_section, #ssponsor {"+
              "  display: none !important; }"+
              "#expandable_more {"+
              "  display: block !important; "+
              "  padding-top: 0px !important; }");