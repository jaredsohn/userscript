// ==UserScript==
// @name       Tweakers.net HTML5 video
// @namespace  http://softwarebakery.com/frozencow/
// @version    0.2
// @description  Replaces all (flash) videos on Tweakers.net with HTML5 videos.
// @include    http://tweakers.net/*
// @copyright  2011+, FrozenCow
// ==/UserScript==

function getParam(elem,name) {
    var param = Array.prototype.filter.apply(elem.getElementsByTagName('param'), [function(param){ return param.getAttribute('name') === name; }])[0];
    return param && param.getAttribute('value') || null; 
}

var tags = document.getElementsByTagName('object');
for(var i=0;i<tags.length;i++) {
    if (tags[i].getAttribute('data') && tags[i].getAttribute('data').substr(0,35) === 'http://static.tweakers.net/x/video/') {
        var embed = tags[i];
        var flashvars = getParam(embed, 'flashvars');
        
        if (!flashvars) { continue; }
        var match = /(^|&)file=([^\&]+)/.exec(flashvars);
        if (!match) { continue; }
        var file = decodeURIComponent(match[2]);
        
        var video = document.createElement('video');
        video.setAttribute('src', file);
        video.setAttribute('controls', '1');
        video.style.width = '100%';
        console.log(video);
        embed.parentNode.replaceChild(video,embed);
    }
}