// ==UserScript==
// @name           True URL downloads
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Display the real URL of the downloads.(xunlei,kuaiche,xuanfeng;thunder,flashget,qqdl)
// @version        1.02.26
// @create         2012-12-31
// @lastmodified   2013-01-26
// @include        *
// @copyright      2012+, Yulei
// ==/UserScript==

(function() {
window.addEventListener(
    "DOMContentLoaded",
    function() {
    var link=document.links;
for (var i=0,k=link.length; i<k; i++){
if(/\w+href/i.test(link[i].outerHTML)){
var lion=link[i].getAttribute("oncontextmenu");
if(lion){
link[i].setAttribute("onmouseover",lion);
}else if(/\w+href=/i.test(link[i].outerHTML)){//alert(link[i].outerHTML.match(/\w+href="[^ ]+"/i));
link[i].href=link[i].getAttribute(link[i].outerHTML.match(/\w+href/i));
}
link[i].addEventListener("mouseover",function(){if (this.href.indexOf('#')>0 || this.href.indexOf('java')>0){
this.href=this.getAttribute(this.outerHTML.match(/\w+href=/i).toString().replace(/=/,''));//alert(this.outerHTML.match(/\w+href=/i));alert(this.href);
}
}, false);link[i].removeAttribute("onclick");}
}
    }, false
);
})();

//ADD Bookmark:javascript:(function(){ var link=document.getElementsByTagName('a');for (var i=0,k=link.length; i<k; i++){if(/\w+href=/i.test(link[i].outerHTML)){link[i].href=link[i].getAttribute(link[i].outerHTML.match(/\w+href=/i).toString().replace(/=/,''));link[i].removeAttribute("onclick");}else if(/\w+href/i.test(link[i].outerHTML)){link[i].oncontextmenu();link[i].removeAttribute("onclick");}} void('Yulei');})();


  /* （兼容：Firefox18、Chromes23；支持：Opera12；） 
 *  通用匹配下载地址，如迅雷、快车、QQ旋风
  * 简单成就下载 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
   */

