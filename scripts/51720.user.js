// ==UserScript==
// @name           YouTube KeepVid
// @namespace      aarc
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==

(function(){
    var n = document.getElementById('watch-views-div');
    if (n) {
        n.innerHTML += '<br /><span style="font-weight: bold"><a target="_blank" href="http://keepvid.com/?url=' + window.location + '">Download</a></span>';
    }
})();
