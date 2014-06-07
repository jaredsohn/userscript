// ==UserScript==
// @name           BaiduYun_Download
// @author         Shura
// @namespace      Shura.Baidupan
// @description    优化百度网盘的下载界面，直接显示下载链接
// @version        1.3.1
// @create         2013-07-21
// @lastmodified   2013-12-08
// @include          http://pan.baidu.com/share/*
// @include          http://pan.baidu.com/s/*
// @include          http://yun.baidu.com/share/*
// @include          http://yun.baidu.com/s/*
// @copyright      2013,Shura
// @updateURL      https://userscripts.org/scripts/source/174759.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174759.user.js
// @icon http://s3.amazonaws.com/uso_ss/icon/174759/large.jpg
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @Site           http://chenxuefeng.net.cn/
// @run-at document-end
// ==/UserScript==
(function() {

function Shura(){
var Dhost=location.hostname.match(/\w+\.\w+$/i).toString(); var Lc=location,lurl=location.href; var win;try{win=unsafeWindow}catch(e){win=window}; var _Q=function(d) {return document.querySelector(d)},_Qa=function(d) {return document.querySelectorAll(d)};
var TiTle='点击下载(^__^) By Shura',TiT='By Shura';
var DM=function (m){return lurl.toLowerCase().indexOf(m)>0};

setTimeout(function(){$("#activateGuidePopupOuter").remove()},999);
if(_Q('#downFileButtom')){
$('#downFileButtom').one("mouseover",function(){  var T=$(this),Dget=win.disk.Context.getService(8);
function Plink(){$.post(L, I,function(A) { var _=win.$.parseJSON(A);if (_.dlink){T.attr("href",_.dlink);win.$("#downFileButtom").unbind("click");$("#downloadVerify").html($("#downFileButtom"))};if (_.errno == -19){Dget._showDownloadVCodeDialog([win.FileUtils.fsId],"",_.img, _.vcode); $(".input-code").keyup(function(){if ($(this).val().length == 4){_Q(".sbtn").click();} });}  })}
var FU=win.FileUtils;L=win.disk.api.RestAPI.SHARE_GET_DLINK + "&uk=" + FU.share_uk + "&shareid=" + FU.share_id + "&timestamp=" + FU.share_timestamp + "&sign=" + FU.share_sign,I={fid_list: '["'+FU.fsId+'"]'};
Dget._checkDownloadFile=function(_, K, A, H, B, F){if (A){I.input=A;I.vcode=H;};if (K === false){L += "&nozip=1";}
Plink()};Plink();
}).find("b").attr({"style":"color:red","title":TiTle}).html("直接下载");
}
}
window.addEventListener('DOMContentLoaded',Shura,false);

if (document.title.match("百度云 网盘-链接不存在")) {
    if (location.search.split('?')[1].match("&uk=")) {
        document.location.href = document.location.href.replace(/link\?shareid=(\d+)\&uk=(\d+)[\s\S]*/g, "home?uk=$2#category/type=0");
    } else {
        document.location.href = document.location.href.replace(/link\?uk=(\d+)\&shareid=(\d+)[\s\S]*/g, "home?uk=$1#category/type=0");
    }
}
var LoadStop=0;//将var LoadStop=1替换它，即可快速加载
document.getElementsByClassName('slide-header-funcs')[0].style.margin="20px 40px 20px 70px";
if (document.getElementsByClassName('ellipsis')[0].innerHTML==="陈陈陈陈123")
{
	document.getElementsByClassName('ellipsis')[0].innerHTML="Shura";
	document.getElementsByClassName('ellipsis')[0].style.color="red";
}
//document.getElementsByClassName('b-fl')[2].innerHTML="<a href=\""+ dlink +"\">" + server_filename + "</a>";

/*
var Download_z=document.createElement("script");
   Download_z.type="text/javascript";
   Download_z.innerHTML='var obj = jQuery.parseJSON(disk.util.ViewShareUtils.viewShareData);$("header.slide-show-header>span").append(\'<a title="\'+server_filename+\'" id="downFileButtom" class="new-dbtn" hidefocus="true" href="\'+obj.dlink+\'"><em class="icon-download"></em><b>直接下载</b></a>\')';

var Download_thunder=document.createElement("script");
   Download_thunder.type="text/javascript";
   Download_thunder.innerHTML='var obj = jQuery.parseJSON(disk.util.ViewShareUtils.viewShareData);$("header.slide-show-header>span").append(\'<a title="Shura" class="new-dbtn" hidefocus="true" oncontextmenu=ThunderNetwork_SetHref(this) class=aThunder onclick="return OnDownloadClick_Simple(this,2,4)" thunderResTitle="迅雷下载"   thunderPid="133453" thunderHref="\'+obj.dlink+\'" href="javascript:;"><em class="icon-download"></em><b>迅雷下载</b></a>\');'
*/

var MoveAd=document.createElement("script");
   MoveAd.type="text/javascript";
   MoveAd.innerHTML='Hotrec.installAdPanl = function(){}'

document.getElementsByTagName("body")[0].appendChild(MoveAd);
if(LoadStop){window.stop()};
})();