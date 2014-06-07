// ==UserScript==
// @name           New Google Reader Rectifier
// @description    Fixes the new Google Reader's layout
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// @version        1.1.2
// ==/UserScript==

var overrideCSS = " \
#top-bar { height:45px !important; margin-top:-10px !important; padding-bottom:3px !important; }\
#logo {margin-top: -6px !important;}\
#viewer-header,#sections-header,#lhn-add-subscription-section{height: 32px !important; padding-bottom: 8px !important; margin-top:-4px !important;}\
#chrome-title{line-height:15px !important;}\
.entry-title-link{font-size: 16px !important; margin-left:-8px !important;}\
#entries{padding-right:0px !important;}\
#viewer-top-controls-container {margin-left: 61px !important;}\
#nav {width:200px !important;}\
.list>.entry:not(.expanded){height:29px !important;}\
.entry>div{padding-top:0px !important;padding-bottom:0px !important;}\
.entry>div>div,.entry>div>div>*{top:0px !important;line-height:20px !important;}\
.entry .entry-main{margin-right:8px !important;min-height:25px !important;}\
#overview .title,.entry .entry-main .entry-title,.entry .entry-main .entry-body{font-size:12px !important;  margin-left:8px !important;line-height:20px !important;max-width:800px !important;}\
#entries.list .collapsed .entry-main .entry-source-title{margin-top:3px !important;}\
.entry .entry-body{padding-left:8px !important;max-width:720px !important;}\
.entry .entry-container{padding-top:5px !important;padding-bottom:5px !important;}\
.entry .entry-main .entry-secondary{margin-right:8em !important;left:-8px !important;width:auto !important;}\
.samedir #entries.list .collapsed .entry-secondary{margin-top:3px !important;}\
.samedir #entries.list .collapsed .entry-date {margin-top: 3px !important;}\
.samedir #entries.list .collapsed .entry-main .entry-original {margin-top:7px !important;}\
#overview .overview-segment{margin-top:1em !important;margin-bottom:1em !important;}\
#scrollable-sections-holder{margin-left:-25px !important;}\
.cards .entry,.cards .card,.cards .card-content{padding-top:0px !important;padding-bottom:0px !important;}\
.entry .entry-icons .star {margin-top:5px !important;}\
#entries.list #current-entry .collapsed {border-left: 2px solid #999 !important; border-right:2px solid #999 !important;}\
#entries.list .entry .entry-container {border-left: 2px solid #999 !important; border-right:2px solid #999 !important;}\
#entries.list #current-entry.expanded .entry-actions{border-left: 2px solid #999 !important; border-right:2px solid #999 !important;}\
#item-up-down-buttons{padding-right:60px !important;}\
.samedir {padding-left:3px !important;}\
#recommendations-tree .lhn-section-primary{margin-top:-3px !important;}\
#chrome{min-width:400px !important; margin-left:200px !important;}\
";
GM_addStyle(overrideCSS);
