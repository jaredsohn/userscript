// ==UserScript==
// @name        自动打开google搜索工具
// @namespace   自动打开google搜索工具
// @description  自动打开google搜索工具
// @include     https://www.google.com/search?*
// @include     http://www.google.com/search?*
// @include     https://www.google.com.sg/search?*
// @include     http://www.google.com.sg/search?*
// @include     https://www.google.com.hk/search?*
// @include     http://www.google.com.hk/search?*
// @version     0.1
// @author 		loms126
// @run-at document-end
// ==/UserScript==

//alert('start')

//document.getElementById('hdtb_tls').click()

document.getElementById('hdtbMenus').setAttribute('class','hdtb-td-o')
//.setAttribute('aria-expanded','true')


//alert('end')