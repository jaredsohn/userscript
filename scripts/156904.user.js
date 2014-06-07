// ==UserScript==
// @name			NetvibesFixer
// @namespace	NetvibesFixer
// @version		3.1
// @description	NetvibesFixer
// @match		http://www.netvibes.com/*
// @match		https://www.netvibes.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @icon			http://www.netvibes.com/favicon.ico
// @copyright		2013, 2014+ Mike Salmon
// ==/UserScript==

$(function() {
    clock();
	setInterval(function(){
        clock()
    }, 2000);   
});

function clock() {
    
    if ( $('#custom-style').length == 0 ) {
    
    	$('head').append('<style type="text/css" id="custom-style"> \
.uwa-icon.options:before, .uwa-icon.delete:before { font-size: 12px; } \
.uwa-widget-menu-button { width: 16px; padding-right: 6px; } \
.moduleHeader .unread { color: #8B0000; } \
.moduleHeader .uwa-widget-menu-button { padding-bottom: 6px; } \
#maintable a:link { border-bottom: none; } \
.nv-pager { display: none; } \
.resizable .module { border-radius: 8px; } \
.moduleFrame { border-radius: 6px; } \
#divTabs li { color: #333333 } \
#divTabs li .unread { color: #8B0000 } \
.nv-feedList li { line-height: 13px; } \
.moduleHeader .uwa-widget-menu-button.uwa-icon.charts { display: none; } \
#columns .column .moduleFrame .moduleHeaderContainer { height: 24px; } \
#divTabs li.tab.selected { border-top: 1px solid #79A7E2; border-right: 1px solid #79A7E2; border-left: 1px solid #79A7E2; border-radius: 5px 5px 0 0; } \
</style>');
   
    }
}