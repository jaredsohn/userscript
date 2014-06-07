// ==UserScript==
// @name           Crack Url Wait Code Login
// @author         Yulei
// @namespace      http://www.525r.com
// @description    Remove from net disk and downloads to Verification code,login,wait,(Multi-in one,Easy to create downloads).
// @version        2.0208c
// @create         2012-11-21
// @run-at	document-end
// @lastmodified   2012-12-08
// @include        http://www.rayfile.com/zh-cn/files/*
// @include        http://dl.vmall.com/*
// @include        http://www.vdisk.cn/*
// @include        http://www.onlinedown.net/softdown/*
// @include        http://page1.yunfile.com/file/*
// @include        http://*.qjwm.com/*
// @include        http://??.5sing.com/*
// @include        http://www.songtaste.com/song/*
// @include        http://www.verycd.com/topics/*
// @exclude        http://www.verycd.com/topics/*/comments*
// @copyright      2012+, Yulei (http://www.525r.com/#S)
// ==/UserScript==
(function () {
	'use strict';
	var UTILS = {
		isArrayLike: function (obj) {
			if (typeof obj !== 'object') {
				return false;
			}
			var types = ['Array', 'NodeList', 'HTMLCollection'];
			for (var i = 0; i < types.length; ++i) {
				if (Object.prototype.toString.call(obj).indexOf(types[i]) !== -1) {
					return true;
				}
			}
			return false;
		},
		forEach: function (arr, callback) {
			if ((typeof arr === 'object') && UTILS.isArrayLike(arr) && UTILS.isFunction(callback)) {
				for (var i = 0; i < arr.length; ++i) {
					callback.call(arr[i], arr[i]);
				}
				return;
			}
			if((typeof arr === 'string') && UTILS.isFunction(callback)){
				arr = document.querySelectorAll(arr);
				UTILS.forEach(arr,callback);
			}
		},
		remove: function (dom) {
			if (typeof dom === 'string') {
				UTILS.remove(document.querySelectorAll(dom));
				return;
			}
			if ((typeof dom === 'object') && UTILS.isArrayLike(dom)) {
				UTILS.forEach(dom, function () {
					UTILS.remove(this);
				});
				return;
			}
			if (dom && dom.parentNode && dom.parentNode.removeChild) {
				dom.parentNode.removeChild(dom);
			}
		},
		die: function (dom,arr) {
			if (typeof dom === 'string') {
				UTILS.die(document.querySelectorAll(dom),arr);
				return;
			}
			if ((typeof dom === 'object') && UTILS.isArrayLike(dom)) {
				UTILS.forEach(dom, function () {
					UTILS.die(this,arr);
				});
				return;
			}
			var attrs = ['onclick', 'onsubmit', 'style', 'onmouseover', 'onmouseout'];
			if(arr&&UTILS.isArrayLike(arr)){
				attrs = attrs.concat(arr);
			}
			UTILS.forEach(attrs, function (a) {
				if (dom && dom[a]) {
					try {
						dom[a] = null;
					} catch (e) {}
				}
				if (dom && dom.removeAttribute) {
					dom.removeAttribute(a);
				}
			});
		},
		addCss: function (str) {
			var style = document.createElement('style');
			style.textContent = str;
			document.head.appendChild(style);
		},
		isFunction: function (func) {
			return typeof func === 'function';
		},
		proxy: function (callback) {
			var script = document.createElement('script');
			script.textContent = 'try{(' + callback.toString() + ')();}catch(e){}';
			document.body.appendChild(script);
		},

	};
	//UTILS.tips();
		
	UTILS.addCss('#foot,.fengxiang,.checkbackground,#top.deng,#my_yzm,#inputyzm,.down_verify{display:none !important}');
	UTILS.die('.title+.urlist a',['href']);
	UTILS.proxy(function(){

		var dm0=document.domain;
var dm1=dm0.slice(-8),dm2=dm0.slice(4),dm3=dm0.slice(6);
//setTimeout(function(){
 switch (window.location.hostname) {
case "dl.vmall.com" ://Huawei-Dbank,Login,Vcode,Wait 10.
$('#filelist_marker').height('0');
globallinkdata.data['profile.productid']=30;adsShow=false;//adsShow=0;
break;
case "www.vdisk.cn" ://Weipan-vdisk,code
$('#loadingbox').hide();yanzheng_ok();
break;
case "www.onlinedown.net" ://Huajun,code
CustomDefinedAjaxOnkeyup(2); //showDownlist(type,'checkok');
break;
case "www.verycd.com" ://VeryCD2-Dianlu
$("#iptcomED2K").before("<input type='button' value='强制显示隐藏资源（^__^）' class='button downall' onclick='$(\"#iptcomED2K\").html(\"<iframe class=Banner3 src=\"+location.href.replace(\"www.verycd.com\",\"www.verycd.gdajie.com\")+\" scrolling=yes width=800 height=600 frameborder=no></iframe>\")' />");
break;
case "page1.yunfile.com" ://YunFile;Wait 30,No-Ad,Timeout
var wspan=document.getElementById('wait_span');
if (wspan) {window.setInterval(function(){startWait();if (wspan.innerHTML<30){//alert('ee');
var downpage_link = document.getElementById('downpage_link');window.location=downpage_link.href;
}}, 1000);}else{
$("#site_player,#opacity_a").remove();//No-Ad,Timeout-40s
doDownload=false;//location.href="javascript:startTime='Sat Dec 08 2018 11:00:18 GMT+0800';void(0);";
}
break;
case "www.rayfile.com" ://Feisu-Rayfile,nextpag,showdown
if(typeof vkey!='undefined') {location.href=location.href+vkey;
}else{//var filesize=100; showDownload(); setKey();
location.href="javascript:var filesize=100; showDownload();";// setKey();
 };
break; //By Yulei 2012.11.30 ;Remove register and logon to tips.
case "www.songtaste.com" ://SongTaste,Source-Code by (/inc/common.js)
		var div=document.getElementById("playicon");
		var str1=div.getElementsByTagName("a")[0].href;
		var str2=str1.split("'");
		var sURL1=str2[5],type1=str2[11],head1=str2[13],songid1=str2[15];
		/* var sURL1=strtxt[2],type1=strtxt[5],head1=strtxt[6],songid1=strtxt[7];
		//alert(sURL1+'#'+type1+'#'+head1+'#'+songid1);
           */ $('#submid_gray').one("mouseover",function(){
           if(sURL1.indexOf('rayfile')>0) {
                var SongUrl = head1 + sURL1 + GetSongType(type1);
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
            //document.getElementById('custom_1').setAttribute("href",SongUrl);
            $('#custom_1').attr({
			'style' : 'font-weight:bold;font-size:15px;color:blueviolet;background-color:azure;',
			'href' : SongUrl,
			'title' : 'Cracker By Yulei'
			});
            //alert(SongUrl);
          $='No'; //location.href="javascript:$='No';alert($);";//($)='No';
});
break;
//case "huodong.duomi.com" :
default :
void(0);
} //alert("TestY");
try {if( dm1 == "qjwm.com" ) { document.getElementById('downtc').innerHTML= downurl; } // wait>2"
else if ( dm0 == "5sing.com" ) { //By Yulei 2012.11.27
if(location.href.toLowerCase().indexOf("down")>0) {
  if(window.confirm('本页的歌曲无法下载啦，要钱的哦!\n本人囊中羞涩，可还是想下载呢！！(→__⊙)')) {
var urls=location.href.replace(/down\.aspx\?sid\=/i,'');
location.href=urls+".html";
  }
 }
//var s=document.getElementsByTagName('script')[6].innerHTML;alert(s.slice(133,178));
var gemd=document.getElementsByTagName('embed')[0];//5sing,loginVip
 var gemd1=gemd.getAttribute('flashvars');
if (gemd1.length>0) {
 var gemd2=gemd1.split('=');
  var gemd3=gemd2[gemd2.length-1];
setTimeout(function(){
$("#menu-1").after("<div class='kakari pl_grab'><h4><a title=本页突然挖出歌曲来了哦!免费哦！亲，你现在愿意下载呢还是下载呢？(^__^) href=\""+gemd3+"\">免费下载！</a></h4></div>");
  }, 1300);}
}
 } catch(e) {}

	});
})();