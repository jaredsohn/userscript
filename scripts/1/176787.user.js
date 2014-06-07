
// ==UserScript==

// @name           Youtube Dark And Black Edited
// @description    Dark Theme for Youtube (specially at night) based on Youtube Black & Red by TyrionGraphiste
// @include        https://www.youtube.com/*
// @include        https://youtube.com/*
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// @version 1.16
// ==/UserScript==

// Last updated : Wednesday, July 26, 2013.

function addGlobalStyle(css){

    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
	
}


/* ---------------------------- HOME ---------------------------- */


// Stylesheet
addGlobalStyle('body, .watch-branded #watch-main-container, .watch-branded #watch-sidebar {color: #1a1a1a !important; background: #000 url(//s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png);}')
addGlobalStyle('#yt-masthead-container {background: url("http://img255.imageshack.us/img255/8419/20934561.png") repeat scroll 0 0 #131313; border-bottom: 1px solid #a1a1a1;}')
addGlobalStyle('.feed-item-main .feed-item-actions-line {color: #1a1a1a !important;}')
addGlobalStyle('#video-sidebar .video-list-item-link .title, #video-sidebar .recommended-videos-link {color: #A1A1A1;}')
addGlobalStyle('#watch-owner-container label, .watch-info-inline-edit label {color: black;}')

/* Button overrides */
addGlobalStyle('.yt-uix-button-default,.yt-uix-button-default:focus,body .yt-uix-button-default[disabled] {background-color: #454545;border-color: #333 #333 #000;text-shadow: 0 1px 0 rgba(0, 0, 0, .45);outline: 0;background-image: linear-gradient(to bottom,#474747 0,#2B2B2B 100%);background-image: -moz-linear-gradient(top,#474747 0,#2B2B2B 100%);background-image: -webkit-linear-gradient(top,#474747 0,#2B2B2B 100%);background-image: -o-linear-gradient(top,#474747 0,#2B2B2B 100%);background-image: -ms-linear-gradient(top,#474747 0,#2B2B2B 100%);filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, startColorStr="#FF474747", endColorStr="#FF2B2B2B");box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45));-moz-box-shadow: inset 0 1px 0 rgba(255,255,255,.45);-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,.45);-ms-box-shadow: inset 0 1px 0 rgba(255,255,255,.45);}')
addGlobalStyle('.yt-uix-button-default,a.yt-uix-button-default .yt-uix-button-content {color: #fff;}.yt-uix-button-default:hover,.yt-uix-button-text:hover {background-color: #333;box-shadow: 0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #666;-moz-box-shadow: 0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #666;-webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #666;-ms-box-shadow: 0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #666;}')
addGlobalStyle('.yt-uix-button-default:active,.yt-uix-button-default.yt-uix-button-active,.yt-uix-button-default.yt-uix-button-toggled {background-color: #454545;background-image: linear-gradient(to bottom, #474747 0, #2B2B2B 100%);background-image: -moz-linear-gradient(bottom,#474747 0,#2B2B2B 100%);background-image: -webkit-linear-gradient(bottom,#474747 0,#2B2B2B 100%);background-image: -o-linear-gradient(bottom,#474747 0,#2B2B2B 100%);background-image: -ms-linear-gradient(bottom,#474747 0,#2B2B2B 100%);filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, startColorStr="#FF474747", endColorStr="#FF2B2B2B");box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.75), 0 1px 0 #333;-moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.75), 0 1px 0 #333;-webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.75), 0 1px 0 #333;-ms-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.75), 0 1px 0 #333;}')
addGlobalStyle('.yt-uix-button-default:active,.yt-uix-button-text:active,.yt-uix-button-default.yt-uix-button-toggled,.yt-uix-button-text.yt-uix-button-toggled {border-color: #222;border-bottom-color: #666;border-top-color: #333;}')
addGlobalStyle('.yt-uix-button-group:hover .yt-uix-button,.yt-uix-button-group-active .yt-uix-button {border-color: #666;}.yt-uix-button-default .yt-uix-button-arrow,.yt-uix-button-text .yt-uix-button-arrow {border-top-color: #fff;}')
addGlobalStyle('.yt-uix-button:hover .yt-uix-slider-next-arrow,.yt-uix-button:focus .yt-uix-slider-next-arrow {border-left-color: #fff;}.yt-uix-button:hover .yt-uix-slider-prev-arrow,.yt-uix-button:focus .yt-uix-slider-prev-arrow {border-right-color: #fff;}')
addGlobalStyle('.yt-uix-button-text,a.yt-uix-button-text .yt-uix-button-content {color: #666;}')
addGlobalStyle('.yt-uix-button-text:active,.yt-uix-button-text.yt-uix-button-toggled {background-image: linear-gradient(to bottom,#474747 0,#2B2B2B 100%);background-image: -moz-linear-gradient(top,#474747 0,#2B2B2B 100%);background-image: -webkit-linear-gradient(top,#474747 0,#2B2B2B 100%);background-image: -o-linear-gradient(top,#474747 0,#2B2B2B 100%);background-image: -ms-linear-gradient(top,#474747 0,#2B2B2B 100%);filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, startColorStr="#FF474747", endColorStr="#FF2B2B2B");box-shadow: inset 0 1px 2px #333;-moz-box-shadow: inset 0 1px 2px #333;-webkit-box-shadow: inset 0 1px 2px #333;-ms-box-shadow: inset 0 1px 2px #333;}')
addGlobalStyle('.yt-uix-button-text,body .yt-uix-button-text[disabled] {text-shadow: none;border-color: #333;box-shadow: 0 1px 0 #333;-moz-box-shadow: 0 1px 0 #333;-webkit-box-shadow: 0 1px 0 #333;-ms-box-shadow: 0 1px 0 #333;}.yt-tile-default,.yt-tile-default a,.yt-tile-visible,.yt-tile-visible a {color: #666;}.yt-tile-static,.yt-tile-visible,.yt-tile-default:hover {color: #333;}.video-list-item:hover a .title,.video-list-item:hover .stat {color: #333;}')
addGlobalStyle('.yt-alert-naked .yt-alert-content {color: #fff;}')
addGlobalStyle('.masthead-search-terms-border {border: none; box-shadow: inset 0 1px 2px rgb(78, 78, 78);}')
addGlobalStyle('#masthead-search.consolidated-form input {color: #FFF;}')

