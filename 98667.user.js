// ==UserScript==
// @name           Hide trolls on CouchSurfing.org NYC CS forums
// @namespace      http://sandeep.weblogs.us/
// @description    Hides trolls on the NYC CS forums.
// @include         http://www.couchsurfing.org/*

// ==/UserScript==

// List of blocked users (case-insensitive)
// This is a comma-separated list of users whose posts you wish to hide
// eg. if you want to hide Bob, Patrick, and Jennifer's posts & threads,
// your array of blocked users would be:
//
// var blockedusers = new Array('bob','patrick','jennifer');

var blockedusers = new Array('hotherculeez','worldlytreasure');

for(e=0;e<blockedusers.length;e++)
    {
    blockedusers[e] = blockedusers[e].toLowerCase();
    }

function hidetrolls()
    {
    var timeoutId = window.setTimeout(null, 5000);
    // Go through & hide matching in-thread posts
    var tags = document.getElementsByTagName('div');
    for (var key in tags)
    with (tags[key])
    if ( (getAttribute('class') == 'post' || getAttribute('class') == 'thread')
            && getAttribute('class') != 'title' )
        {
        for(var i=0;i<blockedusers.length;i++)
            {
            var bla = innerHTML.toLowerCase();
            //console.log(bla);
            if(bla.indexOf(blockedusers[i],0)>0)
                {
                style.display = 'none';
                }
            }
        }
    }
    
window.addEventListener('load', function()
    {
    hidetrolls();
    },true);