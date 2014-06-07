// ==UserScript==
// @name               WoT Opaque Global Map
// @description        Changes World of Tanks Global Map regions opaque.
// @include            http://*.worldoftanks.eu/*
// @version            1
// @grant              none
// ==/UserScript==
setInterval(function (event) {
    var paths = document.querySelectorAll('#l-provinces svg path[fill-opacity="0.3"]'),
        path, i;
    if (paths.length > 0) {
        for (i = 0; i < paths.length; i += 1) {
            path = paths[i];
            path.setAttribute('fill-opacity', '1');
            path.setAttribute('stroke', '#000000');
            path.setAttribute('stroke-width', '0.3px');
            path.setAttribute('stroke-opacity', '50');
            path.style.fillOpacity = '1';
            path.style.stroke = '#000000';
            path.style.strokeWidth = '0.3px';
            path.style.strokeOpacity = '50';
        }
    }
}, 500);