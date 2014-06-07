// ==UserScript==
// @name       Instructables Allsteps
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  This makes all the pages go ALLSTEPS
// @match      www.instructables.com
// @match      www.instructables.com/*
// @copyright  2012+, You
// ==/UserScript==

var links = document.links
for( i=0; i<document.links.length; i++ )
{
    var pattern = /http:\/\/www.instructables.com\/id\/.*\//g;
    if(pattern.test(document.links[i].href) )
    {
        document.links[i].href += "?ALLSTEPS";
    }
}