// ==UserScript==
// @name        Stop allkpop alerts
// @namespace   allkpoop.com
// @description Don't let allkpop ruin your user experience with alerts
// @include     http://www.allkpop.com/*
// @version     1
// @run-at      document-start
// ==/UserScript==

// https://userscripts.org/scripts/show/125936

var source;
var pattern = new RegExp("alert[(]\"Unfortunately.*[)];");
// stop script and insert new copy without the offending line
function replace_alert(e) {
    source = e.target.innerHTML;
    if (source.search(pattern) > -1) {
        e.stopPropagation();
        e.preventDefault();
        var new_script = document.createElement('script');
        new_script.innerHTML = source.replace(pattern, '');
        document.head.appendChild(new_script);
    }
}

window.addEventListener('beforescriptexecute', replace_alert);
