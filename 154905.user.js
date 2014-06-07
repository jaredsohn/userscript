// ==UserScript==
// @name           QQ pinyin
// @description    QQ拼音
// @auther		http://896221565.qzone.qq.com
// @version	0.0.1
// @description    QQ拼音
// @include        *
// ==/UserScript==
javascript:(function(q){q?q.toggle():function(d,j){j=d.createElement('script');j.async=true;j.src='//ime.qq.com/fcgi-bin/getjs';j.setAttribute('ime-cfg','lt=2');d=d.getElementsByTagName('head')[0];d.insertBefore(j,d.firstChild)}(document)})(window.QQWebIME)
