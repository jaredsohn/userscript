// ==UserScript==
// @name        ValóVilágtalanító
// @namespace   valovilagtalanito.hu
// @description Töröl minden való világgal kapcsolatos cikket
// @include     http://index.hu/*
// @include     http://444.hu/*
// @include     http://www.origo.hu/*
// @include     http://*.blog.hu/*
// @version     2.0
// @grant       none
// ==/UserScript==


function main() {
    var data = [{
        "url": "http://index.hu",
        "tags": [{
            "tag": "h1",
            "next": true
        }, {
            "tag": ".indicator, .ajanlo, .social_post, .sziget",
            "next": false
        }]
    }, {
        "url": ".blog.hu",
        "tags": [{
            "tag": ".post",
            "next": false
        }]
    }, {
        "url": "http://www.origo.hu",
        "tags": [{
            "tag": ".news-item",
            "next": false
        }]
    }, {
        "url": "http://444.hu",
        "tags": [{
            "tag": ".item, .nlposts-block-item",
            "next": false
        }]
    }];

    var words = ["VV", "való világ", "valóvilág", "villalakó", "Gyúrós Józsi", "bieber", "aurélió"];

    function checkVV(str) {
        for (var w = 0; w < words.length; w++) {
            if (words[w] == "VV") {
                if (str.indexOf(words[w]) != -1) return true;
            } else {
                if (str.toUpperCase().indexOf(words[w].toUpperCase()) != -1) return true;
            }
        }
        return false;
    }

    var url = document.URL;

    for (var i = 0; i < data.length; i++) {

        if (url.indexOf(data[i].url) != -1) {
            for (var t = 0; t < data[i].tags.length; t++) {
                console.log(i, data[i].tags[t]);
                jQ(data[i].tags[t].tag).each(function () {
                    if (checkVV(jQ(this).html())) {
                        if (data[i].tags[t].next) {
                            jQ(this).next().remove();
                        }
                        jQ(this).remove();
                    }
                });
            }
        }

    }

}



function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


addJQuery(main);


