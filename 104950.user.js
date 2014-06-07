// twitter.com-demotion.user.js
//
// ==UserScript==
// @name          Twitter.com Demotion
// @namespace     http://userscripts.org/scripts/show/104950
// @description   Hides any promoted content
// @include       http://twitter.com/*
// @include       http://www.twitter.com/*
// @include       https://twitter.com/*
// @include       https://www.twitter.com/*
// ==/UserScript==
function demotion() 
{
    window.setTimeout(demotion,1000);
    var elements = document.getElementsByTagName('li');
    for (var i=0; i<elements.length; i++)
    {
        if (elements[i].className.match(/promoted/))
        {
            if (elements[i].style['display'].match(/none/)) continue;
            elements[i].style['display'] = 'none';
        }
    }
    var elements = document.getElementsByTagName('div');
    for (var i=0; i<elements.length; i++)
    {
        if (elements[i].className.match(/promoted/))
        {
            if (elements[i].style['display'].match(/none/)) continue;
            elements[i].style['display'] = 'none';
        }
    }
}
window.setTimeout(demotion,1000);