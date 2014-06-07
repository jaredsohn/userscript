// ==UserScript==
// @name       微博急简
// @namespace  http://yuyoki.blog.163.com/
// @version    1.0
// @description  针对新版微博内容进行优化
// @match      http://*/*
// @copyright  Eric
// ==/UserScript==
javascript:(function(){var l=document.createElement('link');l.type="text/css";l.rel="stylesheet";l.charset="utf-8";l.href="http://sneezryworks.sinaapp.com/wbMini.css";document.getElementsByTagName('head')[0].appendChild(l);})()