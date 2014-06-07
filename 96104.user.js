// ==UserScript==
// @name           The Lost Comments for cnbeta
// @namespace      mybeky
// @include        http://www.cnbeta.com/articles/*
// @include        http://cnbeta.com/articles/*
// @version	   0.2
// ==/UserScript==

//var log = unsafeWindow.console.log;

var sid = location.href.match(/\d+/)[0];

var n_url = 'http://www.cnbeta.com/comment/normal/' + sid + '.html'
var c_url = 'http://cb.mybeky.co.cc/comment?id=' + sid
var h_url = 'http://cb.mybeky.co.cc/hot_comment?id=' + sid

var add_comment = function(obj, text) {
    document.getElementById(obj).innerHTML = text;
}

GM_xmlhttpRequest({
    method: "GET",
    url: n_url,
    onload: function(response) {
        if (response.responseText == "") {
            GM_xmlhttpRequest({
                method: "GET",
                url: c_url,
                onload: function(response) {
                    add_comment('normal', response.responseText)
                }
            });

            GM_xmlhttpRequest({
                method: "GET",
                url: h_url,
                onload: function(response) {
                    var g_t = document.getElementById('g_title')
                    if (g_t) {
                        g_t.innerHTML += '*';
                    }
                    add_comment('g_content', response.responseText)
                }
            });
        }
    }
});

