// ==UserScript==
// @name Web Auto Refresh
// @description Automatically refreshes the web page according to the specified interval.
// @author tc89
// @copyright tc89, 2014
// @version 1.0
// @include *
// ==/UserScript==


var parameter = getUrl();
var sec = (parameter['sec']) ? parameter['sec'] : 0;

if (sec > 0) {
    setTimeout(function() {
        document.location.reload();
        } , sec * 1000
    );
}

function getUrl() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}