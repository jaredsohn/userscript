// ==UserScript==
// @name       porn link fixer
// @namespace  http://none.none
// @version    0.6
// @description  removes the "click" fucker from the video links
// @include      *wowxxxtube.com/*
// @include      *xxxtube.fm/*
// @include      *duckmovie.com/*
// @include      *worldsex.vc/*
// @include      *boldporno.com/*
// @include      *fuck.sc/*
// @copyright  2013-Nov-3, Anon
// CHANGELOG
// 0.1 - only wowxxxtube (2013-Oct-07)
// 0.2 - added xxxtube, duckmovie, worldsex (2013-Oct-08)
// 0.3 - added fix for links in the "related" section below the vids (2013-Oct-11)
// 0.4 - added fix for boldporno (2013-Oct-11)
// 0.5 - added fix for fuck.sc (2013-Oct-26)
// 0.6 - update fix for boldporno (2013-Nov-3)
// ==/UserScript==

//from another script
if(unsafeWindow.console){
   var gmlog = unsafeWindow.console.log;
}

//get all <a> links
var links = document.getElementsByTagName("a");

//for each a link
for(var i = 0; i < links.length; i++)
{
    //get the href field
    var href = links[i].href;
    
    //parse the query string into an array
    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(href.replace(/&amp;/g, '&').substr(href.indexOf("?",0)+1).split('&'));
    
    //if the link contains the "click" fucker, replace the link with the video url
    if(qs["go"]=="click"){links[i].href = unescape(qs["u"]);}
    
    //if the link contains the "related" fucker, replace the link with the video url
    if(qs["link"]=="related"){links[i].href = unescape(qs["url"]);}
    
    //if hostname is "www.boldporno.com", then return the "url" field: 
    if((links[i].hostname == "www.boldporno.com") && (links[i].pathname == "/out/o.php")) {links[i].href = unescape(qs["url"]);}

    //if hostname is "fuck.sc", then return the "url" field: 
    if(links[i].hostname == "www.fuck.sc") {links[i].href = unescape(qs["l"]);}
}