// ==UserScript==
// @name       Jira QuickLinks Toolbar
// @namespace  *.marc-hi.ca
// @version    0.1
// @description  Adds a toolbar to the top of the jira suite apps that has hyperlinks to let you quickly jump to other jira apps
// @match      http://jira.marc-hi.ca/*
// @match      http://fisheye.marc-hi.ca/*
// @match      https://confluence.marc-hi.ca/*
// @match      http://fisheye.marc-hi.ca:8085/*
// @copyright  2012, Stuart Philp
// ==/UserScript==

createToolbar();

function createToolbar() {
    var toolbar = document.createElement("div");
    toolbar.setAttribute("id", "jira-quicklink-toolbar");
    toolbar.setAttribute("style", "width: 100%; padding: 0.25em; background-color: #003366;");
        
    function makeLink(title, url) {
        var link = document.createElement("a");
        link.setAttribute("href", url);        
        link.setAttribute("style", "padding: 0.5em; color: #fff;");
        link.innerHTML = title;
        toolbar.appendChild(link);
    }
    
    //If you add another link, make sure you @match the domain above
    makeLink("Jira", "http://jira.marc-hi.ca/");
    makeLink("Fisheye", "http://fisheye.marc-hi.ca/");
    makeLink("Confluence", "http://confluence.marc-hi.ca/");
    makeLink("Bamboo", "http://fisheye.marc-hi.ca:8085/");
             
    //ignore iframes
    if (window.self == window.top) {
        document.body.insertBefore(toolbar, document.body.firstChild);
    }
}
