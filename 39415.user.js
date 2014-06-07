// ==UserScript==
// @name           fix title in LDC add form
// @namespace      http://fuba.moaningnerds.org/
// @include        http://clip.livedoor.com/clip/add?*
// ==/UserScript==

var input = document.getElementById('ClipTitleInput');
if (input.value.match(/http\:\/\//)) {
    if (location.search.match(/\&title\=([^\&]+)\&/)) {
        var title = RegExp.$1;
        input.value = decodeURIComponent(title);
    }
}

