// ==UserScript==
// @name           Lights off
// @description    关灯看视频
// @icon           http://tb.himg.baidu.com/sys/portrait/item/0b43e3f1d1c4501a
// @author         Shuangya
// @version        1.0
// @require        http://libs.baidu.com/jquery/1.9.1/jquery.min.js
// @include        *
// @updateURL      https://userscripts.org/scripts/source/292849.meta.js
// @downloadURL    https://userscripts.org/scripts/source/292849.user.js
// ==/UserScript==
(function(){
console.log('Window.top.location.href is:'+window.top.location.href);
console.log('Window.location.href is:'+window.location.href);
if (window.top.location.href!=window.location.href) return false;
var b,curtain,elem;
var specialsites=[
	//[名称,地址,JQ选择区]
	 ['Sohu','http://tv.sohu.com/','#sohuplayer']
	,['Sina','http://video.sina.com.cn/','#video_box']
	,['ku6','http://v.ku6.com/','#ku6player']
	,['ifeng','http://v.ifeng.com/','#js_video']
	,['56','http://www.56.com/','#player']
	,['youku','http://v.youku.com/','#player']
	,['tudou','http://www.tudou.com/','#playerPlaceholder']
	,['qq','http://v.qq.com/','#mod_player']
	,['Tieba_banei','http://tieba.baidu.com/shipin/bw/video/play','#player']
	,['Tieba_tienei','http://tieba.baidu.com/p/','.BDE_Flash']
	,['Tieba_tielist','http://tieba.baidu.com/f?','.media_disp']
	,['letv','http://www.letv.com/ptv/vplay','#fla_box']
	,['iqiyi','http://www.iqiyi.com/v_','#flashbox']
	,['pptv','http://v.pptv.com/show/','#pptv_playpage_box']
	,['weibo','http://weibo.com/','.WB_media_expand embed']
	,['pps','http://v.pps.tv/play','.flash-player']
	,['bilibili_loged','http://www.bilibili.tv/video/','#bofqi .player']
	,['bilibili_notloged','http://bilibili.kankanews.com/video/','#bofqi .player']
	,['qq_weibo','http://t.qq.com/','.vBox']
	,['qzone_rizhi','qzone.qq.com','#blogDetailDiv embed']
    ,['cb','http://www.cnbeta.com/articles','.content embed']
    ,['acfun','http://www.acfun.tv/v/','#ACFlashPlayer-re']
	]
var len=specialsites.length;
var url=window.location.href;
for (i=0;i<len;i++) {
	if (url.indexOf(specialsites[i][1])>=0) {
        console.log('This element is:'+specialsites[i][2]);
		$(specialsites[i][2]).css('position','relative');
		$(specialsites[i][2]).css('z-index','99999');
	}
}
$('body').append('<div id="lightsoff_btn" style="width:40px;height:22px;top:20%;left:0;z-index:60000;position:fixed;color:white;background:rgba(0,0,0,0.4);text-align:center;vertical-align:middle;font-size:9pt;cursor:pointer;border-radius:3px;transition:0.5s;line-height:22px;">关灯</div>');
$('body').append('<div id="lightsoff_bg" style="width:100%;height:100%;top:0;left:0;z-index:99998;position:fixed;color:white;background:black;text-align:center;opacity:0.9;display:none;transition:0.5s;font-size:12px;">双击开灯</div>');
$('#lightsoff_btn').click(function(){
	$('#lightsoff_bg').show();
	$('#lightsoff_btn').hide();
});
$('#lightsoff_btn').hover(function(){
	$('#lightsoff_btn').css('background','rgba(0,0,0,1)');
},function(){
	$('#lightsoff_btn').css('background','rgba(0,0,0,0.3)');
});
$('#lightsoff_bg').dblclick(function(){
	$('#lightsoff_bg').hide();
	$('#lightsoff_btn').show();
});
})();