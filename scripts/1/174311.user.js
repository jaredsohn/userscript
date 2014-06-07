// ==UserScript==
// @name        Youtube "/ geekweek" (2013) color scheme
// @include     *.youtube.com/*
// @version     0.2
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js    
//##Jquery##
$('#watch7-content').css('background', 'transparent');
$('#watch7-headline').css('background', 'transparent');
$('#watch7-user-header').css('background', 'transparent');
$('#watch7-action-panels').css('background', 'transparent');
$('#watch7-action-buttons').css('background', 'transparent');
$('#footer-container').css('background-color','transparent');
$('#yt-masthead-container').css('background-color','transparent');
$('#watch7-action-panel-footer').css('background-color','transparent');
//remove footer, can uncomment to get back.
$('#footer-container').remove();
// End of jquery :D //
// ==/UserScript==
GM_addStyle("#body-container {background-color:#000}");
GM_addStyle("#eow-title {color:#0f0}");
GM_addStyle(".comments-post-alert,.comments-pagination button,#watch-description-expand button,#watch-description-collapse button,#footer-container button,.yt-subscription-button-subscriber-count-branded-horizontal,#action-panel-share input,#yt-masthead-content span a,#yt-masthead-content input{background-color:#333;color:#999}");
GM_addStyle("#watch7-headline .yt-uix-expander-head:hover {color:#0f0}");
GM_addStyle("#page-container {color:#0f0;font-family:monospace}");
GM_addStyle("#page-container .guide-item{color:#0f0}");
GM_addStyle("#page-container .branded-page-v2-primary-col{background-color:#000;border:0px}");
GM_addStyle("#page-container #results .pyv-promoted-videos{background-color:#333}");
GM_addStyle("#page-container .yt-alert-message{color:#0f0}");
GM_addStyle("#page-container .filter-bar-container .num-results{color:#0f0}");
GM_addStyle("#page-container .filter-bar-container .num-results strong{color:#f00}");
GM_addStyle("#page-container #filter-dropdown{background-color:#000}");
GM_addStyle("#page-container #filter-dropdown .filter-col-title{color:#f00}");
GM_addStyle("#page-container #filter-dropdown .filter{color:#0f0}");
GM_addStyle("#page-container .promoted-videos .promoted-videos-syah,#page-container .promoted-videos .promoted-videos-helpcenter{color:#777}");
GM_addStyle("#page-container .yt-lockup2{color:#0f0}");
GM_addStyle("#page-container .yt-lockup2 .yt-lockup2-title{font-size:12px}");
GM_addStyle("#page-container .yt-lockup2 .yt-user-name{color:#ff0}");
GM_addStyle("#page-container .yt-lockup2 .yt-lockup2-description a{color:#2793e6}");
GM_addStyle("#page-container .yt-lockup2 .yt-badge{color:#fff}");
GM_addStyle("#page-container #search-results{padding:0 20px 20px 30px}");
GM_addStyle("#page-container .geek-week-layout-header{padding-bottom:20px}");
GM_addStyle("#page-container .geek-week-layout-result-item{font-size:12px;color:#fff;padding-bottom:10px}");
GM_addStyle("#page-container .geek-week-layout-result-item .geek-week-username a{color:#ff0}");
GM_addStyle("#page-container .geek-week-layout-result-item .geek-week-title{font-weight:bold;font-size:14px}");
GM_addStyle("#page-container .geek-week-layout-result-item.video .geek-week-title a{color:#2793e6}");
GM_addStyle("#page-container .geek-week-layout-result-item.playlist .geek-week-title a{color:#0ff}");
GM_addStyle("#page-container .geek-week-layout-result-item.channel .geek-week-title a{color:#ff8c00}");
GM_addStyle("#page-container .geek-week-layout-result-item .geek-week-description{padding-left:25px}");
GM_addStyle("#page-container .geek-week-layout-result-item .geek-week-description a{color:#fff}");
GM_addStyle("#page-container .search-header,#page-container #search-tips-top,#page-container #search-tips-bottom{visibility:hidden}");
GM_addStyle("#page-container .search-pager .yt-uix-button{border:initial;-moz-box-shadow:initial;-ms-box-shadow:initial;-webkit-box-shadow:initial;box-shadow:initial}");
GM_addStyle("#page-container .search-pager .yt-uix-button-default{background:initial;border-color:initial;color:#f0f}");
GM_addStyle("#page-container .search-pager .yt-uix-button-toggled{color:#fff}");