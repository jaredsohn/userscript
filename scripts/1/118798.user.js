// ==UserScript==
// @description Adds a random button to thislife.org
// @author Spencer Miller
// @icon http://www.thisamericanlife.org/sites/all/themes/this_american_life/favicon.ico
// @name Any American Life
// @namespace http://www.spencer-miller.com/
// @match http://*.thisamericanlife.org/*
// @run-at document-end
// ==/UserScript==

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

// get menu
var parentNode = document.getElementById('primary');
var podcastButton  = parentNode.getElementsByClassName("podcast first");
var randList = document.createElement('li');
var randLink = document.createElement('a');
var randLinkText = document.createTextNode('Random');
var targetPosition = parentNode.getElementsByClassName('ways-to-listen first')[0];

var weeklyEpisodeLink = '';
try {
	weeklyEpisodeLink = document.getElementsByClassName("slider this-week active")[0].getElementsByTagName('a')[0]; // should only be one
} catch (err) {}

if(weeklyEpisodeLink){
	GM_setValue('maxEpisode',weeklyEpisodeLink.href.split('/')[5]);
}
var maxEpisodeNumber = GM_getValue('maxEpisode');
var randomEpisodeNumber = Math.floor(Math.random()*(parseInt(maxEpisodeNumber))) + 1 // no episode 0

randList.setAttribute('class', 'random_button');
randLink.href = 'http://www.thisamericanlife.org/radio-archives/episode/' + randomEpisodeNumber;
randLink.appendChild(randLinkText);
randList.appendChild(randLink);
parentNode.removeChild(podcastButton[0]);
parentNode.insertBefore(randList, targetPosition);