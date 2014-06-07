// ==UserScript==
// @name           Crack Url Wait Code Login
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Remove from net disk and downloads to Verification code,login,wait,(Multi-in one,Easy to create downloads).
// @version        2.1211c
// @create         2012-11-21
// @lastmodified   2012-12-11
// @include        http://www.rayfile.com/zh-cn/files/*
// @include        http://dl.vmall.com/*
// @include        http://www.vdisk.cn/*
// @include        http://www.onlinedown.net/softdown/*
// @include        http://*.yunfile.com/file/*
// @include        http://*.qjwm.com/*
// @include        http://??.5sing.com/*
// @include        http://www.songtaste.com/song/*
// @include        http://www.verycd.com/topics/*
// @exclude        http://www.verycd.com/topics/*/comments*
// @copyright      2012+, Yulei
// @require       http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

(function() {
//if (/Chrome/g.test(navigator.userAgent)) {
!window.jQuery && (function() {if (window.chrome) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
		document.head.appendChild(script);
}
})();
window.addEventListener(
    "DOMContentLoaded",
    function() {
//setTimeout(function(){
var dhost=location.hostname.replace(/\w+\./,'');
//var dhost=window.location.hostname.match(/\w+\.\w+$/);
 switch (dhost) {
case "vmall.com" ://Huawei-Dbank,Login,Vcode,Wait 10.
$('#filelist_marker').height('0');
globallinkdata.data['profile.productid']=30;adsShow=false;//adsShow=0;
break;
case "vdisk.cn" ://Weipan-vdisk,wait 10s,code
$('#loadingbox').hide();yanzheng_ok();
break;
case "onlinedown.net" ://Huajun,code
CustomDefinedAjaxOnkeyup(2); //1;showDownlist(type,'checkok');
break;
//case "www.verycd.com" ://VeryCD1,Show hide file.
//location.href=location.href.replace('www.verycd.com','verycdfetch.duapp.com');
//break;
case "verycd.com" ://VeryCD2-Dianlu
//location.href=location.href.replace('www.verycd.com','www.verycd.gdajie.com');
//$('#iptcomED2K').one("mouseover",function(){//mouseout 
//if(window.confirm('本页发现隐藏版权资源啦!是否立即显示?（^__^）'))location.href=location.href.replace('www.verycd.com','www.verycd.gdajie.com');
//});
$("#iptcomED2K").before("<input type='button' value='强制显示隐藏资源（^__^）' class='button downall' onclick='$(\"#iptcomED2K\").html(\"<iframe class=Banner3 src=\"+location.href.replace(\"www.verycd.com\",\"www.verycd.gdajie.com\")+\" scrolling=yes width=800 height=600 frameborder=no></iframe>\")' />");
break;
case "yunfile.com" ://YunFile;Wait 30,No-Ad,Timeout
var wspan=document.getElementById('wait_span');
if (wspan) {window.setInterval(function(){startWait();if (wspan.innerHTML<30){//alert('ee');
var downpage_link = document.getElementById('downpage_link');window.location=downpage_link.href;
}}, 1200);}else{
$("#site_player,#opacity_a").remove();//No-Ad,Timeout-40s
doDownload=false;//location.href="javascript:startTime='Sat Dec 08 2018 11:00:18 GMT+0800';void(0);";
}
break;
case "qjwm.com" : //Qianjunwanma,Vcode,wait>2"
document.getElementById('downtc').innerHTML=downurl;
break;
case "rayfile.com" ://Feisu-Rayfile,nextpag,showdown
//showDownload(); //document.getElementsByTagName('a')[35].href; location.href+vkey
//location.href=$('main1').getElementsByTagName('a')[0]; //.getAttribute("href"); downloads_url
if(typeof vkey!='undefined') {location.href=location.href+vkey;
}else{//var filesize=100; showDownload(); setKey();
location.href="javascript:var filesize=100; showDownload();";// setKey();
 };
break; //By Yulei 2012.11.30 ;Remove register and logon to tips.
case "songtaste.com" ://SongTaste,Source-Code by (inc/common.js)
		var div=document.getElementById("playicon");
		var str1=div.getElementsByTagName("a")[0].href;
		var str2=str1.split("'");//alert(str1);alert(str2);
		var sURL1=str2[5],type1=str2[11],Head1=str2[13];
		/* var sURL1=strtxt[2],type1=strtxt[5],Head1=strtxt[6],songid1=strtxt[7];
		//alert(sURL1+'#'+type1+'#'+Head1+'#'+songid1);
           */ $('#submid_gray').one("mouseover",function(){
           if(sURL1.indexOf('rayfile')>0) {
                var SongUrl = Head1 + sURL1 + GetSongType(type1);
                //alert(sURL1+'pp');alert(SongUrl+'pp1');//document.getElementById('custom_1').setAttribute("href",SongUrl);
            } else {
                SongUrl = $.ajax({
                    type:'POST',
                    url:'/time.php',
                    cache:false,
                    async:false,
                    data:'str='+sURL1,
                    dataType:'html',
                }).responseText;
            }
            //document.getElementById('custom_1').style.cssText='font-weight:bold;font-size:15px';
            $('#custom_1').attr({
			'style' : 'font-weight:bold;font-size:15px;color:blueviolet;background-color:azure;',
			'href' : SongUrl,
			'title' : 'Cracker By Yulei'
			});
          $='No'; //location.href="javascript:$='No';alert($);";//($)='No';
});
break;
//case "huodong.duomi.com" :
case "5sing.com" : //By Yulei 2012.11.27
if(location.href.toLowerCase().indexOf("down")>0) {
  if(window.confirm('本页的歌曲无法下载啦，要钱的哦!\n本人囊中羞涩，可还是想下载呢！！(→__⊙)')) {
var urls=location.href.replace(/down\.aspx\?sid\=/i,'');
location.href=urls+".html";
  }
 }
//var s=document.getElementsByTagName('script')[6].innerHTML;alert(s.slice(133,178));
//var s=document.getElementsByTagName('script')[6].innerHTML;var reg=/http:\/\/([^.]*?)\.5sing\.com\/([^.]*?)\.mp3/;var sy=s.replace(reg,'http://$1.5sing.com/$2.mp3');alert(sy);
var gemd=document.getElementsByTagName('embed')[0];//5sing,loginVip
 var gemd1=gemd.getAttribute('flashvars');
if (gemd1.length>0) {
 var gemd2=gemd1.split('=');
  var gemd3=gemd2[gemd2.length-1]; //var gemd3=gemd1.slice(gemd1.lastIndexOf("=")+1);
//if(window.confirm('本页突然挖出歌曲来了哦!免费哦！！\n亲，你现在愿意下载呢还是下载呢？？(^__^)'))window.open(gemd3); //alert(gemd3);
setTimeout(function(){
$("#menu-1").after("<div class='kakari pl_grab'><h4><a title=本页突然挖出歌曲来了哦!免费哦！亲，你现在愿意下载呢还是下载呢？(^__^)  target=_blank href=\""+gemd3+"\">免费下载！</a></h4></div>");
  }, 1000);}
break;
//case "qjwm.com" : 
//break;
default :
void(0);//return;
} //alert("TestY");
//var dm0=document.domain;
//var dm1=dm0.slice(-8),dm2=dm0.slice(4);
//}, 2000);
    }, false
);
/* if(window.opera){
window.opera.addEventListener(
    "BeforeExternalScript",
    function (e) {
        if( e.element.getAttribute("src").match(/fancybox\/jquery\.fancybox.*\.js$/) ) {
            alert(e);e.preventDefault();
        }
    }, false
);}
*/
 /* （兼容：Firefox18、Chromes23；支持：Opera12；电驴Verycd、YunFile、华军、华为DBank、威盘、千军万马、飞速Rayfile、音乐基地5sing、SongTaste） 
  * 简单成就下载 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、它用，后果自负 */
})();

