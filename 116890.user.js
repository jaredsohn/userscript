// ==UserScript==
// @name          Google Reader compact
// @namespace     greadercompact
// @description   This CSS tweak will make Google Reader's new look more compact, adn less grey :) 
// @include       http://www.google.*
// @include       https://www.google.*
// ==/UserScript==
var d = document;
if( d.location.href.match(new RegExp('reader/view')) ){
var cs = d.createElement('style');
cs.id='lipsumar-compact-style';
cs.innerHTML = '#entries.list .entry .collapsed{border-width:0 !important;padding:3px 0 !important;} #entries.list .entry.expanded .collapsed{border-top-width:2px !important;} #top-bar{height:43px !important;} #search{padding:7px 0 !important;} #lhn-add-subscription-section{height:39px !important;} #viewer-header{height:39px !important;} #entries.list .read .collapsed{background:#f4f4fc !important;}';
d.body.appendChild(cs);
}