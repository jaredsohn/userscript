// ==UserScript==
// @name        去除google重定向
// @namespace   去除google重定向
// @description  去除google重定向
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
window.setTimeout(function(){list_arr = document.querySelectorAll('div>h3>a[href][onmousedown]');
for (var i=0;i<list_arr.length;i++)
	{
		list_arr[i].removeAttribute('onmousedown');
	}},1000);

//alert('aaaa')
list_arr = document.querySelectorAll('div>h3>a[href][onmousedown]');
for (var i=0;i<list_arr.length;i++)
	{
		list_arr[i].removeAttribute('onmousedown');
	}