// ==UserScript==
// @name           Video wipe ADs
// @version        20140409
// @namespace      Shuangya
// @author         Shuangya
// @description    去除国内视频网站的广告
// @match          http://v.youku.com/v_show/id*
// @match          http://www.letv.com/ptv/vplay*
// @match          http://www.iqiyi.com/v_*
// @match          http://v.ku6.com/show/*
// @match          http://v.qq.com/cover/*
// @match          http://tv.sohu.com/20*
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @icon           http://tb.himg.baidu.com/sys/portrait/item/0b43e3f1d1c4501a
// @updateURL      http://git.oschina.net/sy/shuangya/raw/master/userjs/wipeads/user.js
// @downloadURL    http://git.oschina.net/sy/shuangya/raw/master/userjs/wipeads/user.js
// ==/UserScript==
(function(){
console.log('Video wipe ADs started!');
var sites=[
	//[名称,地址,选择方式,选择器,视屏底部,原播放器宽、高]
	['youku','http://v.youku.com/v_show','id','player',500,640,498],
	['letv','http://www.letv.com/ptv/vplay','id','fla_box',100,640,498],
	['iqiyi','http://www.iqiyi.com/v','id','flashbox',100,640,498],
	['ku6','http://v.ku6.com/show/','id','kplayer',100,640,498],
	['qq','http://v.qq.com/cover/','id','mod_player',100,640,498],
	['sohu','http://tv.sohu.com/20','id','sohuplayer',100,640,498]
]
var len=sites.length;
var url=window.location.href;
var ele=null;
var videoboxid;
var siteid;
for (i=0;i<len;i++) {
	if (url.indexOf(sites[i][1])>=0) {
		siteid=i;
		if (sites[siteid][2]=='id') {
			videoboxid=sites[siteid][3];
			ele=document.getElementById(videoboxid);
		}
		//if (sites[i][2]=='class') ele=document.getElementById(sites[i][3]);
	}
}
var hasgq=false;
var hascq=false;
ele.style.background='url(https://code.csdn.net/u014469252/shuangya/blob/master/userjs/wipeads/loading.png) no-repeat center center rgb(0,0,0)';
var yuanhtml=ele.innerHTML;
ele.innerHTML='';
GM_addStyle('.syvwa-qxdiv{position:fixed;z-index:6000;top:50%;right:0;background-color:white;border:1px solid rgb(221,221,221);padding:2px;border-radius:5px;}.syvwa-btn{display:block;border:none;background:none;font-size:15px;padding-left:5px;padding-right:5px;transition:0.15s;outline:none;border-radius:5px;}.syvwa-btn:focus{background-color:rgb(241,241,241);}');
var loadjs=document.createElement('script');
loadjs.type='text/javascript';
loadjs.src='http://www.ckplayer.com/js6.2/offlights.js';
document.getElementsByTagName('body')[0].appendChild(loadjs);
GM_xmlhttpRequest({
	method:"GET",
	url:'http://www.flvcd.com/parse.php?kw='+encodeURIComponent(url),
	onload:function(vdata){
		vdata=vdata.responseText;
		if (vdata.match(/<input type="hidden" name="inf"/i)==null) { //解析失败
			ele.innerHTML=yuanhtml;
			return false;
		}
		var burls=vdata.match(/<input type="hidden" name="inf" value="(.*?)"\/>/)[1];
		var qxdiv=document.createElement('div');
		document.getElementsByTagName('body')[0].appendChild(qxdiv);
		qxdiv.className='syvwa-qxdiv';
		qxdiv.innerHTML='';
		if (vdata.match(/粤语版<\/font>/i)!=null) {
			console.log('Video Wipe ADs Log:has more lang');
			var mlurl=vdata.match(/kw=(.*?)"(.*?)粤语版/i)[1];
			qxdiv.innerHTML+='<a class="syvwa-btn" href="'+mlurl+'">粤语版</a>';
		}
		qxdiv.innerHTML+='<input type="button" class="syvwa-btn" onclick="CKobject.getObjectById(\'syplayer\').ckplayer_newaddress(\'{f->'+burls.replace(/\|$/gi,'')+'}\');" value="标清">';
		if (vdata.match(/<b>高清版解析/i)!=null) {
			console.log('Video Wipe ADs Log:has gaoqing');
			GM_xmlhttpRequest({
				method:"GET",
				url:'http://www.flvcd.com/parse.php?format=high&kw='+encodeURIComponent(url),
				onload:function(gvdata){
					gvdata=gvdata.responseText;
					var gurls=gvdata.match(/<input type="hidden" name="inf" value="(.*?)"\/>/)[1];
					qxdiv.innerHTML+='<input type="button" class="syvwa-btn"  onclick="CKobject.getObjectById(\'syplayer\').ckplayer_newaddress(\'{f->'+gurls.replace(/\|$/gi,'')+'}\');" value="高清">';
					hasgq=true;
				}
			});
		}
		if (vdata.match(/<b>超清版解析/i)!=null) {
			console.log('Video wipe ADs Log:has chaoqing');
			GM_xmlhttpRequest({
				method:"GET",
				url:'http://www.flvcd.com/parse.php?format=super&kw='+encodeURIComponent(url),
				onload:function(cvdata){
					cvdata=cvdata.responseText;
					var curls=cvdata.match(/<input type="hidden" name="inf" value="(.*?)"\/>/)[1];
					qxdiv.innerHTML+='<input type="button" class="syvwa-btn"  onclick="CKobject.getObjectById(\'syplayer\').ckplayer_newaddress(\'{f->'+curls.replace(/\|$/gi,'')+'}\');" value="超清">';
					hascq=true;
				}
			});
		}
		GM_xmlhttpRequest({
			method:"GET",
			url:'http://git.oschina.net/sy/shuangya/raw/master/userjs/wipeads/ckplayer.js',
			onload:function(jdata){
				//ckplayer的JS
				loadjs=document.createElement('script');
				loadjs.type='text/javascript';
				loadjs.innerHTML=jdata.responseText;
				document.getElementsByTagName('body')[0].appendChild(loadjs);
				//小窗口播放
				loadjs=document.createElement('script');
				loadjs.type='text/javascript';
				loadjs.innerHTML="window.onscroll=function(){var syvwast=document.documentElement.scrollTop || document.body.scrollTop;var syvwavbox=document.getElementById('"+videoboxid+"');if(syvwast>="+sites[siteid][4]+"){syvwavbox.style.position='fixed';syvwavbox.style.width='310px';syvwavbox.style.height='175px';syvwavbox.style.bottom='50px';syvwavbox.style.right='50px';syvwavbox.style.top='auto';syvwavbox.style.left='auto';syvwavbox.style.margin='0';syvwavbox.style.zIndex='500';}else{syvwavbox.style.position='relative';syvwavbox.style.width='"+sites[siteid][5]+"px';syvwavbox.style.height='"+sites[siteid][6]+"px';syvwavbox.style.right='0';syvwavbox.style.bottom='0';}}";
				document.getElementsByTagName('body')[0].appendChild(loadjs);
				//关灯
				loadjs=document.createElement('script');
				loadjs.type='text/javascript';
				loadjs.innerHTML="function closelights(){box.Show();CKobject._K_('video').style.width='940px';CKobject._K_('video').style.height='550px';swfobject.getObjectById('ckplayer_a1').width=940;swfobject.getObjectById('ckplayer_a1').height=550;}function openlights(){box.Close();CKobject._K_('video').style.width='600px';CKobject._K_('video').style.height='400px';swfobject.getObjectById('ckplayer_a1').width=600;swfobject.getObjectById('ckplayer_a1').height=400;}";
				//加载播放器
				loadjs=document.createElement('script');
				loadjs.type='text/javascript';
				loadjs.innerHTML="var flashvars={f:'"+burls.replace(/\|$/gi,'')+"',c:0,v:100};var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always'};CKobject.embedSWF('http://www.ckplayer.com/ckplayer6.3/ckplayer.swf','"+videoboxid+"','syplayer','100%','100%',flashvars,params);";
				document.getElementsByTagName('body')[0].appendChild(loadjs);
			}
		});
	}
});
})();