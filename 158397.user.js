// ==UserScript==
// @name           Share easy downloads helper Modify by Bink
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Share Easy so to create download.(support Sina-iask,baidu-wenku)
// @version        1.26.04b
// @create         2012-12-29
// @lastmodified   2013-02-04
// @include        http://ishare*.sina*.cn/f/*
// @include        http://ishare*.sina*.cn/dintro.php?id=*
// @include        http://wenku.baidu.com/view/*
// @include        http://idown.org/cloud/reflash.php?id=*
// @include        http://idown.org/cloud/verifydown.php
// @updateURL      https://userscripts.org/scripts/source/155175.meta.js
// @downloadURL    https://userscripts.org/scripts/source/155175.user.js
// @run-at         document-idle
// @copyright      2012+, Yulei
// ==/UserScript==

(function() {
    function Yu() { var _$=function(id) {return !id ? null : document.getElementById(id);};var dowf=_$('download_file'),dowh=_$('hiddenfile_price'); var win = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    //dowf.removeAttribute("target"); //Sina iask
//if (document.domain=="ishare.iask.sina.com.cn") {
//判断变量，资料和文件页面不一样
    if (dowh) {fileid=(typeof win.fileid=="undefined")?win.mfileid:win.fileid;finaurl=(typeof win.finaurl=="undefined")?"http://ishare.sina.cn/dintro.php?id="+fileid:win.finaurl;
var tit="点击下载(^__^) Cracker By Yulei";
    if (dowh.value>0) {
    var dowfl="document.getElementById('iframe_fileinfo').src='"+finaurl+"';return false";
    dowf.setAttribute("onclick",dowfl);dowf.setAttribute("onmouseover","var dsize=document.getElementsByClassName('download_btn_box')[0];var dsize1=dsize.getElementsByTagName('span')[0].innerHTML;if (dsize1.indexOf('K')>0)return;if (dsize1>'5.00MB')alert('超出文件大小限制，5MB以上目前没破解哦')");
dowf.setAttribute("title",tit);
    }else{
dowf.setAttribute("onclick","document.getElementById('downLoad').action='/download.php?fileid='+fileid;downishare('0');return false;");
dowf.setAttribute("title",tit);
//dowf.href="javascript:document.getElementById('downLoad').action='/download.php?fileid='+fileid;downishare('0');";
}
}
//}
//setTimeout(function(){
    if (document.domain=="ishare.sina.cn") {
    if (document.getElementsByClassName('p')[0]){
    //document.getElementsByClassName('wrap')[0];
    window.location=document.getElementsByTagName('a')[2];
}
}
//}, 5000);

//Baidu Wenku start
if (_$('login')) {//是否登录了百度
    var dowb=_$('downDoc-7');
var shove1="<style>#down7 {position:static;}#down7 span{display:none;}#down7:hover span{display:block;}</style><span style=\"position:absolute;top:31px;left:256px;font-size:11px;color:green\">下载有时慢,需稍等</span>";
var shove2="<style>#down8 span{display:none;}#down8:hover span{display:block;position:absolute;top:11px;font-size:11px;color:green}</style><span>下载有时慢,需稍等</span>";
shove=(!dowb) ? shove2 : shove1;
if(window.opera){var thurl="this.innerHTML='<iframe src=\"http://idown.org/cloud/reflash.php?id='+WkInfo.DocInfo.docId+'\" style=\"display:none;\"></iframe>'+shove+'';return false";}else{
var thurl="this.innerHTML='<iframe src=\"http://idown.org/cloud/reflash.php?id='+WkInfo.DocInfo.docId+'\" style=\"display:none;\"></iframe><style>#down7 {position:static;}#down7 span{display:none;}#down7:hover span{display:block;}</style><span style=\"position:absolute;top:31px;left:256px;font-size:11px;color:green\">下载有时慢,需稍等</span><style>#down8 span{display:none;}#down8:hover span{display:block;position:absolute;top:11px;font-size:11px;color:green}</style><span>下载有时慢,需稍等</span>';return false";}//Flash page
    if (dowb) {
    dowb.setAttribute("onclick",thurl);
//去掉原有单击侦听事件，以免提示登录
    dowb.outerHTML=dowb.outerHTML.replace('href="###"','title="点击下载(^__^) Cracker By Yulei" id="down7" style="cursor:pointer"'); }
    var icr=function() {var dowr=document.getElementsByClassName('ic reader-download');if (dowr[0]) {dowr[0].setAttribute("onclick",thurl);dowr[0].outerHTML=dowr[0].outerHTML.replace('data-toolsbar-log="download"','title="点击下载(^__^) Cracker By Yulei" id="down8"');}}//dowr[0].setAttribute("id","down8");
    if(window.opera) {icr()}else{setTimeout(function(){icr()}, 700)};
};
       var url1=location.search,aurl=document.getElementsByTagName('a'),yum=_$('yuc_main_verifycode');
       if (location.href.indexOf('reflash.php?id')>0){
       var rimg=document.getElementsByTagName('img');
var thurl1="<iframe src=\"http://idown.org/cloud/down.php?url=http://wenku.baidu.com/view/"+url1.replace('?id=','')+".html\" style=\"display:none;\"></iframe>";
       if (yum){_$('verifycode').value='\u9c9c';setTimeout(function(){document.forms[0].submit();}, 500);}
       if (rimg[0]){rimg[0].innerHTML=thurl1;}
}       if (aurl[0].href.indexOf('aliyuncs')>0){location.href=aurl[0];};
}
if(window.opera){window.addEventListener('DOMContentLoaded',Yu,false)}else{Yu()};
})();

  /* （兼容：Firefox18、Chromes23；支持：Opera12；） 
 *  1、新浪爱问共享资料,直接下载，去积分限制，无须登录，积分文件目前只支持5M以下
  *   2、百度文库，直接下载，去积分限制，无须登录
   * 简单成就下载 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
    */

