// ==UserScript==
// @name           twitter sidebar extension
// @namespace      http://twitter.com/gingitsune1991
// @version        1.1
// @description    サイドバーにFavstarやTwtrfrndのリンクを追加します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function (d) {

    var LINK = document.createElement('a');
    LINK.setAttribute("class", "external-link list-link");
    LINK.innerHTML = "Exlist";

    var BASE_URL = {
        "Favstar": "http://favstar.fm/users/",
        "Twtrfrnd": "http://twtrfrnd.com/gingitsune1991/", //自分のIDに代えてください！！！
        "Favgraph": "http://workline.xii.jp/favgraph/#!",
        "Twilog": "http://twilog.org/" //以降好きなものを増やせます
    }
    var len = 0;
    for (var i in BASE_URL) {
        len++;
    }
    function func() {
        var profile = d.getElementsByClassName('profile-card-inner')[0];
        var context = document.getElementsByClassName('external-link');
        var df = document.createDocumentFragment();
        if (context.length < 1) {
            var pNode = document.createElement("li");
            var iclass = new Array(len);
            for (var j = 0; j < len; j++) {
                iclass[j] = document.createElement('i');
                iclass[j].setAttribute("class", "chev-right");
            }
            pNode.appendChild(LINK);
            var screenName = profile.getAttribute('data-screen-name');
            var clone = new Array(len);
            var element = document.getElementsByClassName("js-nav-links")[0];
            var media0 = element.lastChild;
            var medias = element.childElementCount;
            if (medias == 6) {
                var media = media0.previousSibling;
            } else {
                var media = media0;
            }
            var k = 0;
            for (var i in BASE_URL) {
                clone[k] = LINK.cloneNode(true);
                clone[k].innerHTML = i;
                clone[k].appendChild(iclass[k]);
                clone[k].href = [BASE_URL[i], screenName].join("/");
                df.appendChild(clone[k]);
                k++;
            }
            element.insertBefore(df, media);
        }
    }
    var timer = null;
    d.addEventListener('DOMNodeInserted', function (e) {
        var cn = e.target.className;
        if (cn && !cn.indexOf("stream-item"))
            return;

        clearTimeout(timer);
        timer = setTimeout(func, 20);
    }, false);

})(document);
