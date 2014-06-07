// ==UserScript==
// @name					G Reader GoLarge
// @namespace			G-Reader-GoLarge
// @description		Inspired by isriya.com/node/2735
// @include				https://*.google.com/reader/*
// @include				http://*.google.com/reader/*
// @include				htt*://*.google.*/reader/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
 
'a#logo-container,' +
'#gbar,' +
'#guser,' +
'#logo,' +
'#global-info,' +
'#lhn-add-subscription-section,' +
'#chrome-lhn-toggle,' +
'#chrome-header,' +
'#chrome.search-stream #viewer-single-parent,' +
'#viewer-details-toggle,' +
'#viewer-footer,' +
'.message-area,' +
'.loaded div#search {' +
'  display: none;' +
'}' +
 
'#main {' +
'  top: 25px!important;' +
'}' +

'.cards .entry-0,' +
'.cards .entry {' +
'	padding: 0 !important;' +
'}' +

'.card-common {' +
'	margin: 0 !important;' +
'}' +

'.entry .card {' +
'	border-width: 4px !important;' +
'	border-color: #EEE !important;' +
'	border-style: solid !important;' +
'	-moz-border-radius: 0 !important;' +
'	-moz-box-shadow: none !important;' +
'}' +

'#current-entry .card {' +
'	border-width: 4px !important;' +
'	border-color: #ACF !important;' +
'	border-style: solid !important;' +
'}' +

'.entry .card .card-content,' +
'#current-entry .card .card-content {' +
'	padding: 10px 5px !important;' +
'}' +

'#entries-status {' +
'	width: auto !important;' +
'}');


var topControls = document.getElementById("viewer-top-controls");

var upButt = document.getElementById("entries-up");
var downButt = document.getElementById("entries-down");
var statusButt = document.getElementById("entries-status");

topControls.appendChild(upButt);
topControls.appendChild(downButt);
topControls.appendChild(statusButt);