/* Icon overrides */
addGlobalStyle('#footer-main .pickers .yt-uix-button {color: #fff;}');
addGlobalStyle('#footer .yt-uix-button:hover .yt-uix-button-icon-footer-language {background-position: -12px -21px;}');

// Global
addGlobalStyle('.yt-uix-button-default:hover, .yt-uix-button-content:hover, .yt-uix-button-default:hover, body .yt-uix-button-default[disabled]:hover {color: rgb(255, 255, 255) !important;}')

// Custom browse / upload buttons for better visibility
addGlobalStyle('#masthead-search .search-btn-component, #masthead-search .search-btn-component .start, #yt-masthead a.yt-uix-button, .yt-uix-button-group .end {background-color: #454545; background-image: -moz-linear-gradient(center top , #474747 0pt, #2B2B2B 100%); border-color: #333333 #333333 #000000; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.45) inset; outline: 0 none; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.45); #masthead .masthead-link-separator {color: #999999;}');

//Custom Youtube logo
addGlobalStyle('#yt-masthead #logo { width: 72px; height: 37px; margin-top: -5px; background-size: auto; background: url(http://img4.hostingpics.net/pics/685330youtubelogo.png) no-repeat;}');

//extra rules (thanks Burn)
// Region picker, language picker, safetymode picker
addGlobalStyle('#region-picker, #language-picker, #safetymode-picker {background: none repeat scroll 0 0 #000000; border: 0 none}');
// Comments :hover
addGlobalStyle('.comments-section .yt-tile-default:hover {background-color: #777}');
// Related Videos :hover
addGlobalStyle('#watch-sidebar .video-list-item a:hover {background-color: #777;border-bottom-color: #999999}');


/************layout fixes***************/


