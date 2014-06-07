// ==UserScript==
// @name        Old League of Legends subreddit theme
// @namespace   r/lol
// @description Old r/leagueoflegends theme
// @include     http://www.reddit.com/r/leagueoflegends/*
// @include     http://www.reddit.com/r/leagueoflegends/
// @include     http://*reddit.com/r/leagueoflegends/*
// @include     http://*reddit.com/r/leagueoflegends/
// @version     1
// @grant       none
// @author 		MrQuackers of shurima.net
// ==/UserScript==
function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @title="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}
replaceStyleSheet('applied_subreddit_stylesheet', "http://www.redditstatic.com/subreddit-stylesheet/D6H1-8HB1KTRtaHtDj8wM-VQf8I.css");
