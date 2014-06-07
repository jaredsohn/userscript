// ==UserScript==
// @name           Google Reader+ for Widesreens (1000px width & fixes)
// @description    Add a few CSS rules to fix Google Reader on the center of the screen with a width of 1000px, leaving 670px for content. Also adds a few tiny esthetic tweaks to the new G+ UI.
// @namespace      greader4widescreen
// @include        *.google.com/reader/*
// @exclude        *.google.com/reader/play*
// ==/UserScript==

var style="#main,#top-bar{margin:0 auto;width:1000px;border-left:1px solid #EBEBEB;border-right:1px solid #EBEBEB}#lhn-add-subscription{margin:-15px 0 0 15px}#viewer-top-controls-container{margin-top:-15px}#scrollable-sections-bottom-shadow{border-bottom:1px solid #EBEBEB;opacity:0.6;}#viewer-container{border-left:1px solid #EBEBEB;}#viewer-entries-container{margin-left:-1px;}#viewer-container img{max-width:700px;height:auto}.entry .entry-body, .entry .entry-title, .entry .entry-likers, .entry iframe{max-width:700px}.card{border-width:0 0 0 2px}#current-entry .card{border-left: 2px solid #4D90F0}#entries{padding:0}#entries.cards .card-content{padding:10px}.entry .entry-actions{padding:6px 10px}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);