// Main content
addGlobalStyle('.branded-page-v2-has-solid-bg .branded-page-v2-col-container {border: 1px solid rgb(87, 87, 87); border-top : none;}')
addGlobalStyle('.branded-page-v2-has-solid-bg .branded-page-v2-secondary-col {border-left: none;}')
addGlobalStyle('.branded-page-v2-has-solid-bg .branded-page-v2-primary-col {border-left: none !important; border-bottom: none !important;}')
addGlobalStyle('.lohp-shelf-cell-container:hover {background: rgb(41, 41, 41);}')
/* Border articles */
addGlobalStyle('.lohp-shelf-cell-container {border-right: 1px solid rgb(87, 87, 87); border-bottom: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('.lohp-medium-shelves-container {border-left: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('.lohp-large-shelf-container {border-right: 1px solid rgb(87, 87, 87);}')
/* News articles */
addGlobalStyle('.lohp-newspaper-shelf {border-bottom: 1px solid rgb(87, 87, 87);}')

// Style global buttons hover and focus
addGlobalStyle('.yt-uix-button:focus, .yt-uix-button:focus:hover, .yt-uix-button-focused, .yt-uix-button-focused:hover {box-shadow: none;}');
addGlobalStyle('#masthead-search input:focus {border-color: rgb(222, 176, 176);}');
addGlobalStyle('.gsfe_b, .gsfe_a {border: none !important;}');


// Top heading background
addGlobalStyle('#yt-masthead-container.yt-masthead-hh, .branded-page #content, body > #body-container {background-image: url("http://s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png") !important;}');

// Top-top bar background
addGlobalStyle('#yt-masthead-container.yt-masthead-hh {border-bottom: 1px solid #333333!important; background-image: url("http://s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png")!important;}');

// Blue alert bar
addGlobalStyle('.yt-alert-default.yt-alert-info, .yt-alert-actionable.yt-alert-info, .yt-alert-naked.yt-alert-info .yt-alert-icon, .yt-alert-small.yt-alert-info {background: none repeat scroll 0 0 #777777 !important; border-color: #333333 !important;');

// Front page body background
addGlobalStyle('.branded-page-v2-col-container {background: url(http://img255.imageshack.us/img255/8419/20934561.png) !important;');
addGlobalStyle('.branded-page-v2-col-container-bottom-border {border-bottom: 1px solid #444444;}');

// Feed headings on front page font fix
addGlobalStyle('.feed-item-main .feed-item-actions-line, .feed-item-content .yt-user-name, .feed-item-content .metadata .view-count {color: #A1A1A1 !important;');

// Footer
addGlobalStyle('body #footer-container {border-top: 1px solid #a1a1a1;}');
addGlobalStyle('body #footer-hh-container {background-color: #555555 !important;border-top: 1px solid #444444;');
addGlobalStyle('body #footer-container {background: url("http://img15.hostingpics.net/pics/13875220934561.png") !important; }');
addGlobalStyle('#footer-logo img {width: 95px !important; height: 40px !important; background: url(data:image/png;base64,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%3D%3D) no-repeat !important;}');
addGlobalStyle('#footer-main {border-bottom: 1px solid rgb(87, 87, 87);');
/* Lang choice */
addGlobalStyle('#yt-picker-country-footer, #yt-picker-language-footer, #yt-picker-safetymode-footer {background: rgb(46, 46, 46);');
/* h2 */
addGlobalStyle('.yt-default h1, .yt-default h2, .yt-default h3, .yt-default h4, .yt-default h5, .yt-default h6, h1.yt, h2.yt, h3.yt, h4.yt, h5.yt, h6.yt {color: rgb(189, 189, 189);');
/* Country choice */
addGlobalStyle('.yt-picker-region-name {color: rgb(202, 202, 202);}');

// Top buttons text colour fix
addGlobalStyle('.yt-uix-button-hh-default, .yt-uix-button-subscription, a.yt-uix-button-hh-default .yt-uix-button-content {color: #A1A1A1 !important;}');

// Video view count colour fix for premium channels
addGlobalStyle('.watch-view-count {color: #BBBBBB !important;}');

// Premium channel video body fix
addGlobalStyle('#watch7-content {background: url("http://img15.hostingpics.net/pics/13875220934561.png") !important; repeat scroll 0 0 transparent;');
addGlobalStyle('#watch7-action-panels #watch7-action-panel-footer {background: url("http://img15.hostingpics.net/pics/13875220934561.png") repeat scroll 0 0 transparent;');
addGlobalStyle('#watch7-discussion, #watch7-action-panels {-moz-border-bottom-colors: #222222; -moz-border-left-colors: #222222; -moz-border-right-colors: #222222; -moz-border-top-colors: #222222;');
addGlobalStyle('#watch7-secondary-actions .yt-uix-button {color: #FFFFFF;}');

// Video page text reply colour
addGlobalStyle('.comment-text, .exp-watch7-comment-ui .comment .author {color: #AAAAAA;}');

// Global links
addGlobalStyle('a {color: rgba(139, 1, 1, .95);');
addGlobalStyle('.branded-page-related-channels h2 a:hover, .branded-page-related-channels h3 a:hover, .branded-page-related-channels-item .yt-uix-button-link:hover {color: rgba(139, 1, 1, .95);');
addGlobalStyle('.branded-page-v2-secondary-col .branded-page-related-channels-see-more a {color: rgb(87, 87, 87);');
addGlobalStyle('.branded-page-v2-secondary-col .branded-page-related-channels-see-more a:hover {color: rgba(139, 1, 1, .95);');
addGlobalStyle('#footer-links-primary a:hover {color: rgba(139, 1, 1, .95);');
addGlobalStyle('#footer-links-secondary a:hover {color: rgba(139, 1, 1, .95);');
addGlobalStyle('.feed-item-container:hover .feed-item-header a, .feed-item-container:hover a.yt-user-name {color: rgba(139, 1, 1, .95);');

// Guide personnal container
addGlobalStyle('#page.watch #guide-container.branded {top: 0;}');
addGlobalStyle('#guide-container {background: rgba(180, 180, 180, .180) !important;}');
addGlobalStyle('#guide-container {border-left: 1px solid rgb(197, 197, 197) !important;}');
addGlobalStyle('.display-name {color: #FFF !important; text-shadow: 0 1px 0 rgb(36, 0, 0);}');
addGlobalStyle('.guide-module-toggle-label h3 {color: #FFF !important;}');
addGlobalStyle('.yt-uix-sessionlink {color: #FFF !important;}');
addGlobalStyle('.guide-context-item .title {color: #FFF !important;}');
addGlobalStyle('.guide-context-item .action, .guide-context-item .viewcount, .guide-context-item .username {color: rgb(214, 214, 214) !important;}');

// Guide title
addGlobalStyle('.title {color: rgb(26, 26, 26) !important;}');
addGlobalStyle('.username {color: #FFF !important;}');
addGlobalStyle('.guide-context-item a:hover, .guide-context-item.context-playing a {background-color: rgb(175, 38, 38) !important;}');

// Player
addGlobalStyle('#player {background: url("http://s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png") !important}');

// Sidebar (right)
addGlobalStyle('#watch7-sidebar {background: rgb(39, 39, 39) !important; border-right: 1px solid #000 !important; margin-top: -395px;}');
/* Sidebar on the back because of the advertising removed (at the end) */
addGlobalStyle('.watch-branded-banner #watch7-sidebar {margin-top: -390px;}');

// Comments
addGlobalStyle('#watch-discussion {border: 1px solid #000 !important; border-top: none !important;}');
addGlobalStyle('#watch7-action-buttons {border: 1px solid #000 !important; border-bottom: none !important; border-top: none !important;}');
addGlobalStyle('#watch7-content {margin-top: 0 !important;}');
/* Like color */
addGlobalStyle('#watch7-sentiment-actions span {color: rgb(119, 119, 119) !important;}');
addGlobalStyle('#watch7-sentiment-actions span:hover {color: rgb(180, 180, 180) !important;}');
addGlobalStyle('#watch7-sentiment-actions .yt-uix-button {color: rgb(119, 119, 119) !important;}');

// Like icon
addGlobalStyle('#watch-like .yt-uix-button-icon {background: url(http://img15.hostingpics.net/pics/342145like.png) 0 -1px no-repeat;}');
addGlobalStyle('#watch-like .yt-uix-button-icon:hover {background: url(http://img15.hostingpics.net/pics/342145like.png) -21px -1px no-repeat;}');
addGlobalStyle('#watch-like .yt-uix-button-panel:hover .yt-uix-button-icon {background: url(http://img15.hostingpics.net/pics/342145like.png) -21px -1px no-repeat;}');
addGlobalStyle('#watch-like .yt-uix-button-icon:active {background: url(http://img15.hostingpics.net/pics/342145like.png) -42px -1px no-repeat;}');
/* Unlike icon */
addGlobalStyle('#watch-dislike .yt-uix-button-icon-watch-dislike {background: url(http://img15.hostingpics.net/pics/342145like.png) 0 -28px no-repeat;}');
addGlobalStyle('#watch-dislike .yt-uix-button-icon-watch-dislike:hover {background: url(http://img15.hostingpics.net/pics/342145like.png) -21px -28px no-repeat;}');
addGlobalStyle('#watch-dislike .yt-uix-button-panel:hover .yt-uix-button-icon-watch-dislike {background: url(http://img15.hostingpics.net/pics/342145like.png) -21px -28px no-repeat;}');
addGlobalStyle('#watch-dislike .yt-uix-button-icon-watch-dislike:active {background: url(http://img15.hostingpics.net/pics/342145like.png) -42px -28px no-repeat;}');

// Concerning / Share / Add to (above Comments)
addGlobalStyle('.yt-uix-button-default, .yt-uix-button-panel:hover .yt-uix-button-text, body .yt-uix-button-default[disabled] {text-shadow: none;}');
/* License */
addGlobalStyle('#watch-description-extras .title {color: rgb(184, 184, 184) !important;}');
addGlobalStyle('#eow-description {color: rgb(100, 100, 100);}');
addGlobalStyle('#comments-view .parent-video-response {color: rgb(100, 100, 100);}');
/* Icons (flag / stats / lang) */
addGlobalStyle('#watch7-secondary-actions .yt-uix-button-icon-action-panel-stats {background: url(http://img15.hostingpics.net/pics/903913sprite1.png) 1px 0 no-repeat;}');
addGlobalStyle('#watch7-secondary-actions .yt-uix-button-icon-action-panel-report {background: url(http://img15.hostingpics.net/pics/903913sprite1.png) -25px 0 no-repeat;}');
addGlobalStyle('#footer .yt-uix-button-icon-footer-language{background: url(http://img15.hostingpics.net/pics/903913sprite1.png) -12px -21px no-repeat;}');

// Count views (in Comments)
addGlobalStyle('#watch7-views-info span {color: rgb(180, 180, 180) !important;}');
addGlobalStyle('#watch7-user-header {background: rgb(39, 39, 39) !important; border: 1px solid rgb(27, 27, 27) !important; border-bottom: none !important; border-top: none !important;}');
addGlobalStyle('#watch7-headline {background: rgb(39, 39, 39) !important; border: 1px solid rgb(27, 27, 27) !important; border-bottom: none !important; border-top: none !important;}');
addGlobalStyle('#watch7-action-panels {border: 1px solid #000 !important; border-bottom: none !important; border-top: none !important;}');

// Display comments
addGlobalStyle('.comment a {color : rgb(111, 111, 111) !important;}');
addGlobalStyle('#comments-view .comment:hover a, #comments-view .comment:hover .yt-uix-button {color : rgb(209, 0, 0) !important;}');
addGlobalStyle('.yt-uix-button-link:hover .yt-uix-button-content {color: rgb(209, 0, 0) !important; text-shadow: none !important;}');
/* Textareas */
addGlobalStyle('.comments-post-alert, .comments-textarea-container textarea {background: rgb(111, 111, 111); border: 1px solid rgb(180, 180, 180);}');
addGlobalStyle('#comments-view .comment, #comments-view .comments-post, #comments-view .video-list {color: rgb(255, 255, 255);}');
addGlobalStyle('.comments-textarea-container label {color: rgb(231, 231, 231);}');
addGlobalStyle('.has-focus .comments-textarea-container textarea {color: rgb(236, 236, 236); height: 4.8em; background: rgb(150, 50, 50); border: 1px solid rgb(95, 0, 0); box-shadow: 0 0 10px 0 rgb(97, 20, 20) inset; text-shadow: 0 1px 0 rgb(136, 0, 0);}');

// Restrain comments
addGlobalStyle('.yt-uix-button-icon-comment-close {width: 24px; height: 25px; background: url(http://img15.hostingpics.net/pics/805804buttonrestrain2.png) 0 0 no-repeat !important;}');
addGlobalStyle('.yt-uix-button-active .yt-uix-button-icon-comment-close {width: 24px; height: 25px; background: url(http://img15.hostingpics.net/pics/805804buttonrestrain2.png) 0 0 no-repeat !important;}');

// Video list
addGlobalStyle('.stat {color: rgb(173, 173, 173) !important;}')
addGlobalStyle('.yt-badge {color: rgb(197, 0, 0) !important; border: none !important; text-shadow: 0 1px 0 rgb(0, 0, 0);}')
addGlobalStyle('.video-list .video-list-item .title {color: rgb(107, 107, 107) !important;}')

// Video description plus)
addGlobalStyle('#watch-description-expand .yt-uix-button, #watch-description-collapse .yt-uix-button {rgb(131, 131, 131)!important; text-shadow: none !important;}')
/* Artist */ 
addGlobalStyle('.metadata-info-title {color: rgb(163, 163, 163)!important;}')

// Video title
addGlobalStyle('.yt-uix-expander-head {color: rgb(185, 185, 185) !important;}')

// Video name author
addGlobalStyle('#watch7-user-header .yt-user-name {color: rgb(180, 180, 180) !important;}')

// Video list title
addGlobalStyle('#watch7-sidebar .video-list-item a:hover .title {color: rgb(175, 12, 12) !important;}')
/* Vevo title */
addGlobalStyle('#watch7-sidebar .watch-sidebar-head, #watch7-sidebar .watch-sidebar-foot {color: rgb(180, 180, 180) !important;}')
/* Integrality 5 videos */
addGlobalStyle('#watch7-sidebar .watch-sidebar-head a, #watch7-sidebar .watch-sidebar-foot a {color: rgb(180, 180, 180);}')
addGlobalStyle('#watch7-sidebar .watch-sidebar-head:hover a, #watch7-sidebar .watch-sidebar-foot:hover a {color: rgb(185, 28, 28);}')

// Publication
addGlobalStyle('#watch-uploader-info {color: rgb(177, 177, 177) !important;}')
addGlobalStyle('.action-panel-content:hover a {color: rgb(180, 180, 180) !important;}')

// Search main bar
addGlobalStyle('#masthead-search .search-btn-component .yt-uix-button-content {background: url(http://img15.hostingpics.net/pics/466550search.png) no-repeat !important; position: relative; top: -2px;}')

// Search bar
addGlobalStyle('.channels-search .search-field-container, .subscriptions-filter .filter-field-container {height: 28px; margin-top: 1px; border: 1px solid rgb(192, 192, 192); border-right: none; box-shadow: -1px 0 2px 0 rgb(170, 170, 170) inset;}')
addGlobalStyle('#masthead-search-terms {background: rgb(85, 85, 85);}')
addGlobalStyle('#masthead-search input:focus {background: rgb(120, 120, 120); -webkit-transition: all .2s ease-out; -moz-transition: all .2s ease-out; -o-transition: all .2s ease-out; -ms-transition: all .2s ease-out; -khtml-transition: all .2s ease-out;}')
addGlobalStyle('#masthead-search input {-webkit-transition: all .2s ease-out; -moz-transition: all .2s ease-out; -o-transition: all .2s ease-out; -ms-transition: all .2s ease-out; -khtml-transition: all .2s ease-out;}')
/* Focus */
addGlobalStyle('#masthead-search.consolidated-form input:focus, #masthead-search-term:focus {border: red; border-collapse: collapse;}')
/*Hover*/
addGlobalStyle('#masthead-search.consolidated-form input:focus, #masthead-search-term:focus {border: red; border-collapse: collapse;}')

// Alert suscribe more videos
addGlobalStyle('#channel-subscription-promo-in-feed {background: url(http://img15.hostingpics.net/pics/13875220934561.png);}')
addGlobalStyle('#masthead-search.consolidated-form input:hover {background: rgb(117, 117, 117);}')


/* ---------------------------- TO WATCH LATER---------------------------- */


// Header
addGlobalStyle('.feed-header {border-bottom: 1px solid rgb(87, 87, 87);}')

// Main content video
addGlobalStyle('.branded-page-v2-primary-col {background: url(http://s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png); border: 1px solid #000; border-top: none;}')
addGlobalStyle('.feed-item-container .feed-item-main {margin-bottom: -2px; border-top: none; border-bottom: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('.yt-uix-form-input-checkbox-container {background: #FFF; height: 15px;}')
addGlobalStyle('.branded-page-v2-subnav-container {border-bottom: 1px solid rgb(87, 87, 87) !important;}')



// Buttons header
addGlobalStyle('.addto-label {color: red; text-shadow: 0 1px 0 #000; cursor: pointer;}')
addGlobalStyle('.addto-label:hover {color: #FFF; text-shadow: 0 1px 0 #000;}')
addGlobalStyle('.yt-uix-button-content {color: #FFF;}')
addGlobalStyle('.yt-uix-button-content {color: rgb(165, 165, 165);}')
addGlobalStyle('.yt-uix-button-default:hover, .yt-uix-button-text:hover, .yt-uix-button-panel .yt-uix-button-text:hover {border-color: rgb(138, 138, 138); filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=rgb(87, 87, 87),EndColorStr=rgb(41, 41, 41)); background-image: -moz-linear-gradient(top,rgb(87, 87, 87) 0,rgb(41, 41, 41) 100%); background-image: -ms-linear-gradient(top,rgb(87, 87, 87) 0,rgb(41, 41, 41) 100%); background-image: -o-linear-gradient(top,rgb(87, 87, 87) 0,rgb(41, 41, 41) 100%); background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,rgb(87, 87, 87)),color-stop(100%,rgb(41, 41, 41))); background-image: -webkit-linear-gradient(top,rgb(87, 87, 87) 0,rgb(41, 41, 41) 100%); background-image: linear-gradient(to bottom,rgb(87, 87, 87) 0,rgb(41, 41, 41) 100%));}')
addGlobalStyle('.yt-uix-button-default, .yt-uix-button-default:focus, body .yt-uix-button-default[disabled] {border-color: rgb(0, 0, 0) rgb(107, 107, 107) rgb(92, 92, 92);}')


// Record a video to watch later
addGlobalStyle('#watch-later-promo {background: rgb(32, 32, 32);}')
addGlobalStyle('#watch-later-promo .watch-later-tv {border: 1px solid rgb(145, 0, 0);}')
addGlobalStyle('#watch-later-promo .watch-later-nyan {border: 1px solid rgb(145, 0, 0); margin-right: 7px;}')


/* ---------------------------- PLAYLISTS ---------------------------- */


// Content global
addGlobalStyle('.branded-page-v2-primary-col {border: 1px solid rgb(87, 87, 87) !important; border-top: none !important;}')

// Content channel
addGlobalStyle('#channel-subheader {border-bottom: 1px solid rgb(87, 87, 87) !important;}')
addGlobalStyle('#c4-header-bg-container {border-bottom: 1px solid rgb(87, 87, 87) !important;}')

// Img profile
addGlobalStyle('.channel-header-profile-image {border: 1px solid rgb(49, 49, 49);}')

// Add video
addGlobalStyle('.yt-uix-button-menu .yt-uix-button-menu-item {color: rgb(122, 122, 122) !important;}')
addGlobalStyle('.yt-uix-button-menu .yt-uix-button-menu-item.selected, .yt-uix-button-menu .yt-uix-button-menu-item-highlight .yt-uix-button-menu-item, .yt-uix-button-menu .yt-uix-button-menu-item:hover {color: rgb(155, 155, 155) !important;);}')

// Video icon
addGlobalStyle('.hitchhiker-enabled .yt-uix-button-icon-feed-item-action-menu {width: 24px; height: 25px; background: url(http://img15.hostingpics.net/pics/805804buttonrestrain2.png) 0 0 no-repeat !important;}')


/* ---------------------------- MY SUBSCRIPTION ---------------------------- */


// Video title
addGlobalStyle('.feed-item-content .feed-video-title {color: rgb(160, 160, 160) !important;}')

// Create new collection
addGlobalStyle('.qualified-channel-title.ellipsized .qualified-channel-title-text {color: rgb(160, 160, 160) !important;}')


/* ---------------------------- SOCIAL NETWORKS ---------------------------- */


// Feed promo content
addGlobalStyle('.feed-promo {background: url("http://s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png"); border-bottom: 1px solid rgb(87, 87, 87);}')

// Color artists name
addGlobalStyle('.feed-promo {color: rgb(102, 102, 102);}')

// Background
addGlobalStyle('.yt-dialog-fg, .yt-uix-overlay-fg {background: url(http://img15.hostingpics.net/pics/13875220934561.png); border: 1px solid rgb(104, 104, 104);}')
/* Background band bottom */
addGlobalStyle('.yt-uix-overlay-actions {background: rgb(70, 70, 70); border-top: 1px solid rgb(111, 111, 111);}')

// Overlay
addGlobalStyle('.yt-dialog-bg, .yt-uix-overlay-bg {background: rgb(24, 24, 24);}')

// Input dialog
addGlobalStyle('.yt-dialog .collection-name input, .yt-uix-form-label .yt-uix-form-input-text, .yt-uix-form-label .yt-uix-form-input-textarea {background: rgb(236, 236, 236);}')


/* ---------------------------- BROWSE CHAINS  ---------------------------- */


// Username
addGlobalStyle('.subscribable-content-rec:hover .subscribable-content-username {color: rgba(192, 0, 0, .95);}')

// Category title
addGlobalStyle('.category-header .category-title-link:hover .category-title, .category-header .category-count-link:hover .channel-count, .category-header .category-link:hover .all-categories {color: rgba(192, 0, 0, .95);}')
addGlobalStyle('.category-header .category-title {color: rgb(172, 172, 172);}')


// Item heading
addGlobalStyle('.epic-nav-dropdown-group:hover, body a.yt-uix-button-epic-nav-item:hover, body a.yt-uix-button-epic-nav-item.selected, body a.yt-uix-button-epic-nav-item.yt-uix-button-toggled, button.yt-uix-button-epic-nav-item:hover, button.yt-uix-button-epic-nav-item.selected, button.yt-uix-button-epic-nav-item.yt-uix-button-toggled, .epic-nav-item:hover, .epic-nav-item.selected, .epic-nav-item.yt-uix-button-toggled, .epic-nav-item-heading {color: rgb(139, 139, 139);}')


/* ---------------------------- MANAGE SUBSCRIPTIONS ---------------------------- */


// Title
addGlobalStyle('h1.yt {color: rgb(172, 172, 172);}')
addGlobalStyle('.yt-default p, p.yt {color: rgb(119, 119, 119);}')

// Collection promo
addGlobalStyle('.collection-promo {border-bottom: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('#subscription-manager-container .subscription-manager-header {border-bottom: 1px solid rgb(87, 87, 87);}')

// Create a new collection
addGlobalStyle('.yt-uix-button-icon-wrapper+.yt-uix-button-content {color: #FFF;}')

// Td subscription manager container
addGlobalStyle('#subscription-manager-container .even td {background: rgb(48, 48, 48); border-top: 1px solid rgb(87, 87, 87); border-bottom: 1px solid rgb(87, 87, 87);}')

// Subscriber button
addGlobalStyle('.yt-uix-button-subscribe-branded .subscribe-label, .yt-uix-button-subscribe-branded .unavailable-label, .yt-uix-button-subscribed-branded .subscribed-label, .yt-uix-button-subscribed-branded.hover-enabled:hover .unsubscribe-label {color: rgb(255, 255, 255);}')
addGlobalStyle('.yt-uix-button-subscribe-unbranded .subscribe-label, .yt-uix-button-subscribe-unbranded .unavailable-label, .yt-uix-button-subscribed-unbranded .subscribed-label, .yt-uix-button-subscribed-unbranded.hover-enabled:hover .unsubscribe-label {color: rgba(207, 35, 35, .95);}')


/* ---------------------------- ADD A VIDEO ---------------------------- */


// Dropzone files
addGlobalStyle('#main-content .starting-box {background: rgb(41, 41, 41); border: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('#upload-prompt-box {background: rgb(41, 41, 41); border: 1px solid rgb(87, 87, 87);}')

// Dashboard
addGlobalStyle('#dashboard-no-videos-overlay {background: rgba(60, 60, 60, .85);}')
/* Text in */
addGlobalStyle('#dashboard-no-videos-message {color: #FFF;}')


/* ---------------------------- PERSONAL NAV ---------------------------- */


// Nav masthead container
addGlobalStyle('body #masthead-expanded-container {background: rgb(41, 41, 41); border-bottom: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('#masthead-expanded .masthead-expanded-menu-item a {color: rgba(199, 0, 0, .95);}')


/* ---------------------------- ACCOUNT ---------------------------- */


// Global content
addGlobalStyle('.account-container {background: url(http://img15.hostingpics.net/pics/13875220934561.png); border: 1px solid rgb(87, 87, 87);}')


/* ---------------------------- SEARCH PAGE ---------------------------- */


// Primary column
addGlobalStyle('.primary-col {background: url(http://img15.hostingpics.net/pics/13875220934561.png); border: 1px solid rgb(87, 87, 87); border-top: none;}')
addGlobalStyle('.search-header {border-bottom: 1px solid rgb(87, 87, 87);}')

// Filters
addGlobalStyle('#filter-dropdown {background: rgb(41, 41, 41);}')
/* h4 */
addGlobalStyle('.filter-col-title {color: rgb(180, 180, 180);}')
/* a */
addGlobalStyle('.filter {color: rgb(150, 150, 150);}')

// Title
addGlobalStyle('.yt-lockup2-title a, .yt-lockup2.has-hover-effects:hover a, .yt-lockup2.has-hover-effects:hover .yt-lockup2-meta a {color: rgb(165, 165, 165) !important;}')


/* ---------------------------- MY CHAIN ---------------------------- */


// Bloc content
addGlobalStyle('.branded-page-v2-body #channel-feed-post-form {border-bottom: 1px solid rgb(87, 87, 87) !important;}')
addGlobalStyle('.feed-item-container .feed-item-main {border-bottom: 1px solid rgb(87, 87, 87) !important;}')
addGlobalStyle('.c4-box {border-bottom: 1px solid rgb(87, 87, 87) !important;}')

// Chain content subscription
addGlobalStyle('.feed-item-content-wrapper.playlist-promo, .feed-item-content-wrapper.channel-lockup {border: 1px solid rgb(87, 87, 87) !important; box-shadow: 0 3px 4px rgb(68, 66, 66) !important;}')

// Checklist module
addGlobalStyle('.c4-checklist-module {background: rgb(48, 48, 48) !important; border: 1px solid rgb(87, 87, 87) !important; }')
/* h2 */
addGlobalStyle('.c4-checklist-module-title {color: rgb(209, 209, 209) !important; }')
/* li */
addGlobalStyle('.c4-checklist-module .todo-item {border: none !important; border-top: 1px solid rgb(87, 87, 87) !important;}')
addGlobalStyle('.c4-checklist-module .todo-item:hover {background: rgb(224, 224, 224) !important;}')


/* ---------------------------- UPLOADED VIDEOS ---------------------------- */


// Header content
addGlobalStyle('#vm-page-subheader, #vm-video-actions-bar {background: url("http://s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png") !important;}')
addGlobalStyle('#vm-pagination {background: rgb(56, 56, 56) !important;}')
addGlobalStyle('#vm-video-actions-inner {border-bottom: 1px solid rgb(87, 87, 87) !important;}')
/* h3 */
addGlobalStyle('#vm-page-subheader h3 {color: rgb(163, 163, 163) !important;}')

// Search box
addGlobalStyle('#vm-myvideos-search-box {height: 16px;}')


/* ---------------------------- PLAYLISTS / TAGS / SEARCH HISTORY / FAVORITES / VIDEOS WE LOVE---------------------------- */


// Content
addGlobalStyle('.vm-list-view .vm-video-list li {background: url("http://s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png");}')
addGlobalStyle('.hh #yt-admin-content {border: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('.vm-list-view .vm-video-item-content {border-bottom: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('.vm-list-view .vm-video-list li.selected .vm-video-item-content {background: rgb(56, 56, 56); border-bottom: 1px solid rgb(100, 100, 100);}')

/* Tags */
// Search bar
addGlobalStyle('.vm-search-form .yt-uix-form-input-text {height: 15px; margin-top: 1px; border: 1px solid rgb(192, 192, 192); border-right: none; box-shadow: -1px 0 2px 0 rgb(170, 170, 170) inset;}}')

/* Search history + Favorites */
// Content li
addGlobalStyle('.vm-list-view .vm-video-list li {background: url("http://s.ytimg.com/yt/img/earthhour/www-refreshbg-vflQx0YnW.png") !important;}')
addGlobalStyle('.vm-list-view .vm-video-item-content {border-bottom: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('.vm-list-view .vm-video-metrics {background: rgb(197, 197, 197); border-left: 1px solid rgb(87, 87, 87);}')


/* ---------------------------- WHEN LOGOUT ---------------------------- */


// When cookies disappears, we must use Youtube as..
addGlobalStyle('#identity-prompt-lb .identity-prompt-account-public-name {color: rgb(207, 60, 60);}')
addGlobalStyle('#identity-prompt-lb #button-container {background-color: rgb(49, 49, 49);}')
addGlobalStyle('#identity-prompt-account-list::-webkit-scrollbar-thumb {border-left: 4px solid rgb(131, 0, 0);}')
addGlobalStyle('#identity-prompt-lb #identity-prompt-account-list li {border-bottom: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('.yt-dialog-base .yt-dialog-header, .yt-uix-overlay-base .yt-uix-overlay-header {border-bottom: 1px solid rgb(87, 87, 87);}')

// Checkbox
addGlobalStyle('.yt-uix-form-input-radio-element, .yt-uix-form-input-checkbox-element {border: 1px solid rgb(0, 0, 0); background: rgb(60, 60, 60);}')
addGlobalStyle('.yt-uix-form-input-checkbox-container:hover .yt-uix-form-input-checkbox-element, .yt-uix-form-input-radio-container:hover .yt-uix-form-input-radio-element {border-color: rgb(139, 139, 139);}')

// Scrollbar
addGlobalStyle('#identity-prompt-account-list::-webkit-scrollbar-track {border-left: 4px solid rgb(131, 0, 0);}')

/* ---------------------------- SETTLEMENT OF THE COMMUNITY ---------------------------- */


addGlobalStyle('#yts-article #article-container {color: rgb(218, 218, 218);}')
addGlobalStyle('#yts-article p {color: rgb(160, 160, 160);}')
addGlobalStyle('#yts-article li {color: rgb(114, 114, 114);}')
addGlobalStyle('#yts-nav {border-right: 1px solid rgb(71, 69, 69);}')
addGlobalStyle('.separator, .with-divider, .header, #yts-article #header {color: #EEE; border-color: rgb(71, 69, 69);}')

// Nav
addGlobalStyle('#yts-nav ol li.top-level a {color: rgb(126, 126, 126);}')
addGlobalStyle('#yts-nav .indented .sub-level a {color: rgb(126, 126, 126);}')
addGlobalStyle('#footer-secondary li {text-shadow: 0 1px 1px rgb(0, 0, 0);}')
/*jobs*/
addGlobalStyle('#masthead-container {background: rgb(111, 111, 111); border-bottom: 1px solid rgb(78, 78, 78);}')
addGlobalStyle('#search-btn span {background: url(http://img15.hostingpics.net/pics/466550search.png) no-repeat;}')
/*First steps*/
addGlobalStyle('.yt-tile-static, .yt-tile-visible, .yt-tile-default:hover {background: none; box-shadow: none;}')
addGlobalStyle('.yt-tile-default, .yt-tile-static, .yt-tile-visible {border: 1px solid rgb(87, 87, 87);}')
addGlobalStyle('.yt-sidebar-border {border-right: solid 1px rgb(87, 87, 87);}')
/*About*/
addGlobalStyle('h1, h2, h3, h4, h5, h6 {color: rgb(145, 145, 145);}')
/*Search button*/
addGlobalStyle('.yt-uix-button-primary, body .yt-uix-button-primary[disabled] {background-image: linear-gradient(to bottom,rgb(190, 83, 83) 0,rgb(183, 63, 63) 100%);}')
/*Features*/
addGlobalStyle('#yt-microsite h2, #yt-microsite h3, #yt-microsite h4, #yt-microsite h5 {color: rgb(145, 145, 145); text-shadow: none;}')
addGlobalStyle('.yt-about-getting-started-has-sublist h3, .yt-about-getting-started-has-sublist li {color: rgb(145, 145, 145);}')
/*Logo footer*/
addGlobalStyle('#footer-secondary a {color: rgb(122, 122, 122);}')
/*main img*/
addGlobalStyle('.yt-jobs-index-hero-background {background: none;}')
addGlobalStyle('.yt-jobs-header-title {color: #CCC;}')


/* ---------------------------- OTHERS ---------------------------- */


// Alert cookies
addGlobalStyle('.yt-alert-actionable.yt-alert-warn, .yt-alert-default.yt-alert-warn, .yt-alert-naked.yt-alert-warn .yt-alert-icon, .yt-alert-small.yt-alert-warn {background: rgb(148, 0, 0); border-color: rgb(214, 0, 0);}')

// Alert button
addGlobalStyle('.yt-alert-actionable .yt-uix-button-alert-info {border: 1px solid rgb(209, 209, 209);}')
addGlobalStyle('.yt-uix-button-primary, body .yt-uix-button-primary[disabled] {background-color: rgb(177, 0, 0); border-color: rgb(199, 20, 20);}')
addGlobalStyle('.yt-uix-button-primary:hover {background-color: rgb(230, 39, 39); border-color: rgb(230, 39, 39);}')
addGlobalStyle('.yt-uix-button-primary:active, .yt-uix-button-primary.yt-uix-button-active, .yt-uix-button-primary.yt-uix-button-toggled {background-color: rgb(179, 18, 18); border-color: rgb(179, 18, 18);}')
addGlobalStyle('.yt-alert-default.yt-alert-info, .yt-alert-actionable.yt-alert-info, .yt-alert-naked.yt-alert-info .yt-alert-icon, .yt-alert-small.yt-alert-info {background: #777777; rgb(163, 163, 163);}')
