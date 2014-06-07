// ==UserScript==
// @name           Support HTML5's element <video> in Opera
// @namespace      http://arty.name/
// @description    Some authors already enjoy simplicity of publishing video with <video> tag, introduced in HTML5. However generic Opera builds still lack support of it due to constant changes in specification. This script provides poor man's support of this tag in Opera. IMPORTANT: change script's extension from .user.js to .js
// @include        *
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function(){
    var embed, videos = document.getElementsByTagName('video');
    for (var index = videos.length - 1; index >= 0; index--) {
        if (!embed) {
            embed = document.createElement('embed');
            embed.type = 'video/mp4';
        }
        var node = embed.cloneNode(false);
        var video = videos[index];

        node.id = video.id;
        node.className = video.className;
        node.height = video.getAttribute('height') || 480;
        node.width = video.getAttribute('width') || 640;
        node.autoplay = video.getAttribute('autoplay') || 'false';
        var src = video.getAttribute('src');
        if (!src) {
            var sources = video.getElementsByTagName('source');
            if (sources.length == 0) continue;
            var source = sources[0];
            src = source.getAttribute('src');
            if (!src) continue;
        }
        node.src = src;

        video.parentNode.replaceChild(node, video);
    }
}, false);