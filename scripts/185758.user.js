
// ==UserScript==
// @name                Tistory Add Original Links
// @description         Adds link to original size below each image
// @version         0.0012
// @include         http://*blog.daum.net/*
// @include         http://*cafe.daum.net/*
// @include         http://*tistory.com/*
// @include         http://*all-idol.com/*
// @include         http://*hvstudio.net/*
// @include         http://*idol-grapher.com/*
// @include         http://*idoleemo.com/*
// @include         http://*9mworld.com/*
// @include         http://*thestudio.kr/*
// @include         http://*apinkstudio.com/*
// @include         http://*drighk.com/*
// @include         http://*harane.com/*
// @include         http://*karagrapher.com/*
// ==/UserScript==

var tags = document.getElementsByTagName('img');
for (var i = 0; i < tags.length; i++) {
        if(tags[i].src.match(/\/image\//i)){
                var link = document.createElement('a');
                link.innerHTML = 'Original';
                link.href = tags[i].src.replace('image', 'original');
                tags[i].parentNode.appendChild(link);
        }
}
