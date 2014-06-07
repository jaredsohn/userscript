// ==UserScript==
// @name Ottawa Citizen paywall bypasser
// @description Removes the nagging paywall overlay on the Ottawa Citizen site
// @include http://*.ottawacitizen.com/*
// ==/UserScript==

var scripts = document.getElementsByTagName("script")
var scriptName = "http://s.ppjol.net/pp.js";
for (var i=scripts.length; i>=0; i--){ 
    if (scripts[i] && scripts[i].getAttribute("src")!=null && scripts[i].getAttribute("src").indexOf(scriptName)!=-1)
        scripts[i].parentNode.removeChild(scripts[i])
        }
var content = document.getElementById("storyContent")
var pages = content.querySelectorAll("[id]");
var total = 0;
for (var i = 0, len = pages.length; i < len; i++) {
    var page = pages[i];
    if (page.id.indexOf("page") > -1) {
    total++;
    }
}
if(total > 1) pageClick(' - Story Page', total+1)