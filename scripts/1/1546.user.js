// ==UserScript==
// @name          Jobsite confirm delete
// @namespace     http://www.hiddenisland.co.uk/greasemonkey
// @include       http://jobsite.co.uk/*
// @include       http://www.jobsite.co.uk/*

// ==/UserScript==

(function() {

    var anchors = document.getElementsByTagName("a");
    for(var a = 0; a < anchors.length; a++) {
        if(anchors[a].innerHTML == "delete") {
//            anchors[a].style["display"] = "none";
            anchors[a].setAttribute("onclick", "javascript:if (!confirm('delete saved search?')) return false;" );
        }
    }

})();