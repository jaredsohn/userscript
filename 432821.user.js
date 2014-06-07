// ==UserScript==
// @name       Wikipedia: Translate language names in "Languages" section
// @include    http://*.wikipedia.org/*
// @include    http://en.wikipedia.org/*
// @include    http://de.wikipedia.org/*
// @include    http://es.wikipedia.org/*
// @include    https://*.wikipedia.org/*
// @include    https://en.wikipedia.org/*
// @include    https://de.wikipedia.org/*
// @include    https://es.wikipedia.org/*
// ==/UserScript==

var links = document.querySelectorAll("#p-lang .interlanguage-link a");

for(var i = 0; i < links.length; i++){
    var link = links[i];
        var res = link.title.match(/^(.+) [–—] ([^–—]+)$/);
        if(res){
            link.title = res[1];
            link.textContent = res[2];
            link.lang = "";
        }
}