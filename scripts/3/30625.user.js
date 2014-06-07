// ==UserScript==
// @name           Youtube Theater Black2
// @namespace      http://userstyles.org
// @description    like the original "Youtube Theater Black" but reordered stuff, colored fonts
// @include        http://*youtube*watch*
// @exclude        http://*youtube*comment*
// ==/UserScript==


// Resize player
GM_addStyle("#baseDiv { width: 850px; !important; }");
GM_addStyle("#movie_player { width: 850px; height: 678px; !important; }");

// Search bar stuff
GM_addStyle("#gNavBottom { width: 380px; height: 0px; !important; }");
GM_addStyle("#searchForm { width: 340px; position: absolute; right: 0; !important; }");
GM_addStyle("#masthead .upload-button { display: none; !important; }");
GM_addStyle("#masthead .search-bar { background: none; width: 840px !important; }");
GM_addStyle("#masthead .logo img { display: none; !important; }");
GM_addStyle("#masthead .bar .leftcap { background: none; height: 50px; !important; }");
GM_addStyle("#masthead .bar .rightcap { background: none; height: 50px; !important; }");

// Get rid of stuff!
GM_addStyle("#b { display: none !important; }");
GM_addStyle("#upload-button { display: none !important; }");
GM_addStyle("#baseDiv { width: 850px; !important; }");
GM_addStyle("body { background-color: black; color: white; !important; }");
GM_addStyle("#search-bar { background-color: black; !important; }");
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

// coloring and moving stuff
GM_addStyle("#watch-vid-title { color: DarkGrey !important; }");
GM_addStyle("#watch-channel-vids-div { background-color: black !important; }");
GM_addStyle(".expand-panel a.expand-header, .expand-panel a.expand-header:link, .expand-panel a.expand-header:visited { color:white; !important; }");
GM_addStyle("h1, h2, h3, h4, h5, h6 { color:white; !important; }");
GM_addStyle("#watch-other-vids { padding-top: 862px !important; }");
GM_addStyle("#watch-ratings-views { margin-top: 184px !important; }");