// Web Page Auto Refresher
// Version 0.1 - April 23, 2009
// Copyright 2007-2009 Joe Lu
// Released under the GPL version 3
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Web Page Auto Refresher
// @namespace     Refresher
// @description   Automatically refreshes the web page for you and allows you to specify the time interval. All you need to do is add "&sec=60" in the end of the url. You can replace 60 with any other value you want. It represents the time interval between each refreshes in second.
// @include       *
// ==/UserScript==


var params = getUrlVars();
var sec = (params['sec']) ? params['sec'] : 0;

if (sec > 0) {
    setTimeout(function() {
        document.location.reload();
        } , sec * 1000
    );
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}