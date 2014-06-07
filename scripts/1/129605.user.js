// ==UserScript==
// @name           Redirect to latest version of GWT Javadoc
// @include        http://google-web-toolkit.googlecode.com/*
// ==/UserScript==

// inspired from http://userscripts.org/scripts/review/59612

var paths = document.location.pathname.split('/');
var latest = 'latest';
if (paths[2]==='javadoc' && paths[3]!==latest) {
        paths[3] = latest;
        document.location = document.location.protocol + '//' + document.location.host + paths.join('/');
}
