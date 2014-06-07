// ==UserScript==
// @name           555ty
// @namespace      ty555
// @include        http://www.555ty.com/*
// ==/UserScript==

function fix555TY() {
    var imgs = document.getElementsByTagName("img");

    var template = null;
    for (var i = 0; i < imgs.length; i++) {
        var src = imgs[i].src;
        if (src.match(/^(http:\/\/[^\/]+\/[0-9]+\/[0-9]+\/)[0-9]+\.jpg$/)) {
            template = RegExp.$1 + "NUMBER.jpg";
            break;
        }
    }

    if (!template) return;
    var loc = window.location.href;
    var prefix = loc.substring(0, loc.length - 5);
    var links = document.getElementsByTagName("a");
    var max = 0;
    for (var i = 0; i < links.length; i++) {
        var link = links[i].href;
        if (link.substring(0, prefix.length) == prefix) {
            var end = link.substring(prefix.length);
            if (end.match(/^_([0-9]+)\.html$/)) {
                var num = parseInt(RegExp.$1, 10);
                if (num > max) max = num;
            }
        }
    }

    document.body.innerHTML = "";
    for (var i = 1; i <= max * 2; i ++) {
        var src = template.replace("NUMBER", i);
        var img = document.createElement("img");
        img.src = src;
        document.body.appendChild(img);
        document.body.appendChild(document.createElement("br"));
    }
}
try {
    fix555TY();
} catch (e) { alert(e); }
