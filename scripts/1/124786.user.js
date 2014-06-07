// ==UserScript==
// @name        Golightly Twitter Cleanup
// @version      1.0.0
// @description  Clean up Twitter.com
// @author       Fred Golightly
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

/* .topbar {display:none;} /*Hide top nav bar */
/* [data-global-action="home"] {display: none !important;} /* Hide Home nav button */
/* [data-global-action="connect"] {display: none !important;} /* Hide Connect nav */
/* [data-global-action="discover"] {display: none !important;} /*Hide Discover nav */
/* .global-nav .pull-right .nav {display: none;} /* Hide 'me' nav */
/* #global-nav-search {display: none;} /* Hide Nav search */
/* [data-component-term="new_tweet_button"] {display: none !important;} /* Hide new tweet button */

.dashboard {float: right; margin-left: 10px; } /* Swap dashboard & content left-right */
/* .dashboard {display: none;} .content-main {width: auto;} /* Hide whole dashboard */
[data-component-term="mini_home_profile"] {display:none;} /*Hide mini-profile */
/* .tweet-box {display: none;} /* Hide mini-profile compose Tweet box */
[data-component-term="follower_request_link"] {display:none;} /*Hide follower request */
/* [data-component-term="user_recommendations"] {display:none;} /* Hide Who to follow */
/* [data-component-term="trends"] {display:none !important} /*Hide trends */
[data-component-term="footer"] {display:none;} /* Hide footer */

.header-inner h2 {display: none;} .content-header {height: 5px;} /* Hide Tweets stream header */
/* .dogear {display: none;} /* Hide fave star */
/* .actions {display: none;} /* Hide Tweet actions */
.tweet-stats-container {display: none !important;} /* Hide tweet stats */
.client-and-actions {display: none} /* Hide tweet bottom actions */
/* .avatar {display: none;} .stream .content {margin-left: 0px;} /* Hide avatars, content:left */
/* .content .actions {display: none;} /* Hide Tweet hover actions */
.media-attribution, .flag-container {display: none;} /* Hide 'powered by' */

/* [data-component-term]="user_recommendations" {display: none;} /* Hide Similar To box */