// ==UserScript==
// @name           Bugzilla click-row
// @namespace      github.com/rcmachado
// @description    Makes an entire row clickable on Bugzilla. See more info at http://gist.github.com/398983
// @include        */buglist.cgi?*
// ==/UserScript==

(function(){

    function gotoBug() {
        window.location.href = this.getElementsByTagName('a')[0].href;
        return false;
    }

    var lines = document.getElementsByClassName('bz_buglist')[0]
            .getElementsByTagName('tbody')[0]
            .getElementsByTagName('tr');

    // first line is header
    for (var i = 1, len = lines.length; i < len; i++) {
        lines[i].addEventListener('click', gotoBug, false);
        lines[i].style.cursor = 'pointer';
    }

}());