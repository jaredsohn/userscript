// ==UserScript==
// @name           百度云下载不受限制
// @description    把"share"改为"wap"百度网盘下载大于2G的文件不用安装云管家
// @version        1.0
// @include        http://pan.baidu.com/share/link?shareid*
// @include        http://pan.baidu.com/share/link?uk*
// @run-at         document-start
// ==/UserScript==
           
(function(){
  location.href = document.URL.replace("share","wap");
})();