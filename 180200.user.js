// ==UserScript==
// @copyright    2013 Atheismplus.com
// @description  Zaps tweets on TweetDeck that have "ask.fm" in their text.
// @icon         http://theblockbot.com/images/zapped!_48x48.gif
// @grant        none
// @match        http://web.tweetdeck.com/*
// @match        https://web.tweetdeck.com/*
// @name         Ask.fm Zapper for Tweetdeck
// @namespace    http://theblockbot.com/
// @version      1.1
// ==/UserScript==

var getText,getTweets,getTweetBody,matchString,matchPattern,getMatch,zap;getText=function(a){var b=[],c;c=function(a){a.firstChild&&c(a.firstChild);3===a.nodeType&&b.push(a.data);a.nextSibling&&c(a.nextSibling)};a&&c(a.firstChild);return b.join("")};getTweets=function(){return document.getElementsByClassName("js-stream-item-content")};getTweetBody=function(a){return a.getElementsByClassName("js-tweet-text")[0]};matchString="ask\\.fm";matchPattern=RegExp("\\b("+matchString+")\\b","i");
getMatch=function(a){a=getText(getTweetBody(a));return matchPattern.test(a)?!0:!1};zap=function(){var a,b=getTweets();for(a=0;a<b.length;a++)getMatch(b[a])&&(b[a].style.display="none")};window.setInterval(function(){zap()},5E3);