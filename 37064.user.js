// ==UserScript==
// @name           usericonize favotter
// @namespace      http://fuba.moarningnerds.org/
// @include        http://favotter.matope.com/*
// ==/UserScript==

// 2008.11.18 modified by fuba (関係ない画像まで変更してたバグ修正)
// 2008.11.18 modified by fuba (usericons以外のアイコンでかく)
// 2008.11.18 modified by os0x (http://gist.github.com/26033)
// 2008.11.18 written by fuba

var newsrc = function (img, username) {
    var usericons_prefix = 'http://usericons.relucks.org/twitter/';
    var src = img.src;
    if (img.naturalWidth == 0) {
        src = usericons_prefix + username;
    }
    else {
        if (src.match(/twitter_production/)) {
            src = src.replace(/[a-z]+\.([a-z]+)$/i, "bigger.$1");
        }
    }
    return src;
};

var usericonize = function (root) {
    setTimeout(function(){
        var message = document.getElementById('message');
        if (message) {
            var img = message.getElementsByTagName('img')[0];
            if (img) {
                img.src = newsrc(img, img.parentNode.href.replace(/http\:\/\/twitter\.com\//, ''));
            }
        }
        var imgs = root.getElementsByTagName('img');
        for (var i=0;i<imgs.length;i++) {
            var img = imgs[i];
            img.src = newsrc(img, img.alt);
        }
    },10);
};
usericonize(document.body);
if (window.AutoPagerize)
    window.AutoPagerize.addFilter(function(docs){docs.forEach(usericonize);});
