// ==UserScript==
// @name           StackExchange Search Accesskey
// @namespace      http://userscripts.org/users/351198
// @description    Bind the 'f' accessKey to the search box on StackExchange sites
//
//
// @include       http://stackoverflow.com/*
// @include       http://meta.stackoverflow.com/*
// @include       http://superuser.com/*
// @include       http://meta.superuser.com/*
// @include       http://serverfault.com/*
// @include       http://meta.serverfault.com/*
// @include       http://askubuntu.com/*
// @include       http://meta.askubuntu.com/*
// @include       http://answers.onstartups.com/*
// @include       http://meta.answers.onstartups.com/*
// @include       http://nothingtoinstall.com/*
// @include       http://meta.nothingtoinstall.com/*
// @include       http://seasonedadvice.com/*
// @include       http://meta.seasonedadvice.com/*
// @include       http://crossvalidated.com/*
// @include       http://meta.crossvalidated.com/*
// @include       http://askdifferent.com/*
// @include       http://meta.askdifferent.com/*
// @include       http://stackapps.com/*
// @include       http://*.stackexchange.com/*

// @include       http://stackexchange.com/*
// @include       http://data.stackexchange.com/*
// @include       http://area51.stackexchange.com/*
// @include       http://discuss.area51.stackexchange.com/*
// @include       http://*.blogoverflow.com/*
// @include       http://blog.stackoverflow.com/*
// @include       http://blog.serverfault.com/*
// @include       http://blog.superuser.com/*

// @include       http://chat.stackexchange.com/*
// @include       http://chat.stackoverflow.com/*
// @include       http://chat.meta.stackoverflow.com/*


// @exclude       http://*/reputation
// @exclude       http://api.*
// ==/UserScript==

(function() {
    var key = "f", 
        h = window.location.hostname;
    
    if (h === "stackexchange.com") {
        var node = document.getElementById('search');
    } else if (h === "data.stackexchange.com") {
        var node = document.getElementById('searchtext');
    } else if (h === "area51.stackexchange.com") {
        var node = document.getElementById("search-input");
    } else if (/\.blogoverflow\.com$/.test(h)) {
        var node = document.getElementById('s');
    } else if (h == "blog.gaming.stackexchange.com") {
        var node = document.getElementById('s');
    } else if (/^chat\./.test(h)) {
        var node = document.getElementById('searchbox');
    } else {
        var node = document.querySelectorAll('#search input[name="q"]')[0];
    }
    
    if (node) {
        node.accessKey = key;
    }
})();
