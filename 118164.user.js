// ==UserScript==
// @name           CAR UI Fixer
// @author         Matt JAcobi
// @namespace      NI CAR
// @description    Fixes miscellaneous elements of the CAR user interface
// @homepage       https://userscripts.org/scripts/show/118164
// @updateURL      https://userscripts.org/scripts/source/118164.meta.js
// @downloadURL    https://userscripts.org/scripts/source/118164.user.js
// @include        http://nippm*/itg/dashboard/app/portal/*
// @version        2.0
// ==/UserScript==

// Fix Page Margins
GM_addStyle(".margin { padding-bottom: 0px !important; }");
GM_addStyle(".page-margins { padding: 0px 0px 0px 10px !important; }");

// Fix Toolbar Size
GM_addStyle(".yui-b { padding-bottom: 0px !important; }");
GM_addStyle(".portal-page-title-spacing { padding-top: 0px !important; padding-bottom: 0px !important; }");
GM_addStyle(".portal-page-toolbar-button-spacing { padding-top: 0px !important; padding-bottom: 0px !important; }");

// Fix Portlet Spacing
GM_addStyle(".portlet-area-wide, .portlet-area-narrow { padding-bottom: 8px !important; }");
GM_addStyle(".portlet-group-narrow1 { padding-right: 4px !important; }");
GM_addStyle(".portlet-group-narrow2 { padding-left: 4px !important; }");

// Fix Portal Header Fields Wrapping
GM_addStyle(".portlet-table-header { white-space: nowrap !important; }");
