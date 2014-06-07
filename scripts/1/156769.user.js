// ==UserScript==
// @name           Collect to baidu photo album
// @description    收藏到百度相册
// @auther		http://896221565.qzone.qq.com
// @version	 0.0.2
// @description   s896221565
// @Modified from  http://userscripts.org/users/sunbaokang
// @include        *
// ==/UserScript==
javascript:void(function(g,d,m,s){if(g[m]){if(window._bdXC_loaded){g[m].reInit();}}else{s=d.createElement('script');s.setAttribute('charset','utf-8');s.src='http://xiangce.baidu.com/zt/collect/mark.js?'+(new Date()).getTime();d.body.appendChild(s);}}(window,document,'_bdXC'))