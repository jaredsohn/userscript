// ==UserScript==
// @name		Scratch Forum Project/Video Embed
// @author 		Harakou
// @version     0.2.1
// @description  Adds embeds inline with forum posts for links to Youtube and Scratch projects
// @include		http://scratch.mit.edu/discuss/topic/*
// ==/UserScript==

var link, embedLink;
var links = document.getElementsByTagName("a");
var youtubePattern= /http:\/\/scratch.mit.edu\/discuss\/youtube\//i;
var projectPattern = /http:\/\/scratch.mit.edu\/projects\/[0-9]/i;

for (var i = 0; i < links.length; i++)
{
    link = links[i]
    if (youtubePattern.test(link.href) && link.parentNode.className != "postsignature" && link.parentNode.tagName != "BLOCKQUOTE")
    {       
        embedLink = document.createElement("iframe");
        embedLink.setAttribute("width", 420);
        embedLink.setAttribute("height", 315);
        embedLink.setAttribute("src", "//www.youtube.com/embed/" + link.href.split("/")[5]);
        embedLink.setAttribute("frameborder", 0);
        link.appendChild(embedLink);
    }
    else if (projectPattern.test(link.href) && link.parentNode.className != "postsignature" && link.parentNode.tagName != "BLOCKQUOTE")
    {
        embedLink = document.createElement("iframe");
        embedLink.setAttribute("allowtransparency", "true");
        embedLink.setAttribute("width", 485);
        embedLink.setAttribute("height", 402);
        embedLink.setAttribute("src", "http://scratch.mit.edu/projects/embed/" + link.href.split("/")[4]);
        embedLink.setAttribute("frameborder", 0);
        link.appendChild(embedLink);
    }
}