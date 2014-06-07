// ==UserScript==
// @name       Teamcity better titles
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      teamcity/*
// @copyright  2012+, You
// ==/UserScript==

var url = document.URL;
console.log(url);
var agentName = new RegExp(".*agentDetails.*");
var campaignName = new RegExp(".*viewLog.*");
var title = document.querySelector("title");

console.log(title.innerHTML);

if(agentName.test(url)){
    title.innerHTML = BS.Navigation.items[2].title;
}
if(campaignName.test(url)){
    title.innerHTML = BS.Navigation.items[3].title;
}