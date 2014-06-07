// ==UserScript==
// @name           Youtube Theater
// @namespace      http://userstyles.org
// @include        http://*youtube*watch*
// @exclude        http://*youtube*comment*
// ==/UserScript==

// Resize player
GM_addStyle("#baseDiv { width: 750px; !important; }");
GM_addStyle("#movie_player { width: 750px; height: 616px; !important; }");

// Search bar stuff
GM_addStyle("#gNavBottom { width: 380px; height: 0px; !important; }");
GM_addStyle("#searchForm { width: 340px; position: absolute; right: 0; !important; }");

// Get rid of stuff!
GM_addStyle("#b { display: none !important; }");
GM_addStyle("#baseDiv { width: 800px; !important; }");
GM_addStyle("#dVidsDiv { display: none; !important; }");
GM_addStyle("#logoTagDiv { display: none; !important; }");
GM_addStyle(".wsWrapper { display: none; !important; }");
GM_addStyle("#actionsAndStatsDiv { display: none; !important; }");
GM_addStyle("#exploreBody { display: none; !important; }");
GM_addStyle("#ratingDiv { display: none; !important; }");
GM_addStyle("#asUsersDiv { display: none; !important; }");
GM_addStyle("#asHeaderDiv { display: none; !important; }");
GM_addStyle("#recent_comments { display: none; !important; }");
GM_addStyle("#div_main_comment { display: none; !important; }");
GM_addStyle("#footerDiv { display: none; !important; }");
GM_addStyle("#otherVidsCell { display: none; !important; }");
GM_addStyle("#videoStatsDiv { display: none; !important; }");
GM_addStyle("#embedDiv { display: none; !important; }");
GM_addStyle("#utilDiv { display: none; !important; }");
GM_addStyle("#leaderboardAd { display: none; !important; }");
GM_addStyle("#commentsDiv { display: none; !important; }");
GM_addStyle("#viewsDiv { display: none; !important; }");
GM_addStyle(".spacer { display: none; !important; }");
GM_addStyle("#gNavDiv { display: none; !important; }");
GM_addStyle("#commentPostDiv { display: none; !important; }");
GM_addStyle("#actionsAreaDiv, .actionLinks { display: none; !important; }");
GM_addStyle(".viewsDiv { display: none; !important; }");
GM_addStyle("#recentRatingsDiv { display: none; !important; }");
GM_addStyle("#asDiv { display: none; !important; }");
GM_addStyle("#footer { display: none; !important; }");
GM_addStyle("#copyright { display: none; !important; }");
GM_addStyle(".user-info { display: none; !important; }");
GM_addStyle(".nav { display: none; !important; }");
GM_addStyle("#masthead .upload-button { display: none; !important; }");
GM_addStyle("#masthead .logo img { display: none; !important; }");
GM_addStyle("#masthead { height: 50px; !important; }");
GM_addStyle("#watch-other-vids { display: none; !important; }");
GM_addStyle("#watch-actions-area { display: none; !important; }");
GM_addStyle("#watch-ratings-views { display: none; !important; }");
GM_addStyle("#watch-comments-stats { display: none; !important; }");
GM_addStyle("#watch-play-next-video-box { display: none; !important; }");