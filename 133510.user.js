// ==UserScript==
// @name          BetterUVA
// @version       0.0.4
// @namespace     http://wecing.org
// @description   Remove all useless stuff on uva.onlinejudge.org!
// @include       http://uva.onlinejudge.org/*
// @require       https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js
// ==/UserScript==

(function () {
    var old_f = null;
    if (window.onload) {
        old_f = window_onload;
    }
    window.onload = function () {
        if (old_f) {
            old_f();
        }
        if (window.location.search.indexOf("page=show_problem") != -1) {
            var header_table = $$("#col3_content_wrapper table")[0];

            var links = $$("#col3_content_wrapper table a");
            for (var i = 1; i < links.length; i++) {
                for (var j = 0; j < links[i].children.length; j++) {
                    if (links[i].children[j].tagName == "IMG" ||
                        links[i].children[j].tagName == "img") {
                        links[i].innerHTML = links[i].children[j].alt;
                    }
                }
            }

            var raw_link = $$("#col3_content_wrapper iframe")[0].src;
            var new_iframe = document.createElement("iframe");
            new_iframe.id = "screwuva";
            new_iframe.src = raw_link;
            new_iframe.width = "100%";
            new_iframe.height = "100%";
            new_iframe.frameborder = "0";
            while ($("page").hasChildNodes()) {
                $("page").removeChild($("page").firstChild);
            }
            $("page").appendChild(new_iframe);

            new_iframe.onload = function () {
                var _body = new_iframe.contentDocument.body;
                _body.insertBefore(header_table, _body.firstChild);

                for (i = 0; i < links.length; i++) {
                    var _l = links[i].href;
                    var _l_parts = _l.split('/')
                    var _parts = [];
                    for (var j = 0; j < _l_parts.length; j++) {
                        if (_l_parts[j] == "external") {
                            j += 2;
                        }
                        _parts.push(_l_parts[j]);
                    }
                    links[i].href = _parts.join("/");
                }
                new_iframe.focus();
            }
        }
    }
})();
