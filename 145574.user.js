// ==UserScript==
// @name           默认打开QQ云输入法, 海词划词翻译
// @namespace      
// @description    
// @include        *
// ==/UserScript==

(function(q){q?q.toggle():function(d,j){j=d.createElement('script');j.async=true;j.src='//ime.qq.com/fcgi-bin/getjs';j.setAttribute('ime-cfg','lt=2&im=125');d=d.getElementsByTagName('head')[0];d.insertBefore(j,d.firstChild)}(document)})(window.QQWebIME)

void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://dict.cn/hc/init.php');%20document.body.appendChild(element);})())