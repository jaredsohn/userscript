// ==UserScript==
// @id             c2d91551-40da-480e-bc08-6c2ce65b801d
// @name           搜索直接进入百度知道结果
// @version        1.0
// @namespace      
// @author         idragonet
// @description    2B大战搞的
// @include        http://www.baidu.com/search/ressafe.html*
// @run-at         document-end
// ==/UserScript==



if (document.getElementById('warning_url'))
		document.getElementById('warning_url').click();
