// coding: utf-8
// ==UserScript==
// @name          youtube cool black
// @namespace     haluk ilhan
// @description   Youtube Earth Hour 2012 CSS
// @version       0.1.5
// @include       http://www.youtube.com/*
// @include       https://www.youtube.com/*
// ==/UserScript==\
GM_addStyle('\
body,\
.watch-branded #watch-main-container,\
.watch-branded #watch-sidebar {\
color: #fff;\
background: #000 url(//s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png);\
}\
#masthead-container {\
background: transparent;\
}\
/* Button overrides */\
.yt-uix-button-subscription,\
.yt-uix-button-default,\
.yt-uix-button-default:focus,\
body .yt-uix-button-default[disabled] {\
background-color: #454545;\
border-color: #333 #333 #000;\
text-shadow: 0 1px 0 rgba(0, 0, 0, .45);\
outline: 0;\
background-image: linear-gradient(to bottom,#474747 0,#2B2B2B 100%);\
background-image: -moz-linear-gradient(top,#474747 0,#2B2B2B 100%);\
background-image: -webkit-linear-gradient(top,#474747 0,#2B2B2B 100%);\
background-image: -o-linear-gradient(top,#474747 0,#2B2B2B 100%);\
background-image: -ms-linear-gradient(top,#474747 0,#2B2B2B 100%);\
filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, startColorStr="#FF474747", endColorStr="#FF2B2B2B");\
box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45));\
-moz-box-shadow: inset 0 1px 0 rgba(255,255,255,.45);\
-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,.45);\
-ms-box-shadow: inset 0 1px 0 rgba(255,255,255,.45);\
}\
.yt-uix-button-default, .yt-uix-button-subscription, a.yt-uix-button-default .yt-uix-button-content,\
.yt-uix-button-default,\
a.yt-uix-button-default .yt-uix-button-content {\
color: #fff;\
}\
.yt-uix-button-subscription:hover,\
.yt-uix-button-default:hover,\
.yt-uix-button-text:hover {\
color: #333;\
background-color: #333;\
box-shadow: 0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #666;\
-moz-box-shadow: 0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #666;\
-webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #666;\
-ms-box-shadow: 0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #666;\
}\
.yt-uix-button-default:active,\
.yt-uix-button-default.yt-uix-button-active,\
.yt-uix-button-default.yt-uix-button-toggled {\
background-color: #454545;\
background-image: linear-gradient(to bottom, #474747 0, #2B2B2B 100%);\
background-image: -moz-linear-gradient(bottom,#474747 0,#2B2B2B 100%);\
background-image: -webkit-linear-gradient(bottom,#474747 0,#2B2B2B 100%);\
background-image: -o-linear-gradient(bottom,#474747 0,#2B2B2B 100%);\
background-image: -ms-linear-gradient(bottom,#474747 0,#2B2B2B 100%);\
filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, startColorStr="#FF474747", endColorStr="#FF2B2B2B");\
box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.75), 0 1px 0 #333;\
-moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.75), 0 1px 0 #333;\
-webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.75), 0 1px 0 #333;\
-ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.75), 0 1px 0 #333;\
}\
.yt-uix-button-default:active,\
.yt-uix-button-text:active,\
.yt-uix-button-default.yt-uix-button-toggled,\
.yt-uix-button-text.yt-uix-button-toggled {\
border-color: #222;\
border-bottom-color: #666;\
border-top-color: #333;\
}\
.yt-uix-button-group:hover .yt-uix-button,\
.yt-uix-button-group-active .yt-uix-button {\
border-color: #666;\
}\
.yt-uix-button-default .yt-uix-button-arrow,\
.yt-uix-button-text .yt-uix-button-arrow {\
border-top-color: #fff;\
}\
.yt-uix-button:hover .yt-uix-slider-next-arrow,\
.yt-uix-button:focus .yt-uix-slider-next-arrow {\
border-left-color: #fff;\
}\
.yt-uix-button:hover .yt-uix-slider-prev-arrow,\
.yt-uix-button:focus .yt-uix-slider-prev-arrow {\
border-right-color: #fff;\
}\
.yt-uix-button-text,\
a.yt-uix-button-text .yt-uix-button-content {\
color: #666;\
}\
.yt-uix-button-text:active,\
.yt-uix-button-text.yt-uix-button-toggled {\
background-image: linear-gradient(to bottom,#474747 0,#2B2B2B 100%);\
background-image: -moz-linear-gradient(top,#474747 0,#2B2B2B 100%);\
background-image: -webkit-linear-gradient(top,#474747 0,#2B2B2B 100%);\
background-image: -o-linear-gradient(top,#474747 0,#2B2B2B 100%);\
background-image: -ms-linear-gradient(top,#474747 0,#2B2B2B 100%);\
filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, startColorStr="#FF474747", endColorStr="#FF2B2B2B");\
box-shadow: inset 0 1px 2px #333;\
-moz-box-shadow: inset 0 1px 2px #333;\
-webkit-box-shadow: inset 0 1px 2px #333;\
-ms-box-shadow: inset 0 1px 2px #333;\
}\
.yt-uix-button-text,\
body .yt-uix-button-text[disabled] {\
text-shadow: none;\
border-color: #333;\
box-shadow: 0 1px 0 #333;\
-moz-box-shadow: 0 1px 0 #333;\
-webkit-box-shadow: 0 1px 0 #333;\
-ms-box-shadow: 0 1px 0 #333;\
}\
.yt-tile-default,\
.yt-tile-default a,\
.yt-tile-visible,\
.yt-tile-visible a {\
color: #666;\
}\
.yt-tile-static,\
.yt-tile-visible,\
.yt-tile-default:hover {\
color: #333;\
}\
.video-list-item:hover a .title,\
.video-list-item:hover .stat {\
color: #333;\
}\
.yt-alert-naked .yt-alert-content {\
color: #fff;\
}\
/* Icon overrides */\
#watch-headline-user-info .yt-uix-button-icon-subscribe {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -97px -66px;\
}\
.yt-uix-button .yt-uix-button-icon-watch-like {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -75px -102px;\
}\
.yt-uix-button .yt-uix-button-icon-watch-unlike {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -112px -14px;\
}\
.unliked .yt-uix-button-icon-watch-unlike,\
.yt-uix-button:hover .yt-uix-button-icon-watch-unlike {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -18px -37px;\
}\
.yt-uix-button .yt-uix-button-icon-watch-flag {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -96px -119px;\
}\
.active .yt-uix-button-icon-watch-flag,\
.yt-uix-button:hover .yt-uix-button-icon-watch-flag {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -75px -66px;\
}\
.yt-uix-button-icon-addto {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) 0 -66px;\
}\
.yt-uix-button .yt-uix-button-icon-watch-insight {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -154px -207px;\
}\
img.comments-rating-thumbs-up {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -90px 0;\
}\
img.comments-rating-thumbs-down {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -132px -208px;\
}\
.comment .yt-uix-button .yt-uix-button-icon-watch-comment-vote-up,\
.comment .yt-uix-button:hover .yt-uix-button-icon-watch-comment-vote-up {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -61px -66px;\
}\
.comment .yt-uix-button .yt-uix-button-icon-watch-comment-vote-down,\
.comment .yt-uix-button:hover .yt-uix-button-icon-watch-comment-vote-down {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -33px -66px;\
}\
.yt-uix-button:hover .yt-uix-button-icon-watch-insight {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -235px -199px;\
}\
/* Related */\
#watch-sidebar .video-list-item a:hover {\
background-color: #ccc;\
border-bottom-color: #999;\
}\
/* Horizontal Rules */\
.yt-horizontal-rule {\
border-top-color: #333;\
border-bottom-color: #000;\
}\
.yt-uix-button-default:hover,\
.yt-uix-button-text:hover {\
border-color: #333;\
}\
.yt-tile-default.video-list-item a .title,\
#watch-sidebar .video-list-item .title {\
color: #666;\
}\
/* Watch MFU */\
#watch-channel-discoverbox {\
box-shadow: inset 0 4px 8px rgba(0,0,0,.05),0 1px 0 #333;\
-moz-box-shadow: inset 0 4px 8px rgba(0,0,0,.05),0 1px 0 #333;\
-webkit-box-shadow: inset 0 4px 8px rgba(0,0,0,.05),0 1px 0 #333;\
-ms-box-shadow: inset 0 4px 8px rgba(0,0,0,.05),0 1px 0 #333;\
}\
#watch-channel-discoverbox .video-list-item .title {\
color: #666;\
}\
.yt-uix-pager .yt-uix-button,\
.yt-uix-pager .yt-uix-pager-link,\
.yt-uix-pager .yt-uix-pager-selected {\
color: #fff;\
}\
/* Watch Description */\
#watch-description .expand,\
#watch-description .collapse {\
background-color: transparent;\
}\
#watch-description-expand,\
#watch-description-collapse {\
border-top-color: #333;\
}\
#watch-description-expand .yt-uix-button,\
#watch-description-collapse .yt-uix-button {\
color: #fff;\
text-shadow: 0 1px 0 #333;\
}\
#watch-description-expand .yt-uix-button:hover,\
#watch-description-collapse .yt-uix-button:hover {\
background-image: linear-gradient(to bottom,#333 0,#000 100%);\
background-image: -moz-linear-gradient(top,#333 0,#000 100%);\
background-image: -webkit-linear-gradient(top,#333 0,#000 100%);\
background-image: -ms-linear-gradient(top,#333 0,#000 100%);\
filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, startColorStr="#FF333333", endColorStr="#FF000000");\
}\
/* Masthead Section */\
#masthead-nav a,\
#masthead-user a,\
#masthead-nav a:hover,\
#masthead-user a:hover,\
#masthead-nav a:active,\
#masthead-user a:active {\
color: #ccc;\
}\
#masthead-expanded-container {\
box-shadow: 0 5px 5px #222;\
-moz-box-shadow: 0 5px 5px #222;\
-webkit-box-shadow: 0 5px 5px #222;\
-ms-box-shadow: 0 5px 5px #222;\
}\
/* Watch Headline Section */\
#watch-headline h1,\
#eow-title-input {\
color: #fff;\
}\
#masthead-user-expander .yt-uix-expander-head,\
#masthead-gaia-user-wrapper,\
#masthead-gaia-photo-wrapper {\
border-color: #000;\
}\
#masthead-search .search-btn-compontent .yt-uix-button-content {\
background: no-repeat url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -163px -102px;\
}\
#masthead-search-terms {\
background-color: #898989;\
}\
#masthead-search-terms input {\
color: #fff;\
text-shadow: 0 1px 1px #333;\
}\
.masthead-search-terms-border {\
border-color: #333;\
box-shadow: inset 0 1px 2px #333;\
-moz-box-shadow: inset 0 1px 2px #333;\
-webkit-box-shadow: inset 0 1px 2px #333;\
-ms-box-shadow: inset 0 1px 2px #333;\
}\
/* Watch Context */\
#watch-context {\
border-color: #333;\
}\
#watch-context .context-head {\
border-bottom-color: #333;\
}\
.context-link {\
color: #ccc;\
text-shadow: 0 0 0 rgba(255, 255, 255, 0),0 1px 0 #000;\
background-image: linear-gradient(to bottom,#333 0,#202020 100%);\
background-image: -moz-linear-gradient(top,#333 0,#202020 100%);\
background-image: -webkit-linear-gradient(top,#333 0,#202020 100%);\
background-image: -o-linear-gradient(top,#333 0,#202020 100%);\
background-image: -ms-linear-gradient(top,#333 0,#202020 100%);\
box-shadow: 0 1px 2px rgba(255,255,255,0.25),inset 0 0 3px #333;\
-moz-box-shadow: 0 1px 2px rgba(255,255,255,0.25),inset 0 0 3px #333;\
-webkit-box-shadow: 0 1px 2px rgba(255,255,255,0.25),inset 0 0 3px #333;\
-ms-box-shadow: 0 1px 2px rgba(255,255,255,0.25),inset 0 0 3px #333;\
}\
a.context-link:hover {\
background-image: linear-gradient(to bottom,#333 0,#202020 100%);\
background-image: -moz-linear-gradient(top,#333 0,#202020 100%);\
background-image: -webkit-linear-gradient(top,#333 0,#202020 100%);\
background-image: -o-linear-gradient(top,#333 0,#202020 100%);\
background-image: -ms-linear-gradient(top,#333 0,#202020 100%);\
}\
.context-seeall-icon {\
background: url(//s.ytimg.com/yt/img/earthhour/www-refresh-vflnJTVZv.png) -75px -37px;\
}\
.context-body {\
background: #222;\
}\
/* Watch Actions Section */\
#watch-actions-area {\
background: #333;\
box-shadow: 0 1px 1px #666;\
-moz-box-shadow: 0 1px 1px #666;\
-webkit-box-shadow: 0 1px 1px #666;\
-ms-box-shadow: 0 1px 1px #666;\
}\
#watch-description-toggle {\
border-top-color: #333;\
}\
.watch-sparkbars {\
border-color: #333;\
}\
.watch-view-count {\
color: #fff;\
}\
#insight-ratings td {\
color: #fff;\
}\
.watch-stats-title-cell {\
background-color: #666;\
}\
#flag-video-panel h3,\
#flag-video-panel label,\
#flag-video-panel-buttons,\
#flag-video-panel .flag-video-result {\
color: #fff;\
}\
.share-panel .share-options,\
.share-panel .share-options-secondary {\
border-color: #666;\
background-color: #333;\
box-shadow: 0 1px 0 #333,inset 0 1px 1px rgba(0,0,0,0.2);\
-moz-box-shadow: 0 1px 0 #333,inset 0 1px 1px rgba(0,0,0,0.2);\
-webkit-box-shadow: 0 1px 0 #333,inset 0 1px 1px rgba(0,0,0,0.2);\
-ms-box-shadow: 0 1px 0 #333,inset 0 1px 1px rgba(0,0,0,0.2);\
}\
.share-panel-show-more,\
.share-panel-show-url-options {\
color: #fff;\
}\
.share-panel-hangout .share-panel-hangout-description {\
color: #fff;\
}\
#watch-description-text {\
color: #666;\
}\
/* Comments */\
.comments-section h4 {\
border-bottom-color: #333;\
}\
.comments-post-alert {\
background-color: #333;\
}\
/* Footer */\
#footer ul {\
text-shadow: 0 1px 1px #333;\
}\
#footer-links-primary a,\
#footer-links-secondary a,\
#footer .pickers a,\
#picker-loading {\
color: #fff;\
}\
#footer-main .pickers .yt-uix-button {\
color: #fff;\
text-shadow: 0 1px 1px #333;\
}\
.yt-uix-form-input-text, .yt-uix-form-textarea { background: #333; border: 1px solid #333; border-top-color: #333; -webkit-box-shadow: 0 1px 0 #333; box-shadow: 0 1px 0 #333;}\
.watch-playlists-drawer ul { background: #333; border: none; padding: 0px; margin-botton: 0px; -webkit-box-shadow: 0 1px 0 #333; box-shadow: 0 1px 0 #333;}\
.feed-item-main .feed-item-actions-line {color: #1a1a1a !important;}\
#video-sidebar .video-list-item-link .title, #video-sidebar .recommended-videos-link {color: #A1A1A1;}\
#watch-video-annotation {background: transparent; border: none;}\
#feed-container {background: white !important;}\
.feed-item-main h4 {color: #D02525 !important;}\
.liked .yt-uix-button-icon-watch-like, .yt-uix-button:hover .yt-uix-button-icon-watch-like { background: no-repeat url(http://s.ytimg.com/yt/imgbin/www-refresh-vflmpZ5kj.png) 0 -139px;}\
');