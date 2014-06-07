// ==UserScript==
// @name       MORE Site Full Screen
// @namespace  *
// @version    0.1
// @description  Adjusts MORE Library site to use the entire screen
// @include        https://www.more.lib.wi.us/*
// @include        http://www.more.lib.wi.us/*
// @copyright  2011+, Michael Buchmann
// ==/UserScript==

// This works for MORE (WI) library site

// Use full page
GM_addStyle("body .fullPage {width: 100%;}");
// User page adjusts to fill the page
GM_addStyle("body .clear {clear: none;}");
GM_addStyle("body .patFuncArea {margin-top: 0px; width: 97%;}");
GM_addStyle("body .patActionItem {float: left; margin-left: 10px}");
GM_addStyle("body .patActionsLinks {width: 94%;}");
GM_addStyle("body .patActionsLinks a:link {margin-top: 3px;}");
