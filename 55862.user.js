// ==UserScript==
// @description Hides 'My Daily Twittascope' entries on Twitter
// @name hide Twittascope
// @author o2dazone
// @include http://twitter.com/*
// ==/UserScript==

var banList = ["My Daily Twittascope", "More for Aries","More for Gemini","More for Sagittarius","More for Aquarius","More for Leo","More for Taurus","More for Cancer","More for Scorpio","More for Libra","More for Virgo","More for Capricorn","More for Pisces"];
var allTwits = document.getElementsByTagName('li');
for (phrases in banList) {
    for (eachTwit in allTwits) {
        if (allTwits[eachTwit].innerHTML.match(banList[phrases])) {
            allTwits[eachTwit].style.display = "none";
        }
    }
}