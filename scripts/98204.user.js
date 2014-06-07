// ==UserScript==
// @name           vector hide ads
// @revision       1
// @author         KID a.k.a. blueberrystream
// @description    Vectorのダウンロードページに出てくる広告を隠します
// @namespace      http://kid0725.usamimi.info
// @include        http://www.vector.co.jp/download/*
// ==/UserScript==

void(function() {

document.getElementById('adBox').style.display = 'none';

})();