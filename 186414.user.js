// ==UserScript==
// @name           Wenku.baidu.com down
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Share Easy so to create download.(downloads fast helper)
// @version        0.1.2
// @create         2012-12-29
// @lastmodified   2013-11-30
// @include        http://vdisk.weibo.com/s*
// @include        https://chrome.google.com/webstore*
// @include        http://pan.baidu.com/share/link*
// @include        http://*.xiaa.net/*.html
// @include        http://ishare*.sina*.cn/f/*
// @include        http://ishare*.sina*.cn/dintro.php?id=*

// @include        http://www.doc88.com/p-*.html

// @include        *n.baidu.com/share/link*
// @include        *n.baidu.com/disk/home*
// @include        *n.baidu.com/s/*
// @include        http://www.zitiguanjia.com/*.html
// @include        http://*.dospy.com/*attachment.php?aid=*
// @copyright      2012+, Yulei
// @run-at         document-start
// @grant          unsafeWindow
// @grant		GM_setClipboard
// @icon		http://s3.amazonaws.com/uso_ss/icon/155175/large.png
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js

// ==/UserScript==

(function() {
var Dhost=location.hostname.match(/\w+\.\w+$/i).toString(); var Lc=location,lurl=location.href; var win;try{win=unsafeWindow}catch(e){win=window}; var _Q=function(d) {return document.querySelector(d)},_Qa=function(d) {return document.querySelectorAll(d)};
var TiTle='点击下载-飞鸟制作';
var DM=function (m){return lurl.toLowerCase().indexOf(m)>0};
function Log(l){
console.log(l);
}

function Yul(){
 //域名判断开始
 switch (Dhost) {
case "weibo.com" : //新浪微盘,需登录、去分享这步，直接下载;By Yulei to ShareBALgD.js 2013.4.23
$('#download_big_btn, .vd_dload').attr('title',TiTle).click(function(){win.vdisk.api.downloadFile($(this).data('info').fid);});
break;
case "xiaa.net" : //字体管家，直接下载，无需工具;By Yulei 2013.7.29
case "zitiguanjia.com":
win.font_down=function(n,u,v,o){location.href=u};
break;
case "google.com" : //谷歌扩展离线下载;By Yulei 2013.7.29
var aa=document.createElement("a");aa.id="YDn";aa.title=TiT;aa.target="_blank";
aa.setAttribute('class',"webstore-B-E-J webstore-button webstore-button-hover");
aa.setAttribute('style',"position:fixed;left:0px;width:100%;text-align:center;font-weight:700;background-color:#5C92FF;z-index:9999");aa.innerHTML="离线下载本扩展程序(Offline download this extension)";_Q("body").appendChild(aa);
aa.onmouseover=function(){var Lpa=location.pathname;if (Lpa.indexOf('detail')>0){var Gur=Lpa.match(/\w+$/i).toString(),Gurl=Gur.length<10 ? Lpa.replace(/\/\w+$/,'').match(/\w+$/i):Gur;aa.href="https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D"+Gurl+"%26uc";}else{aa.href="#yu"}};
aa.onclick=function(){if(window.chrome){alert("请右键-另存为");return false}};
if (win['google']['loader']){var Glo=win.google.loader.ClientLocation;aa.title+="\n├————\n 经度："+Glo.longitude+" 纬度："+Glo.latitude+"\n 国家："+Glo.address.country+" 地区："+Glo.address.region+" 城市："+Glo.address.city+"\n————┤以上信息来自Google"}
break;
case "baidu.com" : //百度网盘去下载提示，直接下载;By Yulei 2013.7.29
setTimeout(function(){$("#activateGuidePopupOuter").remove()},999);
if(_Q('#downFileButtom')){
$('#downFileButtom').one("mouseover",function(){  var T=$(this),Dget=win.disk.Context.getService(8);
function Plink(){$.post(L, I,function(A) { var _=win.$.parseJSON(A);if (_.dlink){T.attr("href",_.dlink);win.$("#downFileButtom").unbind("click");$("#downloadVerify").html($("#downFileButtom"))};if (_.errno == -19){Dget._showDownloadVCodeDialog([win.FileUtils.fsId],"",_.img, _.vcode); $(".input-code").keyup(function(){if ($(this).val().length == 4){_Q(".sbtn").click();} });}  })}
var FU=win.FileUtils;L=win.disk.api.RestAPI.SHARE_GET_DLINK + "&uk=" + FU.share_uk + "&shareid=" + FU.share_id + "&timestamp=" + FU.share_timestamp + "&sign=" + FU.share_sign,I={fid_list: '["'+FU.fsId+'"]'};
Dget._checkDownloadFile=function(_, K, A, H, B, F){if (A){I.input=A;I.vcode=H;};if (K === false){L += "&nozip=1";}
Plink()};Plink();
}).find("b").attr({"style":"color:red","title":TiTle});
}else{
window.addEventListener("load",function(){
var ClK=[];setTimeout(function(){var Blist=win.FileUtils._mInfiniteListView._mElementsData;Blist.forEach(function(i){var Lk=i.dlink || '#';ClK.push(Lk);});
win.disk.Context.getService(8).download=function(A, B) {var A= !A.size ? A[0].fs_id.split(",") : A;this.straightforwardDownload(A, B);} },500);
if(!window.opera)$('#panInner').dblclick(function(){
var ClKs=[],gBls=win.FileUtils.getListViewCheckedItems();gBls.forEach(function(i){ClKs.push(i.dlink);});
var YlKK=(gBls.length>0) ? ClKs : ClK;
GM_setClipboard(YlKK.join('\r'));win.Utilities.useToast({toastMode:4,msg: '成功复制了<font color=red size=5> '+YlKK.length+' </font>条在剪贴板中',sticky:false});}).attr('title','双击空白区域复制[导出]下载链接！\n无选择则复制整个目录链接。');
}) }
break;
case "dospy.com" : //塞班论坛,免币下载，需登录；by Yulei to CrackUrlDN4.js 2013.4.18
Lc.href=lurl.replace(/attachment/ig,'downwithnosbb');
break;
case "doc88.com" : //道客巴巴，免费下载，调用自“科研家”;By Yulei 2013.8.23
_Q(".nobg").innerHTML='<form method="POST" action="http://keyan.cc/free/index.php?action=doc88" target="soapFrame"><input name="doc88url" type="hidden" value="'+lurl+'" size="25"><input type="submit" style="color:#8A2BE2" class="btndown1" title="来自《科研家》提示：我们会将道客巴巴的文档全部转换为doc格式。如原文档为ppt，则存在兼容性，请谅解。\n 较慢，请耐心—— By Yulei" value="免费下载"></form>';
break;
 }
}
window.addEventListener('DOMContentLoaded',Yul,false);


    function Yu() { var _$=function(id) {return !id ? null : document.getElementById(id);};var dowf=_$('download_file'),dowh=_$('hiddenfile_price'); var win = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
//爱问；判断变量，资料和文件页面不一样
    if (dowh) {fileid=(typeof win.fileid=="undefined")?win.mfileid:win.fileid;finaurl=(typeof win.finaurl=="undefined")?"http://ishare.sina.cn/dintro.php?id="+fileid:win.finaurl;
var tit="点击下载(^__^) Cracker By Yulei";
    if (dowh.value>0) {
    var dowfl="document.getElementById('iframe_fileinfo').src='"+finaurl+"';return false";
    dowf.setAttribute("onclick",dowfl);dowf.setAttribute("onmouseover","var dsize=document.getElementsByClassName('download_btn_box')[0];var dsize1=dsize.getElementsByTagName('span')[0].innerHTML;if (dsize1.indexOf('K')>0)return;if (dsize1>'5.00MB')alert('超出文件大小限制，5MB以上目前没破解哦')");
dowf.setAttribute("title",tit);
    }else{
dowf.setAttribute("onclick","document.getElementById('downLoad').action='/download.php?fileid='+fileid;downishare('0');return false;");
dowf.setAttribute("title",tit);
}
}
//}

    if (document.domain=="ishare.sina.cn") {
    if (document.getElementsByClassName('p')[0].getElementsByTagName('a')[0]){
    location.href=document.getElementsByTagName('a')[2];
}else{location.reload();} //..请稍后再试！
}


//文库
if (_$('login')) {//是否登录了百度，则退出
    var dowb=_$('downDoc-7'),Bif="width:350px;height:250px;position:absolute;";;
var shove1="<style>#down7 {position:static;}#down7 span{display:none;}#down7:hover span{display:block;}#Bifr{"+Bif+"}</style><span style=\"position:absolute;top:31px;left:233px;font-size:11px;color:green\">下载有时慢,需稍等</span>";
var shove2="<style>#down8 span{display:none;}#down8:hover span{display:block;position:absolute;top:11px !important;left:-10px;font-size:11px;color:green}#Bifr{"+Bif+"bottom:38px;right:0px}</style><span>下载有时慢,需稍等</span>";
var thurl="this.removeAttribute('onclick');this.outerHTML+='<iframe src=\"http://idown.org/cloud/reflash.php?id=bdwk/"+location.href.match(/ew\/(\w+)/)[1]+"\" id=\"Bifr\"></iframe>';return false";
    if (dowb) {
dowb.innerHTML=shove1;
    dowb.setAttribute("onclick",thurl);
//去掉原有单击侦听事件，以免提示登录
    dowb.outerHTML=dowb.outerHTML.replace('href="###"','title="点击下载-飞鸟制作i" id="down7" style="cursor:pointer"'); }
    var icr=function() {var dowr=document.getElementsByClassName('ic reader-download');if (dowr[0]) {dowr[0].innerHTML=shove2;dowr[0].setAttribute("onclick",thurl);dowr[0].outerHTML=dowr[0].outerHTML.replace('data-toolsbar-log="download"','title="点击下载(^__^) Cracker By Yulei" id="down8"');}}
    if(window.opera) {icr()}else{setTimeout(function(){icr()}, 900)};
};
       if (location.href.indexOf('reflash.php?id')>0){ function AtoD(){
       var url1=location.search,aurl=document.getElementsByTagName('a'),yum=_$('verifycode');
       var rimg=document.getElementsByTagName('img');
var thurl1="<iframe src=\"http://idown.org/cloud/down.php?url=http://wenku.baidu.com/view/"+url1.replace('?id=bdwk/','')+".html\" style=\"display:none;\"></iframe>";
var Nub=['绿色','2'][parseInt(Math.random()*2)];
       var div=document.createElement("div");div.id="divs";
div.innerHTML = "<i title='这时你可以做其它事'>正在努力自动输入验证码</i>…<style>#divs{width:100%;height:100%;position:absolute;background-color:#ccc;z-index:99;top:0;}a{color:red}</style><a onclick='document.cookie=\"Auto=ok\"' href=''>[手动]</a>";
       if (yum){
if (document.cookie.search('=ok')>0){return}else{document.body.appendChild(div);};
       yum.value='绿色';setTimeout(function(){document.getElementsByTagName('input')[5].click();}, 600);
       }
       if (rimg[0]){rimg[0].innerHTML=thurl1;}
}
 if (!window.opera){setTimeout(function(){AtoD()}, 300)}else{AtoD()} }
       if (location.href.indexOf('down.php')>0){location.href=document.links[0]}
}
window.addEventListener('DOMContentLoaded',Yu,false);
/*
 *  1、新浪爱问共享资料,直接下载，去积分限制，无须登录，积分文件目前只支持5M以下
  *   2、百度文库，直接下载，去积分限制，无须登录
   */
})();

/*
书签方式：
字体管家：javascript:void(font_down=function(n,u,v,yu){location.href=u})
谷歌扩展离线：javascript:location.href="http://clients2.google.com/service/update2/crx?response=redirect&x=id"+escape('=')+location.pathname.match(/\w+$/i)+escape('&')+"uc";void(YU);
*/

  /* （兼容：Firefox20、Chrome26；支持：Opera12；） 
  *百年老牌，值得信赖！专注下载百年，浩荡品牌里程。
 *主旨：简化流程、节省时间，改善体验。（化复杂的步骤为简，节约大量宝贵的时间浪费！）生存有道，放过别人也是放过自己。
   * 简单成就下载 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
    */