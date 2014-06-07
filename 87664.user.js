// ==UserScript==
// @name        Google Service Jumper
// @namespace   http://satomacoto.blogspot.com/
// @include     http://*.google.*/*?*
// @description For googling pages in other service.
// ==/UserScript==

(function () {
    var map = {
        "@google": "www.google.com/search",
        "@images": "images.google.com/images",
        "@video": "video.google.com/videosearch",
        "@maps": "maps.google.com/maps",
        "@news": "news.google.com/news",
        "@products": "www.google.com/products",
        "@books": "books.google.com/books",
        "@finance": "www.google.com/finance",
        "@translate": "translate.google.com/translate_t",
        "@scholar": "scholar.google.com/scholar",
        "@blog": "blogsearch.google.com/blogsearch",
        "@groups": "groups.google.com/groups",
        "@youtube": "www.youtube.com/results",
        "@code": "www.google.com/codesearch"
    };

    function check(url, map, key, query) {
        var _regex_key = new RegExp("q=(.*?)&");
        var _regex_url = new RegExp("http://(.+?)\\?(.*)");
        var _url = url.replace(_regex_key, "q=" + query + "&");
        _url = _url.replace(_regex_url, "http://" + map[key] + "?$2");
        window.location.replace(_url);
    }

    var url = window.location.href + "&";
    var q = url.match(/q=(.*?)&/)[1];

    var keys = decodeURIComponent(q).split(/[ \+]/);

    for (var i in keys) {
        var key = keys[i];
        if (map[key]) {
            keys.splice(i,1);
            var query = encodeURIComponent(keys.join(" "));
            check(decodeURIComponent(url), map, key, query);
        }
    }

})();

/*
http://www.google.com/search?q=google
http://images.google.com/images?q=google
http://video.google.com/videosearch?q=google
http://maps.google.com/maps?q=google
http://news.google.com/news?q=google
http://www.google.com/products?q=google
http://books.google.com/books?q=google
http://www.google.com/finance?q=google
http://translate.google.com/translate_t?q=google
http://scholar.google.com/scholar?q=google
http://blogsearch.google.com/blogsearch?q=google
http://groups.google.com/groups?q=google
*/
