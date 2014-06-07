// ==UserScript==
// @name           Crack Url Wait Code Login
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Remove from net disk and downloads to Verification code,login,wait,(Multi-in one,Easy to create downloads).
// @version        4.41.30y
// @create         2012-11-21
// @lastmodified   2014-04-30
// @include        http://www.rayfile.com/*/files/*
// @include        http://dl.vmall.com/*
// @include        http://www.vdisk.cn/down/index/*
// @include        http://*.yunfile.com/f*/*
// @include        http://down.it168.com/*/index.shtml
// @include        http://www.yimuhe.com/*.html
// @include        http://www.fileim.com/file/*.html
// @include        http://www.kuaipan.cn/file/id_*.htm
// @include        http://*.7958.com/down*.html
// @include        http://www.nyhx.com/*.html
// @include        http://dl.dbank.com/*
// @include        http://www.79pan.com/*.html
// @include        http://www.87pan.com/*.html
// @include        http://u.xunzai.com/?ac=download&id=*
// @include        http://www.ctdisk.com/file/*
// @include        http://www.400gb.com/file/*
// @include        http://www.bego.cc/file/*
// @include        http://www.pipipan.com/file/*
// @include        http://www.supan.la/*.html
// @include        http://www.bpan.net/*.html
// @include        http://www.azpan.com/*.html
// @include        http://www.360disk.com/*.html
// @include        http://www.2kuai.com/*-*.html
// @include        http://www.colafile.com/down/*
// @include        http://v.dxrr.com/*.html
// @include        http://www.dxrr.com/*.html
// @include        http://d.119g.com/f/*.html
// @include        http://v.32666.com/*.html
// @include        http://www.sufile.com/file/*.html
// @include        http://www.sufile.com/down/*.html
// @include        http://*wpan.cc/file-*.html
// @include        http://www.gxdisk.com/file-*.html
// @include        http://gxp.so/*
// @include        http://*.qjwm.com/down*.html
// @include        http://www.colafile.com/file/*
// @include        http://www.gxp.cc/*.html
// @include        http://u.xunzai.com/fileview_*.html
// @include        http://www.verycd.com/topics/*
// @exclude        http://www.verycd.com/topics/*/comments*
// @copyright      2012+, Yulei
// @grant          unsafeWindow
// @run-at         document-start
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @icon          http://s3.amazonaws.com/uso_ss/icon/153190/large.png
// @updateURL      https://userscripts.org/scripts/source/153190.meta.js
// @downloadURL    https://userscripts.org/scripts/source/153190.user.js
// ==/UserScript==

