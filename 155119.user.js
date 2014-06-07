// ==UserScript==
// @name           Thunder address directly
// @description    直接得到迅雷地址
// @auther		http://896221565.qzone.qq.com
// @version	0.0.1
// @include        *
// ==/UserScript==


javascript:(function(){var link1 = document.documentElement.innerHTML.match(/thunderhref="thunder.*?\={0,2}"/) ; var link = link1[0].replace(/thunderhref="/,"") ;link = link.replace('"',"");var close=prompt('Thunder Link Get!',link);if (close!=null) {window.close()} })()


