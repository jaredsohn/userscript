// ==UserScript==
// @name          Twitter 4sq remover
// @namespace     Twitter_4sq_remover
// @description   Removes tweets related to Foursqure
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

(function() {
    var statuses = document.getElementById('timeline').getElementsByTagName('li');
    for (var i = statuses.length - 1; i >= 0; i--){
        var s = statuses[i];
        var spans = s.getElementsByTagName('span');
        for (var j = spans.length - 1; j >= 0; j--){
            var span = spans[j];
            if (span.innerHTML.indexOf('4sq.com') != -1) {
                // be gone!
                s.setAttribute('style','display:none');
            }
        };
    };
}());
