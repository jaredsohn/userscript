// ==UserScript==
// @name           QQ五笔云输入法
// @namespace      ganxiangle@gmail.com
// @description    QQ五笔云输入法, modify the "QQ云输入法" by leevel 
// @include        *
// ==/UserScript==

// description    "im=212" means default to wubi
//                "im=012" ---> pinyin(全拼)
//                 .......
if(top.window!=self.window)
	return;
(function(q){!!q?q.toggle():(function(d,j){j=d.createElement('script');j.src='//ime.qq.com/fcgi-bin/getjs';j.setAttribute('ime-cfg','lt=2&im=212');d.getElementsByTagName('head')[0].appendChild(j)})(document)})(window.QQWebIME)


