// ==UserScript==
// @name           Skip Middle Page
// @namespace      http://code.chimericdream.com/
// @description    Many sites use intermediary "landing" pages to link to external sites (such as tutorial websites and/or news aggregating sites). More often than not, these middle pages have little more than a sentence or two describing the content that you want to get to, coupled with targeted ads. This scripts automatically checks for known sites using this method and automatically forwards to the destination URL.
// @require        http://code.chimericdream.com/GmScripts/GM-AutoUpdate.php?id=63042
// @include        http://*.dzone.com/*
// @include        http://dzone.com/*
// @include        http://*.photoshoplady.com/*
// @include        http://photoshoplady.com/*
// @include        http://*.devsnippets.com/*
// @include        http://devsnippets.com/*
// @include        http://*.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

(function(d){
    var dzre = /dzone\.com/i // DZone
    var plre = /photoshoplady\.com/i // PhotoshopLady
    var dsre = /devsnippets\.com/i // DevSnippets
    var dgre = /digg\.com/i // Digg
    if (dzre.exec(window.location) !== null) {
        var site = 'dzone';
    } else if (plre.exec(window.location) !== null) {
        var site = 'pslady';
    } else if (dsre.exec(window.location) !== null) {
        var site = 'dvsnip';
    } else if (dgre.exec(window.location) !== null) {
        var site = 'digg';
    }
    
    switch (site) {
        case 'dzone':
            // DZone
            var dz1 = document.getElementById('linkDetails');
            var dz2 = getElementsByClassName('ldDescription', dz1);
            var dz3 = getElementsByClassName('ldTitle', dz2);
            if (dz1 && dz2 && dz3) {
                var dzlink = dz3[0].childNodes[0];
                if (dzlink) {
                    window.location = dzlink;
                }
            }
            break;
    
        case 'pslady':
            // PhotoshopLady.com
            var pllink = document.getElementById('bigImage');
            if (pllink !== null) {
                if (pllink.href !== null) {
                    window.location = pllink.href;
                }
            }
            // Added 3/24/10
            var h2els = document.getElementsByTagName('h2');
            for (var i in h2els) {
                var h2as = h2els[i].getElementsByTagName('a');
                for (var j in h2as) {
                    var atitle = h2as[j].getAttribute('title');
                    if (atitle.substr(0, 17) == 'Permanent Link to') {
                        window.location = h2as[j].href;
                    }
                }
            }
            break;

        case 'dvsnip':
            // DevSnippets.com
            var ds1 = document.getElementById('links');
            var ds2 = getElementsByClassName('recent-leads');
            var ds3 = getElementsByClassName('post-title');
            if (ds1 && ds2 && ds3) {
                var ltext = ds3[0].innerHTML;
                var re = /href=\"([^\"]*)\" title=\"/igm;
                var result = re.exec(ltext);
                if (result) {
                    window.location = result[1];
                }
            }
            break;
        case 'digg':
            var dg1 = document.getElementById('title');
            window.location = dg1.children[0];
            break;
    }
				
    function getElementsByClassName(classname)  {
        node = document.getElementsByTagName("body")[0];
        var a = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var els = node.getElementsByTagName("*");
        var j = els.length;
        for (var i = 0; i < j; i++) {
            if (re.test(els[i].className)) {
                a.push(els[i]);
            }
        }
        return a;
    }
    
}(document));