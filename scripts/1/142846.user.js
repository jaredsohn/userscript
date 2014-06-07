// ==UserScript== 
// @name r/BreakingBad visited Spoilers
// @description Changes the colour of spoilers depending on whether they have been visited or not.
// @include http://reddit.com/r/breakingbad/*
// @include http://*.reddit.com/r/breakingbad/*
// ==/UserScript==

GM_addStyle(".linkflair-spoiler a.title:visited { background: #55BC7A;   color: #55BC7A !important; }");