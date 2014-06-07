// ==UserScript==
// @name           Standard OP and Visited Links Colors for /r/LeagueOfLegends
// @description    Minor improvements for the new /r/LeagueOfLegends theme, changing the thread author's name to the standard bright blue and the visited link color to the standard purple.
// @author         Austin Owens
// @include        http://leagueoflegends.reddit.com*
// @include        http://*.leagueoflegends.reddit.com*
// @include        http://reddit.com/r/leagueoflegends*
// @include        http://*.reddit.com/r/leagueoflegends*
// @include        https://leagueoflegends.reddit.com*
// @include        https://*.leagueoflegends.reddit.com*
// @include        https://reddit.com/r/leagueoflegends*
// @include        https://*.reddit.com/r/leagueoflegends*
// @version        1.2
// ==/UserScript==


var array = document.styleSheets;
for(var i = 0; i < array.length; i++) {
    if(array[i] !== undefined && array[i].cssRules !== null) {
        document.styleSheets[i].addRule(".tagline .submitter", "color: #0055DF !important;", 0);
        document.styleSheets[i].addRule(".tagline .submitter", "background: none !important;", 0);
        document.styleSheets[i].addRule(".tagline .submitter:hover", "background: none !important;", 0);
        document.styleSheets[i].addRule(".entry .title .title.click:visited", "color: #551A8B !important;", 0);
        document.styleSheets[i].addRule(".entry .title .title:visited", "color: #551A8B !important;", 0);
        break;
    }
}