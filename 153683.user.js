// ==UserScript==
// @name	   YouTube - Get the old design back
// @author         Jackabood
// @version	       1.0
// @description	   Some simple changes to the new YouTube design to make it look a lot more like the older design
// @include	   http*://www.youtube.com/*
// @include        https://*youtube.*/*watch*
// ==/UserScript==


var overrideCSS =" body, #yt-masthead-container , #watch7-sidebar , #watch7-discussion,#playlist-bar-bar-container, #watch7-headline,#watch7-user-header, .yt-uix-button-panel, #watch7-action-panel-footer {background: url(http://im16.gulfup.com/Cta610.png);} #guide-container  , .yt-uix-clickcard-card-body , #link-gplus-lb  , .yt-user-photo , .comment-actions {display:none;} .watch-view-count {font-size: 23px;} #watch-headline-title {font-size: 23px;}  #content {top: 29px ;} #watch7-headline {border-width: 0px 0px 0px;} #yt-masthead-user  {border-right: 1px solid rgb(230, 230, 230);} #watch-like, #watch-dislike, #watch-description-toggle button {background-color: #f1f1f1 !important;border-color: #ccc !important;} .comments-post-alert {background: none repeat scroll 0% 0% rgb(255, 255, 255);} #watch7-headline {top: -439px ; background:none;}";
GM_addStyle(overrideCSS);
