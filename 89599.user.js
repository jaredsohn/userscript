// ==UserScript==
// @name           Pinboard Inline
// @namespace      http://domnit.org/pinboard/
// @description    Embed media in Pinboard
// @include        http://pinboard.in/*
// @include        https://pinboard.in/*
// ==/UserScript==

/*
Pinboard Inline
2010 Leonid Domnitser

Version 0.1 (2010-11-02)
Only supports YouTube so far
 */


function youtube(link, match) {
    var videoId;
    var idMatch;
    if(match[1] == 'youtu.be') {
        idMatch = match[2].match(/^\/([\w\-]{11})/);
    } else {
        idMatch = match[2].match(/v=([\w\-]{11})/);
    }
    if(!idMatch) return;
    var videoId = idMatch[1];

    var playLink = document.createElement('a');
    playLink.href = 'javascript:;';
    playLink.innerHTML = ' &nbsp;&#x25bb';
    playLink.className = 'cached';
    playLink.addEventListener('click', function(event) {
            var br = link.parentNode.getElementsByTagName('br')[0];
            var div = document.createElement('div');
            div.innerHTML = '<embed src="http://www.youtube.com/v/' + videoId + '?fs=1&amp;hd=1&amp;autoplay=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="600" height="361"></embed>';
            br.parentNode.replaceChild(div, br);
            playLink.parentNode.removeChild(playLink);
        }, false);
    link.parentNode.insertBefore(playLink, link.nextSibling);
}

var sites = {
    'youtube.com': youtube,
    'youtu.be': youtube,
};

var rules = [];
for(host in sites) {
    var pat = new RegExp('^https?://' +
                         '(?:www.)?' +
                         '('+host+')' +
                         '(/.*)?');
    var cb = sites[host];
    rules.push({pat: pat, cb: cb});
}

var links = document.getElementsByClassName('bookmark_title');
for(var i = 0, link; link = links[i]; i++) {
    for(var j = 0, rule; rule = rules[j]; j++) {
        var m = link.href.match(rule.pat);
        if(m) {
            cb(link, m);
            break;
        }
    }
}