(function() {
var Lc=location,lurl=location.href;var dhost=location.hostname.replace(/\w+\./,''); var win = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow; var _Q=function(d) {return document.querySelector(d)},_Qa=function(d) {return document.querySelectorAll(d)};
var TiTle='点击下载(^__^) Cracker By Yulei',TiT='Cracker By Yulei',Tco="输入验证码后自动跳转\n --"+TiT;
var DxM=function (m){return lurl.toLowerCase().indexOf(m)>0}
function AutoPRe(E){var Fi=/(file|view)([-])/i;if(E)Fi=/(file)(\/)/i;if(Fi.test(lurl))Lc.href=lurl.replace(Fi,'down$2');}
function Log(l){ //调试专用
console.log(l);
}
function Keyb(id,sl,co,n,sc,scK){
var TT="数字输入盘 - By Yulei",Tab='<tr><td>1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>5</td><td>6</td><td>0</td></tr><tr><td>7</td><td>8</td><td>9</td><td>C</td></tr>  <style>#YkB td {font:25px Tahoma;font-weight:bold;color:red;cursor:pointer;vertical-align: middle;border:1px solid #DDDDDD;padding:6px;} #YkB{background-color:#ffcc99;border-collapse:collapse;position:relative;bottom:139px;left:'+sl+'px}</style>';
if(typeof $ !="undefined"){$(id).after('<table id="YkB" title="'+TT+'">'+Tab+'</table>');}else{
var tb=document.createElement("table");
tb.id="YkB";tb.innerHTML=Tab;
_Q(id).appendChild(tb);
}
var rcde=_Q(co);
for (i=0;i<11;i++){
_Qa('#YkB td')[i].onclick=function() {
if(this.innerHTML == "C"){rcde.value=''}else{
rcde.value +=this.innerHTML;}
if(rcde.value.length == n){if(typeof sc == "object"){sc.click()}else{sc()};if(scK)setTimeout(function(){scK.click()},500)}
  }
 }
}

function Yu(){ 
if (DxM('gxp.so')){Lc.href=_Q('.td_line a').href} //下一页,by Yulei 2014.03.01

 //域名判断开始
 switch (dhost) {
case "vmall.com" : //华为网盘,Login,Vcode,Wait 10.
case "dbank.com" : //登录用户下无效
 if(!$.cookie("pid")){$.cookie("pid","30",{expires: 365});location.reload();};
//等级过低不能外链修复
if (win.globallinkdata.data.linkOverAuth == "true") {
var Lia=_Qa('a[class="disk_icon compress-icon"]');
for (var i=0;i<Lia.length;i++){
Lia[i].onclick=function (){win.dbank.securelink.downloadfile(this);return false;}
Lia[i].href="#";
}
}
break;
case "vdisk.cn" ://威盘,wait 10s,code
$('#loadingbox').hide();win.yanzheng_ok();
break;
case "verycd.com" ://电驴VeryCD
$("#iptcomED2K").before("<input type='button' value='显示隐藏资源（^__^）' class='button downall' onclick='$(\"#iptcomED2K\").html(\"<iframe class=Banner3 src=\"+location.href.replace(\"www.verycd.com\",\"www.verycd.gdajie.com\")+\" scrolling=yes width=760 height=550 frameborder=no></iframe>\")' />");
$("#iptcomED2K").before(" <input type='button' value='强制显示资源（←__←）备用2' class='button' onclick='location.href=\"http://www.ed2kers.com/index.php/search/index?c=0&keyword="+$('#topicstitle').text()+"&p=1\"' title='"+TiT+"' />");
break;
case "yunfile.com" ://YunFile;Wait 30,No-Ad,Timeout,autodownload
case "sufile.com" : 
var Stm=new Date(),Rtm=0;
function Turl(){var Etm=new Date()-Stm,Tul=_Q('#downpage_link').href.replace(".html","/"+_Q('#vcode').value+".html");if(Etm <30e3)Rtm=30e3-Etm;_Q('#slow_button').value="请耐心等 "+Rtm+"毫秒";setTimeout(function(){Lc.href=Tul},Rtm);} //24000
 var Vco=_Q('#vcode') || _Q('#code');if (Vco) {Vco.focus();if(DxM("sufile.")){win.startTime=1e33;Keyb("#code","198",'#code',4,document.yzcode[1],_Q('#downbtn a'))}else{Keyb("#inputDownWait","198",'#vcode',4,Turl)};Vco.onkeyup=function (){if(this.value.length==4)if(DxM("sufile.")){document.yzcode[1].click();_Q('#downbtn a').click()}else{ Turl() } };return} 
var wtime=_Q('#down_interval_tag'),wsp1=_Q('#wait_span');
if (wtime) {window.setInterval(function(){if (wtime.innerHTML<=1){
win.redirectDownPage();
}}, 1200);}else if (wsp1){ win.redirectDownPage();}else{var checkT='<label style="color:red" title=自动><input type="checkbox" id="AutoDN" />启用全自动</label>';
_Q("#url_div").innerHTML=checkT+_Q("#url_div").innerHTML;
_Q("#AutoDN").onclick=function() {this.checked ? win.setCookie('AutoDN','Yes','1') : win.setCookie('AutoDN','','-1')} 
if(win.getCookie('AutoDN')){win.ck();_Q('#hidebtn').click();_Q("#AutoDN").checked=true;}
//No-Ad,Timeout-40s
win.doDownload=win.startPlaySites=win.playSite=function(){return true};
}
break;
case "qjwm.com" : //千军万马,Vcode,wait>2"
case "7958.com" : 
if(DxM("down_"))Lc.href=lurl.replace(/down_/i,'download_');
win.authad=function(){};setTimeout(function(){ $(".download_alert, #downtc img[src='http://img1.7958.com/static/disk/images/bdyzm_get_2.gif']").hide(); $("#downtc, #downtc2").show(); },500);
break;
case "rayfile.com" ://飞速,nextpag,showdown
var Ey=_Q(".btn_22>a");if(Ey){Lc.href=lurl+Ey.href.match(/\w+\/$/);
}else{
location.href="javascript:var filesize=100; showDownload();";
 };
break; 
case "it168.com" : //ReAD,Vcode,By Yulei 2012.12.17
$(".right_four_right, .right_four_left div:gt(1)").remove();
break;
case "gxp.cc" : //Gxp ,Vcode,5s,By Yulei 2012.12.18
case "nyhx.com" : 
$('#dl_tips').hide();$('#dl_addr').show();
_Q('#down_box').style.display=''; _Q('#code_box').style.display='none';
win.update_sec=false;win.down_file_link();
break;
case "yimuhe.com" : //一木禾 ,Vcode,8s,By Yulei 2012.12.26
win.checkWait=win.wait='';win.div_show('yzm','loading');
$('#code').focus().keyup(function(){var t=$(this),tV=t.val();if(tV.length==4){document.yzcode[1].click(); _Qa('#download a')[1].click();} }).attr('title',Tco);
Keyb("#yzm>form","198",'#code',4,document.yzcode[1],_Qa('#download a')[1]);
break;
case "xunzai.com" : //迅载,Logon,Integral ;
$('.normal-down').first().click();
 if ($('.title').html()==null) {win.closeForm();var ip1="http://u.dx7.xunzai.com:8",ip11="http://u.wt7.xunzai.com:8",ip2="http://117.40.196.70:8",ip3="http://u.dx3.xunzai.com:8",ip33="http://u.wt3.xunzai.com:8",Aurl=win.all_url;
var urll='<span title="'+TiTle+'"><div title="如无法连接显示，此网站问题" class="urlist telcom"><a href="'+ip1+'71/'+Aurl+'">电信下载1</a><a href="'+ip2+'51/'+Aurl+'">电信下载2</a><a href="'+ip2+'11/'+Aurl+'">电信下载3</a><a href="'+ip3+'31/'+Aurl+'">电信下载4</a></div>';
var urll1='<div class="urlist unicom"><a href="'+ip11+'72/'+Aurl+'">联通网通下载1</a><a href="'+ip2+'52/'+Aurl+'">联通网通下载2</a><a href="'+ip2+'12/'+Aurl+'">联通网通下载3</a><a href="'+ip33+'32/'+Aurl+'">联通网通下载4</a></div></span>';
  $('.urlist').html(urll+urll1);
 }
break;
case "ctdisk.com" : //城通网盘,简化输入验证码,By Yulei 2013.1.29
case "400gb.com" : 
case "bego.cc" : //必上网盘
case "pipipan.com" : 
//win.chkform='';//win.___is3b='Yu';
$('body').append('<i id="di=u1258127" />');//win.onKeydownRCcheck=false;win.onKeydownRC(_Q("#file_id").value);
Keyb("#vfcode","198",'#randcode',4,_Q('button'));
break;
case "fileim.com" : //文件即时通,30s and 300s waiting,by Yulei 2013.1.31
$('#freedown').unbind('click').bind('click',function (){ //By /bundles/global
$.get("/ajax/download/getcdowninfo.ashx", {a: $("#av").val()},function(datax) {
if (datax != -1) {datax = eval("(" + datax + ")");var _tag = datax.tag,_ix = datax.ix;
$.get("/ajax/download/getdownservers.ashx", {type:0},function(data) {
data = eval("(" + decodeURIComponent(data) + ")");var n=data[0].domain;
$.get("/ajax/download/setperdown.ashx", {ix: _ix,tag: _tag},function(t) {
var u = "http://" + n + "/download.ashx?a=";
Lc.href=u + t;
  });
 }); }else{
$.get("/ajax/download/setperdown.ashx", {ix: "888.216.35.838",tag: unescape($('#av').val()).replace(/,/g,'*')},function(t) {
Lc.href="http://69.197.155.141:6007/download.ashx?a="+t; })
} }); $('.glayer, .glayer_shadow').remove();}).attr({'class':'b1 dbtn','value':'↓免费下载','title':TiTle});
break;
case "kuaipan.cn" : //金山快盘免登录下载,Source-Code by (modules/outlink_detail.js); by Yulei 2013.02.02
setTimeout(function(){$('.download').unbind('click').attr({"title":TiTle,"style":"color:red"})},800);
break;
case "79pan.com" : //奇聚网盘,6s wait,by Yulei 2013.3.09
case "87pan.com" : //87盘,8s wait,by Yulei 2013.4.15
case "bpan.net" : //宝盘,去验证,by Yulei 2013.4.16
case "azpan.com" : //爱站盘,by Yulei 2013.4.16
case "360disk.com" : //天天网盘,去验证,by Yulei 2013.4.16
$('#down_box, #down_link').show();$('#down_box2, #code_box').hide();$("#ycform").remove();
break;
case "32666.com" : //32666网盘,去验证、屏蔽提示,by Yulei 2013.6.19
case "2kuai.com" : //爱快网盘，自跳转，去验证、屏蔽提示,by Yulei 2013.10.12
case "dxrr.com" : //堆雪人网盘,by Yulei 2013.12.19
 $('#dl_addr, #down_box').show();$('#down_box2, #incode,  #dl_tips, .dcode').hide(); document.body.oncontextmenu=true;
break;
case "supan.la" : //速盘,5s wait,NextPage,by Yulei 2013.3.14
win.update_sec=function(){};win.down_file_link();var down=_Q('.down_btn');
if(down.href.indexOf('download.php')>=0){Lc.href=down;}
break;
case "119g.com" : //119G网盘,有的免迅雷,by Yulei 2013.4.15
if(!DxM("_dx")){Lc.href=lurl.replace(/(\w+)\.html/i,"$1_dx.html");} var Da=$(".downurllist a").eq(0);
if (Da.attr("href")=="#"){Da.attr({"href":win.thunder_url,"onclick":"","title":TiT}).text("免费下载哦")}
break;

default :

 }
}

function YuL(){//高优先级
switch (dhost) {
case "colafile.com" : //自动下一页,去屏蔽,by Yulei 2013.11.05
AutoPRe(1);win.___baseNamespaceName="CproNamespace"; win.antiadsv2="0";//setTimeout(function(){win.displaydownbtn()},1500);
//setTimeout(function(){ $('#d1').attr({'href':'http://d.colafile.com/','onclick':''});$.getScript('ajax.php?action=new_down_process&file_id='+lurl.match(/\d+/)+'&antiads=0'); },500);
break;
case "dxrr.com" :
if(DxM('v.dxrr.com'))Lc.href=lurl.replace(/view-/,'down-').replace(/v./,'www.');
break;
default :
AutoPRe();
}
}
if (!window.sidebar){YuL()}else{document.addEventListener('beforescriptexecute',YuL,false);}
window.addEventListener('DOMContentLoaded',Yu,false);

 /* （兼容：Firefox18、Chromes23；支持：Opera12；电驴Verycd、YunFile、华军、华为DBank、威盘、千军万马、飞速Rayfile、音乐基地5sing、SongTaste、IT168、Gxp） 
 *百年老牌，值得信赖！专注下载百年，浩荡品牌里程。
  *主旨：简化流程、节省时间，改善体验。（化复杂的步骤为简，节约大量宝贵的时间浪费！）生存有道，放过别人也是放过自己。
   *  using unsafeWindow to break out.
  * 简单成就下载 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负 */
})();

