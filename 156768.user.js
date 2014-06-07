// ==UserScript==
// @name  Transfer to QQ photo album
// @description    转载到QQ相册
// @auther		http://896221565.qzone.qq.com
// @version	 0.0.2
// @description   s896221565
// @Modified from  http://userscripts.org/users/sunbaokang
// @include        *
// ==/UserScript==
javascript:void((function(){var d=document,w=window,e=d.createElement('script');if(w.__qqPinIt){w.__qq_inqzone=true;w.__qqPinIt();return}if(w.__qq_inqzone){return}e.setAttribute('type','text/javascript');e.async=true;e.setAttribute('charset','UTF-8');e.setAttribute('src','http://qzonestyle.gtimg.cn/campus/v4/js/photo2/module/shuqian/init.js?'+(Math.floor(+new Date/10000000)));d.body.appendChild(e);w.__qq_inqzone=true})());