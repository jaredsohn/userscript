// ==UserScript==
// @name          EasyNews Filter
// @namespace     http://www.flickr.com/photos/valarauka/
// @description   Filter group results in Easynews Global search
// @include       http://*members.easynews.com/*
// ==/UserScript==

var options, thisoption;
var groups, thisgroup, parentrow;

var filters = [ /adult/, /alt.sex/, /eroti/ , /facials/ , /nude/ , /breasts/ , /adolescents/ , /teen/ ,
    /lucas-arts/, /pictures/ , /ijsklontje/ , /playgirl/ , /female/ , /bdsm/ , /xxx/ , /webcam/ , /wife/ , 
    /models/ , /snuffles/ , /panty/ , /celeb/ , /shaggable/ ];

options = document.evaluate( 
    "//option", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);

for (var i=0; i<options.snapshotLength; i++)
{
    thisoption = options.snapshotItem(i);
    for (var j in filters)
    {
        if (thisoption.innerHTML.match(filters[j]) != null)
        {
            thisoption.parentNode.removeChild(thisoption);
            break;
        }
    }
}

groups = document.evaluate( 
    "//td[@class='group']", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);

for (var i=0; i<groups.snapshotLength; i++)
{
    thisgroup = groups.snapshotItem(i);
    for (var j in filters)
    {
        if (thisgroup.innerHTML.match(filters[j]) != null)
        {
            parentrow = thisgroup.parentNode;
            parentrow.parentNode.removeChild(parentrow);
            break;
        }
    }
}