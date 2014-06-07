// ==UserScript==
// @name          Community TV Tropes linkifier
// @namespace     http://userscripts.org/users/349048
// @description   Script that makes the names of TV Tropes, on the communitytropes tumblr, into links to http://tvtropes.org
// @include       http://communitytropes.tumblr.com/*
// @version       1.0
// ==/UserScript==

var BASE_URI = 'http://tvtropes.org/pmwiki/pmwiki.php/Main/';

(function () {
    "use strict";
    var captions = document.body.getElementsByClassName('caption');
    
    for (var i = 0; i < captions.length; i++) {
        var title = captions[i].getElementsByTagName('strong')[0];
        
        var articleName = title.innerHTML.substr(10).replace(/[^a-zA-Z0-9]+/g, '');
        var targetURI = BASE_URI + articleName;
        
        title.innerHTML = "<a href='" + targetURI + "'>" + title.innerHTML + "</a>";
    }
}());