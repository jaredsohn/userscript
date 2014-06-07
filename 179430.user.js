// ==UserScript==
// @name           txtread 
// @namespace      local 
// @description    txt pre read 
// @version        0.3.2
// @copyright      2013, era <erasinoo@gmail.com>
// @match          *://*/*.txt
// @updateURL      https://userscripts.org/scripts/source/179430.meta.js
// @downloadURL    https://userscripts.org/scripts/source/179430.user.js
// ==/UserScript==


a = document.getElementsByTagName('pre')[0];
a.style['font-family'] = '%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91';
a.style['font-size'] = '15px';
a.style['line-height'] = '25px';
a.style['width'] = '800px';
a.style['margin'] = '20px auto';
a.style['background'] = '#f7f7f7';
a.style['box-shadow'] = '0 0 5px #333333';
a.style['padding'] = '20px';
document.body.style['background'] = 'rgb(100, 97, 97)';
document.body;