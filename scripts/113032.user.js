// ==UserScript==
// @name           Compact Toodledo Pro
// @namespace      http://nick.mosher.me/userscripts
// @description    Compacts the list view
// @include        http://www.toodledo.com/tasks/*
// @include        https://www.toodledo.com/tasks/*
// ==/UserScript==

GM_addStyle("#colhead .col1, .col1 {float:right;width:auto !important;} div#colhead, div#tasks {width:auto !important; min-width:940px;} #colhead .col512, #colhead .col2, #colhead .col65536, #colhead .col4, #colhead .col8, #colhead .col256, #colhead .col16, #colhead .col128, .col512, .col2, .col4, .col8,.col99, .col256, .col16, .col128, .col65536 {width:auto !important; float:right;} .col128 {float:left; font-size:.7em; padding-top:4px; color:blue;} .col512 span{color:purple; font-size:.7em; display:block; padding-top:4px;} .col256 {float:right;} .col4, .col8 {width:11px !important; background-color:#ddd;} .col99, .ax {float:right;} .col512{float:left;} .col1 {width: 36px !important; margin-right:0px;} .not{left: 233px; position: absolute;} .col0 {margin-left:17px; max-width: 600px; width: auto;} .subp, .subtasks .subm, .subm, .bsub {margin-right:-12px;} .subtasks .not {left:251px;} .col2 .dim:before {content: 'due ';} .col65536 .dim:before {content: 'start';} .col2 .dim,.col65536 .dim {width: 24px !important; overflow: hidden; text-overflow:clip; display:block;}");