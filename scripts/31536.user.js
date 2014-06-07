// ==UserScript==
// @name           Home Redesigned - MySpace
// @namespace      WLBL
// @include        http://home.myspace.com/index.cfm?fuseaction=user*
// ==/UserScript==

s= '#footer { display:none; }';
s+= '#googlebar { display:none; }';
s+= '#leaderboard { display:none; }';
s+= '#marketingcontent { display:none; }';
s+= '#squareAd { display:none; }';
s+= '#featuredprofilerounded { display:none; }';
s+= '#googleadtest { display:none; }';
s+= '#ctl00_cpMain_MarketingBox_userHomeTabs_userHomeTabs { display:none; }';

GM_addStyle(s);