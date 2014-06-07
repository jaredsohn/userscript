// newzbin blue - myCss
// version 0.1
// myCss Copyright (c) 2006, Mike Cao
//  --Modified for v3.newzbin.com by sw1tch
//
// --------------------------------------------------------------------
// Usage:
// Create a new @include entry for each website you want to
// add your custom CSS to. If you want to use different CSS
// for multiple sites, just re-install this script using a
// different @name value for each CSS set you create.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           v3newzbin-blue
// @description    Modified myCss script to change v3.newzbin.com to Nostalgia colors
// @include        http://v3.newzbin.com/*
// @namespace      http://www.mikecao.com/
// ==/UserScript==

var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Define your CSS here
addStyle("a:visited,a:link {color: #0a376b;}");
addStyle("div#subheader {background-color: #e8f4ff;}");
addStyle("div#menu div.item {background-color: #eff7ff;}");
addStyle("div#menu h2.fpn {	background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.admin { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.bookmarks { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.categories  { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.editor_panel { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.feedlinks { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.filter { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.grouplists { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.quicklinks { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.saved_searches { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#menu h2.user_panel { background-color: #eff7ff;color: black;border: 1px solid #ccc;}");
addStyle("div#content fieldset { background-color: #fff;}");
addStyle("div#content fieldset legend {	background-color: #4682b4;}");
addStyle("div#content table.dataTabular { background-color: #4682b4;}");
addStyle("div#content table.dataTabular tfoot tr td { border-bottom: 1px solid #f0f8ff;}");
addStyle("div#content table.dataTabular tbody tr td {background-color: #f0f8ff;padding: 1px;}");
addStyle("div#content table.dataTabular tbody.odd tr td { background-color: #f0f8ff;}");
addStyle("div#content table.dataTabular tbody.even tr td {	background-color: #f0f8ff;}");
addStyle("div#content table.dataTabular tbody.new tr td { background-color: #4682b4;}");
addStyle("div#content table.dataTabular tbody.warn tr td {	background-color: #f0f8ff;}");
addStyle("div#content span.fComplete,div#content table.dataTabular tbody tr td.fComplete span {color: #000;}");
addStyle("div#content span.fPartial,div#content table.dataTabular tbody tr td.fPartial span {color: #a63e3f;}");
addStyle("div#content span.fDupes,div#content table.dataTabular tbody tr td.fDupes span {	color: #000;}");
addStyle("div#content span.fileSize,div#content table.dataTabular tbody tr td.fileSize span { color: #000;}");
addStyle("div#content table.dataTabular tbody.dateLine tr td {background-color: #4682b4;color: #fff;}");
addStyle("div#content span.ageVeryNew {	color: #000;}");
addStyle("div#content span.ageNew {color: #000;}");
addStyle("div#content span.ageRecent {color: #000;}");
addStyle("div#content span.ageOld {color: #000;}");
addStyle("div#content span.ageVeryOld {color: #000;}");
addStyle("div#comments div.odd div.body {background-color: #fff;	color: inherit;}");
addStyle("div#comments div.even div.body {background-color: #fff;	color: inherit;}");
addStyle("div#content table.dataTabular tbody tr td.title {	color: #fff;font-weight: normal;");
addStyle("div#comments div.item div.header {background-color: #4682b4;}");
addStyle("div#menu h2 a {color:black;}");
addStyle("div#menu h2 span a {background-color:#4682b4;}");

// Writes CSS to the document
writeStyle(css);

