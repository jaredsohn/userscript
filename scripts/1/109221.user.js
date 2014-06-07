// ==UserScript==
// @name          Linksynergy Link Rewriter
// @namespace     
// @description   Rewrite ad-click links on Redflagdeals to make them direct
// @include       http://forums.redflagdeals.com/*
// @version       1.1
// ==/UserScript==
//

function main()
{
    var weblink = document.querySelectorAll('a[href*="click.linksynergy.com"]');
    for (var i = 0; i < weblink.length; i++)
    {
        var text = weblink[i].href.replace(/^(.*?)=http%253A/, 'http%253A');
        text = decodeURIComponent(decodeURIComponent(text));
        weblink[i].href = text
    }
    var weblink = document.querySelectorAll('a[href*="=http%3A%2F%2F"]');
    for (var i = 0; i < weblink.length; i++)
    {
        var text = weblink[i].href.replace(/^(.*?)=http%3A%2F%2F/, 'http%3A%2F%2F');
        text = decodeURIComponent(decodeURIComponent(text));
        weblink[i].href = text
    }
}

main();