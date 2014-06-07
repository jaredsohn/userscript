// ==UserScript==
// @name       Stackoverflow open all questions on page in a new tabs
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @match      http://stackoverflow.com/questions/tagged/*
// @copyright  2013+
// ==/UserScript==

var headerArray = document.getElementsByTagName('h3'); // get all links
var linksArray = new Array();
var linksArray2 = new Array();

for (var i = 0; i < headerArray.length; i++)
{
    linksArray.push(headerArray[i].getElementsByTagName('a'));
    for (var index = 0; index < linksArray[i].length; index++) 
    {
        linksArray2.push(linksArray[i][index].href);
    }
}

if (confirm('Open links?'))
{
    for (var index2 = 0; index2 < linksArray2.length; index2++) 
    {
        window.open(linksArray2[index2],'_blank');
    }
}