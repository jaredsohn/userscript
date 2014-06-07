// ==UserScript==
// @name          Restore Google News Layout ca. 6/2010
// @description   Restore Google News Layout ca. 6/2010
// @include       http://news.google.tld/*
// @include       htt*://news.google.*/*
// @include       htt*://*google.*/news*
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

addGlobalStyle(' \
.maincontents .centered { max-width:none !important; } \
.footer { max-width:none !important; } \
.hp .nav-one-col-hp { display:none; } \
.centered .main-content-with-gutter-wrapper { margin-left:0 !important; padding:0 20px !important; } \
.kd-appbar { height:auto; } \
.kd-appbar .kd-appname-wrapper { margin:10px 0 10px 20px; } \
#page-header .kd-appbar .in-header { top:10px; } \
.kd-appbar .appbar-wrapper { margin-right:20px; } \
.kd-appbar .appbar-wrapper .main-appbar, .kd-appbar .appbar-wrapper .side-appbar { position:static; width:auto; margin:0; float:right; } \
.kd-appbar .appbar-wrapper .main-appbar .goog-flat-menu-button, .kd-appbar .appbar-wrapper .main-appbar .jfk-button, \
	.kd-appbar .appbar-wrapper .side-appbar .jfk-button { margin:0 0 0 10px !important; } \
#table-spacer-cell { width:auto; } \
.rt-present { padding-left:10px; } \
/* * */ \
.am2-grid-view .grid-left-column { padding-right:10px; } \
.am2-grid-view .grid-right-column { padding-left:10px; } \
/* * */ \
.blended-section .esc-wrapper { border:0; } \
.blended-section .esc-wrapper .story { border-bottom:1px solid #EBEBEB; } \
.blended-section .esc-wrapper.blended-wrapper-last .story { border-bottom:0; } \
.esc .esc-expanded .esc-body, .esc .esc-expanded .esc-body { padding: 5px; } \
.blended-section>.sub-header { clear:both; } \
.esc .esc-thumbnail { padding-top:0; } \
.esc .esc-thumbnail-image-source-wrapper { width:70px; } \
.esc .esc-lead-article-source-wrapper, .esc .esc-lead-snippet-wrapper, \
	.esc .moreLinks { margin:0 0 5px; padding:0; } \
.esc .esc-extension-wrapper { font-size:11px; line-height:1.2em; margin:0; padding:0; } \
.esc .esc-lead-article-title-wrapper, .esc .esc-secondary-article-title-wrapper, .esc .esc-diversity-wrapper, .esc .esc-diversity-article-wrapper { margin:0; } \
.esc .esc-tn-translate-button { display:none; } \
/* top stories */ \
.top-stories-section:after { clear:both; content:"."; display:block; height:0; line-height:0; visibility:hidden; } \
.top-stories-section .blended-wrapper { border:0; display:none; float:left; padding:0; width:50%; } \
.top-stories-section .blended-wrapper-first, .top-stories-section .blended-wrapper:nth-child(6) { display:block; } \
.top-stories-section .blended-wrapper .story { border:0; margin:0 0 0 10px; } \
.top-stories-section .blended-wrapper-first .story { margin:0 10px 0 0; } \
/* * */ \
.share-bar-table { display:none !important; } /* hides star and sharing menu arrow */ \
#replaceable-section-blended { margin-top:10px !important; } \
#replaceable-section-blended .section { margin-bottom:10px !important; } \
.story h2, .story h2 b { font-weight:bold !important; } /* adds bold to headlines */ \
.story .title .titletext { text-decoration:none !important; } /* removes underline from headlines */ \
#replaceable-section-blended .section .sub-header { margin:0 !important; } \
.top-stories-section .blended-wrapper, #replaceable-section-blended .section .blended-wrapper { background-color:#ffffff !important; } /* disables hover borders */ \
.show-more-blended-stories { padding-top:5px; padding-left:5px !important; } \
.esc-separator { display:none; } \
/* section */ \
.sp .nav-one-col-hp { display:none; } \
.sp #main-table, .sp #headline-wrapper, .sp #main-table .main-content-with-gutter .column1 { padding:0; } \
.sp .one-col-wrapper .sub-header { margin-left:0 !important; } \
.sp .single-section.main-content-with-gutter .column2 { display:none; } /* hides left and right columns */ \
.sp .blended-wrapper { background-color:#ffffff !important; clear:left; float:left; padding-left:0; padding-right:0; width:49%; } /* creates 2 column view */ \
.sp .blended-wrapper:nth-child(4n) { clear:right; float:right; } \
.sp .headline-story .thumbnail { float:right; padding-left:8px; } \
.sp .headline-story.thumbnail-true .title, .sp .headline-story.thumbnail-true .sub-title, .sp .headline-story.thumbnail-true .snippet, \
.sp .headline-story.thumbnail-true .additional-article,  .sp .headline-story.thumbnail-true .sources { margin-left:0; } /* alignment even if no thumbnail */ \
.sp h2.more-stories { clear:both; } \
.sp .headline-story .title a, .sp .headline-story .additional-article a, .sp .headline-story .sources a  { text-decoration:none; } /* removes underline from headlines */ \
.sp .headline-story .additional-article a:hover, .sp .headline-story .sources a:hover { text-decoration:underline; } \
.sp .headline-story .sub-title .date { font-weight:normal; } \
/* full coverage */ \
.mcp .nav-one-col-hp { display:none; } \
.mcp .one-col-wrapper .sub-header { margin-left:0 !important; padding:0 20px; } \
.mcp .main-content-with-gutter-wrapper .first-story { clear:left; float:left; width:49%; } \
.mcp .main-content-with-gutter-wrapper .headline-story { clear:right; float:right; width:49%; } \
.mcp .main-content-with-gutter-wrapper .headline-story:nth-of-type(even) { clear:left; float:left; } \
.mcp .main-content-with-gutter-wrapper .first-story .headline-story { clear:none; float:none; width:auto; } \
.mcp #mc-inner .basic-title { padding:8px 4px 0; } \
.mcp .headline-story { border-bottom:1px solid #EBEBEB; padding:8px 0; } \
.mcp .filter-link { clear:both; padding:2px 0 18px 0; } \
');