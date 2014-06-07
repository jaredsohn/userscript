// ==UserScript==
// @name        linkbucks
// @namespace   xpsdeset
// @description inline linkbucks
// @include     http://*
// @version     1
// ==/UserScript==


for(x in document.querySelectorAll('a[href*="linkbucks.com"]'))
{

    var xyz=document.querySelectorAll('a[href*="linkbucks.com"]')[x];
    GM_xmlhttpRequest({
    method: 'GET',
    url: xyz.href,
    xyz:xyz,
    onload: function(response) {
        this.xyz.href=response.responseText.match(/TargetUrl = '(.*)';/)[1];

    }
    });

}