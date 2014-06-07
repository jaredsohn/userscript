// ==UserScript==
// @name       Add GitHub Repo Links
// @namespace  http://cskevint.github.io/
// @version    0.1.1
// @description  Add some useful links to the header area of a GitHub repo.
// @match      http*://github.com/*
// @copyright  2013, Kevin Trotter
// ==/UserScript==

$(function(){

    var pathname = window.location.pathname.split("/"),
        org = pathname[1],
        repo = pathname[2],
        action = pathname[3],
        branch = 'master',
        links = [];
    if(pathname[4]) {
      branch = pathname[4];
        if(pathname[5]) {
        	branch += "/"+pathname[5];    
        }
    }
    if(action == 'pull') {
    	branch = $(".current-branch span")[0].innerText;    
    }
    links.push("<span class=\"repohead-name-divider\">&nbsp;|&nbsp;</span>");
    links.push("<strong><a href=\"/"+ org +"/"+ repo +"/commits/" + branch + "\" class=\"js-current-repository js-repo-home-link\">commits</a></strong>");
    links.push("<span class=\"repohead-name-divider\">&nbsp;|&nbsp;</span>");
    links.push("<strong><a href=\"/"+ org +"/"+ repo +"/branches/" + branch + "\" class=\"js-current-repository js-repo-home-link\">branches</a></strong>");
    links.push("<span class=\"repohead-name-divider\">&nbsp;|&nbsp;</span>");
    links.push("<strong><a href=\"/"+ org +"/"+ repo +"/tree/" + branch + "\" class=\"js-current-repository js-repo-home-link\">tree</a></strong>");
    links.push("<span class=\"repohead-name-divider\">&nbsp;|&nbsp;</span>");
    links.push("<strong><a href=\"/"+ org +"/"+ repo +"/tags\" class=\"js-current-repository js-repo-home-link\">tags</a></strong>");
    $(links.join("")).insertBefore(".page-context-loader");

});
