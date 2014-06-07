// ==UserScript==
// @name           Music liker for Beauty
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Music for the beauty.Music Liker to Gospel Fine.
// @version        4.12.25w
// @create         2013-03-06
// @lastmodified   2013-12-25
// @include        http://music.baidu.com/song/*
// @include        http://www.9ku.com/play*.htm*
// @include        http://www.xiami.com/song/*
// @include        http://www.duole.com/
// @include        http://www.565656.com/music/*.htm*
// @include        http://v.yinyuetai.com/video/*
// @include        http://*c.5sing.com/*
// @include        http://www.songtaste.com/song/*
// @include        http://www.1ting.com/p_*.html
// @include        http://*kuwo.cn/*
// @include        http://douban.fm/*
// @include        http://music.weibo.com/t*
// @include        http://www.djkk.com/dance/play/*.html
// @include        http://www.djye.com/Player/*.htm
// @include        http://www.djcc.com/dj/*.html*
// @include        http://kxt.fm/?p=*
// @include        http://ear.duomi.com/?p=*
// @include        http://moe.fm/listen*
// @include        http://fm.renren.com/*
// @include        http://fm.qq.com/*
// @include        http://www.vvvdj.com/play/*.html
// @include        http://www.5nd.com/gequ/*
// @include        http://www.92cc.com/p*.html
// @include        http://www.1ting.com/player/*/player_*.html
// @include        http://www.1ting.com/album_*.html
// @include        http://play.baidu.com/*
// @include        http://music.baidu.com/a*/*
// @include        http://www.565656.com/ting/*.htm*
// @include        http://www.565656.com/plus/player*
// @include        http://bz.5sing.com/*
// @include        http://fm.5sing.com/*
// @include        http://www.xiami.com/a*/*
// @include        http://www.xiami.com/music/hot*
// @include        http://v.yinyuetai.com/playlist/*
// @include        http://site.douban.com/*/*
// @include        http://www.5nd.com/ting/*
// @include        http://www.5nd.com/z*/*
// @include        http://www.5nd.com/play*pp.html
// @include        http://www.9ku.com/mp3.asp*
// @include        http://www.92cc.com/list/*
// @include        http://www.dj77.com/mp3/dj*.html
// @include        http://www.dj77.com/dance/*
// @include        http://*.hcdj.com/play/*.htm
// @copyright      2013+, Yulei
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @grant          unsafeWindow
// @grant		GM_setClipboard
// @grant		GM_xmlhttpRequest
// @icon		http://s3.amazonaws.com/uso_ss/icon/161719/large.png
// @updateURL      https://userscripts.org/scripts/source/161719.meta.js
// @downloadURL    https://userscripts.org/scripts/source/161719.user.js
// ==/UserScript==

(function() {
var dhost=location.hostname,Lc=location,lurl=Lc.href;var win = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow; var _Q=function(d) {return document.querySelector(d)},_Qa=function(d) {return document.querySelectorAll(d)};
var DM=function (m){return lurl.toLowerCase().indexOf(m)>0;};
var Tits='[点击直接下载] - By Yulei',Tit='title="'+Tits+'" ',Tit_=Tit+' target="_blank"',Sty0=' style="font-weight:bold;font-size:15px;color:gold;background-color:chocolate;"',Sty1='font-weight:bold;color:blueviolet;',Tir='color:red',Tic={'title':Tits,'style':Tir};
function Log(l){ //调试用
console.log(l);
}
function Ypen(Uri){ //窗口打开方式
window.open(Uri,'_blank','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,directories=no,copyhistory=yes,width=414,height=255,top=110,left=150');
}
function YcE(T,S,E,P,TT){
var aa=document.createElement(T);aa.id="YDn";aa.title=Tits;if(T=="a")aa.target="_blank";
!S || aa.setAttribute('style',S);
if(TT)aa.textContent=TT;
 !P ? _Q(E).appendChild(aa) : _Q(E).parentNode.appendChild(aa);
}
function YDelay(fn,Si){ //延迟
if(!Si){setTimeout(fn,500);}else{
var TVar=window.setInterval(fn,10);}
}; //定义各大浏览器识别
var OP=function(){return window.opera},GC=function(){return window.chrome},FF=function(){return window.sidebar};
var $OP=function(){if(OP())return $=jQuery;};//O下$修复
function Yarea(){$OP();
$('<style>#Yco,#Ycb{position:fixed;border:3px solid #c5e2f2;left:10%;z-index:9999;color:green;box-shadow:5px 5px 3px Silver;}</style>').appendTo('head');
$('<textarea id="Yco" name="Yco" style="width:750px;height:380px; top:10%;border-radius:10px 10px 20px;opacity:0.85;transition:width 1s ease-out;-webkit-transition:width 1s ease-out;display:none;overflow-x:hidden;" wrap="off" readonly cols="22" rows="15" title="双击复制全部，支持Chrome、Firefox [By Yulei]\n-复制成功不提示，否则反之！" onmouseover="this.select();"></textarea>').dblclick(function(){try{GM_setClipboard(this.innerHTML)}catch(e){alert('不支持你的浏览器哦！\r-请使用[右键]或[Ctrl+C]复制')}}).appendTo('body');
$('<input value="批量☞" type="button" id="Ycb" style="bottom:2%;width:60px" title="点击显示/隐藏"/>').click(function(){$('#Yco').toggle(500)}).appendTo('body');
}
function Ybat(a){$OP();
var Y=$('#Yco');Y.append(a+'\r');Y.focus();
}

function Yu(){
//以下为音乐网站函数事件
//下载超高品质音乐，简化下载 //By Yulei 2013.03.06
function Baidu(){ //百度音乐
if (DM('download?')){
if (Lc.hash=='#bai'){var Brl=$('#128').attr('href');Lc.href=Brl == '#' ? (top.location=self.location) : Brl };var TBa='ting.baidu',Tib="inline-block";
$('a[data-btndata]').each(function(){ var Ts=$(this),id=Ts.attr('id'),ids=lurl.match(/\d+/);
Ts.find('.txt').text('下载'+id); 
Ts.css('display',Tib);if(Ts.attr("href").indexOf(TBa)<0){Ts.css('color','yellow').attr('title',Tits).one("mouseover",function(){
$.ajax({url:"/data/music/song?song_id="+ids+"&rate="+id+"&.r="+Math.random() + new Date * 1,
type:"get",dataType:"json",success: function(e){
if (e)Ts.attr('href',e.data.songList[0].songLink); } });
}).unbind("click")};
});YDelay(function(){win.$('.btn').off('click')});if($("#bit1000").length==0)$("#1000").hide(); $('.downpage-adbanner').remove();
}
//以下截获Baidu下载事件
if (DM('play.baidu')){
win.boxCtrl.download=function (i){
var songModels = [];
songModels = this.getListCtrl().get("showlist").getSongList(i);
Lc.href=songModels[0].links.auto_0.songLink;
 }
}else{
win.ting.media.downloadSong = win.ting.clientsDownload.download = function (e){
if(_Q('#loginbtn')){document.head.innerHTML+='<iframe name="Op"></iframe>';}
var t="/song/"+e+"/download?__o="+location.pathname+"#bai";window.open(t, "Op");
 }
}

}

//免登录，列表多音乐下载 //By Yulei 2013.03.09
function Ku9(){ //九酷音乐网
if (DM('/mp')){$('.dlMainUrl a').eq(0).attr({"href":"http://mp3.9ku.com"+win.url,"title":Tits}).text("免费下载");
}else{setTimeout(function(){_Q('.dongDown').outerHTML='<a class="dongDown" style="font-weight:bold;color:#8A2BE2" href="'+win.firstplay+'" '+Tit_+'>下载</a>';},2000);
//批量下载
function Plist(){ if (_Q('#Yum')){return};for (var i=0;i<_Qa('.check').length-1;i++){
 var Murl=_Qa('.check')[i].value.split('|')[4];
_Qa('.playListBtn')[i].outerHTML+='<a id="Yum" style="position:absolute;cursor:pointer;color:blueviolet;margin:-3px;" href="http://mp3.9ku.com'+Murl+'" '+Tit_+'>下载</a>'; 
}
}
_Q('#song_list').addEventListener('mouseover',Plist,false);
}}

//下载试听音乐 //By Yulei 2013.03.09
function Hcdj(){ //DJ音乐厅，4.18修复多处由于网站升级
var MusU=win.flashvars.f.replace(/Serverurl/,"");
var Mun=_Q('td[height="48"] font')||_Q('td[height="50"] font');Mun.outerHTML+=' <a href="http://s5.hcdj.com:8080/uuauth/'+MusU+'" '+Tit_+Sty0+'>下载 </a>';
}

//免登录，单页 //By Yulei 2013.03.09
function Djye(){ //DJ耶耶网
_Q('#play_title').innerHTML+='<a style="position:absolute;margin:70px 1px;z-index:999;color:blueviolet;" href="'+win.firstplay+'" '+Tit_+'>下载 </a>';
}

// 免积分，免登录；单页 //By Yulei 2013.03.11
function Djcc(){ //djcc舞曲网
var Dur="http://play.m12.djcc.com/music/"; win.$(".yuanchuang_btn>a, #downclick").attr({"href":Dur+win.playlist[0][3],"title":Tits}).unbind("click");
win.wrfJw.DjUi.down = function(t){ Ypen(Dur+$(t).parents("li").attr("file"))
} }

//免专用播放器（千千），可下两种格式 //By Yulei 2013.03.11
function M56(){ //56音乐
_Qa('.play-info-otheropt a:last-child')[0].outerHTML='<a href=# id="Dm4a" style="color:gold"'+Tit_+'>下载</a> <a href=# id="Dmp3" '+Tit+'>下载MP3版</a>';
var _fixSongUrl = function (song) {
var apiUrl="/plus/UrlSearch.ashx";
$.ajax({type:"GET",async:false,cache:true,url:apiUrl,
data:{n:song.songname, s:song.singername,num: 5},dataType:"json",success:function(data){
if(data.length<1){alert('抱歉！暂时没有这首歌！\r  --By Yulei')}else{
Ypen(data[1]||data[0]);}
 } });
}
_Q('#Dmp3').onclick=function (){_fixSongUrl(win.splayer.musicinfo());return false;};
_Q('#Dm4a').onmouseover=function (){this.href=win.listen_server_mp4+win.splayer.musicinfo().url};
}

//以下迁自：“Crack Url Wait Code Login”
 //By Yulei 2012.11.27
function S5(){ //原创音乐基地
if(DM('down')) {
  if(window.confirm('本页的歌曲无法下载啦，要钱的哦!\n本人囊中羞涩，可还是想下载呢！！(→__⊙)')) {
var urls=lurl.replace(/down\.aspx\?sid\=/i,'');
Lc.href=urls+".html";
  }
 }
if(DM('fm')) {var $=jQuery;
$('#play_next').after('<a href=# id="Y5s" '+Tit_+' style="background:url(\'http://static.5sing.com/images/v2012/pbg2013.png\') -19px -187px no-repeat transparent;width:19px;height:19px;position:absolute;top:13px;left:98px"/>');
var ii=1;if (_Q('#Y5s'))ii=0;
$('.jp-download, #Y5s').mouseover(function(){var Yao=win.$wsp.htmlMediaElement.src;var Surl=Yao;if(!Yao)Surl=$('embed').eq(ii).attr('flashvars').split('file=')[1];$(this).attr({"title":Tits,"href":Surl ,"onclick":""})});
YDelay(function(){ //FF下又要延迟
$('.download').mouseover(function(){$(this).attr({"title":Tits,"href":$(this).next().find('span').attr('mp3')})});
});
if(win._list){Yarea();win._list.forEach(function(e){Ybat(e.mp3)})};//批量输出
}
 win.$(".func_icon3").html("<a "+Tit_+"style="+Sty1+" href=\""+win.wplayer.playList[0].file+"\"><b/>免费下载</b><img src='http://static.5sing.com/images/tj.gif' border=0 align='absmiddle'/></a>");
}

 //By Yulei 2012.11.30 ;Remove register and logon to tips.
function ST(){ //桑啼网
		var str1= $('#playicon a')[0].href;
		var str2=str1.split("'");
		var sURL1=str2[5],type1=str2[11],Head1=str2[13],songid1=str2[15];
function SUrl(){
if(sURL1.indexOf('rayfile')>0) {
    var SongUrl = Head1 + sURL1 + GetSongType(type1);
    } else {
    SongUrl =  $.ajax({
    type:'POST',
    url:'/time.php',
    cache:true,
    data: 'str=' + sURL1 + '&sid=' + songid1 + '&t=0',
    dataType:'html',
    async:false 
    }).responseText;
  };Ypen(SongUrl);return false;
}
   $('#custom_1').attr({
	'style' : Sty1+'font-size:15px;background-color:azure;',
	'title' : Tits
	}).click(SUrl);
}

 //DJ嗨嗨
function Djkk(){ //Logon,Integral,Quality,By Yulei 2013.01.08
var pl4=_Q('.p_name');
 var imgs='<img style="margin:-2px" src="/images/p_down.gif" border="0"/>',rmp3=win.list[0].m4a.replace(/mx/,'do').replace(/mix/,'mp3');
pl4.innerHTML="<a href='"+win.list[0].m4a+"' style='color:blueviolet;margin:0px -14px -10px' target='_blank' title='试听音乐下载 - Cracker By Yulei'><b>下载1</b></a> "; 
 pl4.innerHTML+="<a href='"+rmp3.replace(/m4a/g,'mp3')+"' target='_blank' title='高品质音乐下载；注意了,可能很大哦 - Cracker By Yulei'>"+imgs+"</a>";
} 
//以上转移内容结束


 //感谢'jixun66,阿呆妹妹'提供代码
function Xiami(){ //虾米
win.uid=win.myUid; //登录检查，不影响会员
if(!win.uid){win.download=win.xm_download=win.promotion_download =win.player_download= function (ids) {
ids=ids.songId || ids;
var Surl="/song/playlist/id/"+ids+"/object_name/default/object_id/0";
$.ajax({url:Surl,type:"get",dataType:"xml",async:false,cache:true,success:function(X){
var songUrl=$(X).find('location').text();Lc.href=Jurl(songUrl);
} });
function Jurl(Loc) {
var num = Number (Loc.charAt(0)),
    inp = Loc.substr (1),
    iLe = inp.length % num,
    a=0, ret='', arr=[];
for (var i=0; i<num; i++) { arr [i] = (iLe>i?1:0) + (inp.length-iLe)/num; }
for (var i=0; i<arr[1]; i++) { a=0; for (var j=0; j<num; j++) {
    ret += inp.charAt (a+i); a += arr[j];}
    }
return unescape(ret.substr (0, inp.length)).replace(/\^/g, '0').replace(/\+/g, ' ').replace(/.mp$/,'.mp3');
}
}
}
}
// By Yulei 2013.03.30
function Duole(){ //多乐，直接下载
 $('#player_left').append('<a id="YMs" style="font-weight:bold;font-size:11px;color:gold;background-color:chocolate;position:absolute;left:273px;top:2px;" '+Tit_+'>下载</a>'); $('#YMs').mouseover(function(){
this.href=win.duolePlayer.getCurMusic().song_file;
});
}
// By Yulei 2013.03.30
function T1(){ //一听音乐
setTimeout(function(){win.yiting.player.play()},1001);
$('#playlist').bind('DOMAttrModified DOMSubtreeModified',function(){
$('#playlist .action').each(function(i){
if($(this).find('.movedown').length<1){var Turl="http://nonie.1ting.com:9092"+win.yiting.player.items[i][7];
$(this).append('<a class="movedown" '+Tit_+' href="'+Turl+'"></a>');Ybat(Turl);
};
});
});Yarea();
win.$YV.down=function(){ var Yt=win.yiting.player,Ye=Yt.entity|| Yt.options;
Ypen(Ye.URL||Ye.Source||Ye.src || Ye.url);return false;}
}
// 参考源：plinfo.js,loader.js。By Yulei 2013.05.07
function YYTi(){ //音悦台，免登录、积分、客户端
if(!OP()){ var tbk='target="_blank"';$('p.f14,span.f14').after('<span class="v_button" id="Ytai" '+Tit+'><span style="background-color:#B82C3D;height:18px;" class="ico download_ico ico20_pl_down"><a id="p1" '+tbk+'>标清</a><a id="p2" '+tbk+'>高清</a><a id="p3" '+tbk+'>超清</a></span></span><style>#Ytai a{margin:3px;font-weight:bold;}#Ytai{position:absolute;left:39%}</style>');
 $('#Ytai').mouseenter(function(){Yyt($('.videoinfobox').attr('videoid') || $('.play a').eq(0).attr('href').match(/\d+/)[0])});
function Yyt(Vid){GM_xmlhttpRequest({
url: 'http://www.yinyuetai.com/api/info/get-video-urls?videoId='+Vid,
method: "get",
onload: function(y) {var r=$.parseJSON(y.responseText);
    r.hcVideoUrl ? $('#p1').attr('href',r.hcVideoUrl).show() : $('#p1').hide();
    r.hdVideoUrl ? $('#p2').attr('href',r.hdVideoUrl).show() : $('#p2').hide();
    r.heVideoUrl ? $('#p3').attr('href',r.heVideoUrl).show() : $('#p3').hide();
  }
})}
}
if (DM('/playlist/')) {
$('.J_pop_download').attr(Tic).mouseover(function(){$(this).attr('href',Mls[$('.playing').attr('data-index')].videoUrl).removeClass('J_pop_download')});
_Q('.pl_total').outerHTML+='<a class="v_button" target="_blank" '+Tit_+' id="YTa" style="display:none;position:absolute;top:16px;left:0px; color:green"><span class="ico20_pl_down">下载</span></a>';
Yarea();var MvLi=_Qa('.mvbox_list .J_play'),Mls=$.parseJSON($('#pl_w>script').html().match(/mvContents : (.*)/)[1]);
Mls.forEach(function(e){Ybat(e.videoUrl)});
for (var i=0;MvLi.length>i;i++){
MvLi[i].onmouseover=function(M){
var Od=_Q('#YTa'); Od.style.display="inline-block";Od.style.left=M.clientX-130+"px";
Od.href=Mls[this.getAttribute('data-index')].videoUrl;
  } 
 };
}else{
$('.J_download').attr(Tic).one('mouseover',function(){var t=$(this);$.get('/wap'+Lc.pathname,function(d){t.attr('href',$(d).find('.J_play').attr('href')) })});

 }
}
// 感谢S某提供接口。直接下载MP3格式；By Yulei 2013.05.14
function KW(){//酷我，免客户端
document.domain = "kuwo.cn";
win.showDownMusic=win.webdownSong=win.downCurrSong=function (rid){
var url="http://antiserver.kuwo.cn/anti.s?format=mp3&response=url&type=convert_url&rid="+(rid||win.WebPlayer.curMusic.rid),y=_Q('#y');
if(!y){var r=document.createElement("iframe");
r.style.display="none";
r.src=url;r.id="y";
document.body.appendChild(r);
}else{_Q('#y').src=url}; if(GC()){return};win.showPopInf && win.showPopInf('warn','请稍等.. by Yulei');
setTimeout(function(){_Q('#y').src=_Q('#y').contentDocument.body.innerHTML;},555);
 }
if(GC()){DM('server.') && prompt('伟大的Chrome,你为什么要自带在线播放呢？',document.body.innerHTML);}
}
// 显示下载；By Yulei 2013.05.14
function Kxt(){//邻居的耳朵
var Ply=_Q("#audioplayer_1");var SC=document.scripts;
Ply.outerHTML+='<a '+Tit_+' id="Ydn"><img src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/m_thumb.gif">下载</a><style>#Ydn{top:-10px;position:relative;padding:6px;color:red;}#Ydn img{border:0;top:13px;position:relative;}</style><input id="Yfo" onfocus="this.type=\'hidden\'">';
_Q("#Ydn").onmouseover=function(){
var StrF=SC[SC.length-2].innerHTML;
var rl=StrF.split('"')[9];
if(rl.slice(-1)=="A"){rl=rl.slice(0,-1)}
var Url=atob(rl);
this.href=Url;
return false;
};
_Q("#Yfo").focus();
}

// 显示下载；感谢S某；By Yulei 2013.05.21
function DouB(){//豆瓣，为了兼容多处理有延迟，刷新解决
if(DM('site.douban.com')){
$root = $("div.playlist>table");Yarea();
window.addEventListener('load',function(){$root.each(function (i,p) {
var PId=p.className.match(/\d+/)[0],el = $(this);
var song=win.PlaylistWidget.find(PId).songs;
el.find("td.download").each(function(ii) {$(this).addClass('clickable').html('<a class="icon-playlist-download" style="width:10px;background-position:-24px -32px" title="'+song[ii].name+' | '+Tits+'" href="'+song[ii].rawUrl+'"> </a>');Ybat(song[ii].rawUrl);
});
 });
});
}else{
$('#fm-player').append('<a id="YDn" target="_blank" >↓下载</a><style>#YDn{float:right;position:relative;top:-98px;right:8px;background:#9DD6C0;display:block;heiht:38px;width:36px;font-family:Tahoma;color:#fff} #YDn:hover{margin:1px 2px 0 0;}</style>');
YDelay(function(){try {var AextS=win.extStatusHandler;
win.extStatusHandler=function(p){p=$.parseJSON(p);var m=p.type;var n=p.song;
if (m=="start") {$('#YDn').attr({'href':n.url,'title':n.title+' | '+Tits})}
return AextS(p);
}; }catch(e){}},1);
}
}
// 显示下载、以歌曲名保存；感谢S某；By Yulei 2013.05.21
function MuWb(){ //新浪微音乐
if (DM('/ting')){ function Smu(){ if (_Q('.YDn'))return;
$('#songlist_view').find('.playList').each(function(index, playlist) {
	var $pl = $(playlist); $pl.find('.listIcon').append('<a class="YDn" href="javascript:;" '+Tit+' style="background: url(\'http://image2.sina.com.cn/music/web/weibo2012/ver20130226/iconElement20130312.png\') -121px -167px; no-repeat transparent;display: inline-block;width:20px;height:21px;"></a>');
});	$('.YDn').each(function(i,e){var Pat=$(this).parent().parent();
$(e).click(function(){
$.get('/yueku/port/getmp3url.php', {
		'songid': Pat.attr('songid'),
	}, function(d) {
		Lc.href=d.replace('format=','fn='+encodeURIComponent(Pat.find('span>a').text()));
	});return false;});}) };
_Q('#songlist_view').addEventListener("DOMAttrModified",Smu,false);
_Q('#songlist_view').addEventListener("DOMSubtreeModified",Smu,false);
Yarea();
$('#Ycb').one("mouseover",function(){$('#songlist_view .playList').each(function(i,p) {
	var p=$(p);$.get('/yueku/port/getmp3url.php?is_32=1&songid='+p.attr('songid'), function(y) {
	Ybat(y+'&fn='+encodeURIComponent(p.find('.songName a').text()));
	});
})} );
}else{
var YDn=$('dt .btn_operating');
if($('#a_download').length =='0'){
YDn.attr('class','').html('').append('<a class="btn_operating" href="#" id="a_download" '+Tit+'><span class="ico_download pointer"></span><span class="txt pointer">下载</span></a>').click(function(){
$.get('/yueku/port/getmp3url.php', {'songid': +win.songInfo.ID},
function(url) {Lc.href=url.replace('format=','fn='+$('.path li').last().text());});return false;
});
 }}
}

// 显示下载；感谢S某；By Yulei 2013.05.29
function FMmoe(){ //萌否电台，去登录提示
win.stopGuest=function(){};var pUI=win.playerInitUI;
$('.button-volume').after('<a id="YDn" target="_blank">↓下载</a>');
win.playerInitUI=function(clip){
$('#YDn').attr({'href':clip.url,'title':clip.title+Tits,'style':'position:relative;top:15px;font-family:Tahoma;'+Sty1});return pUI(clip)
 };
}

// 显示下载；感谢S某；By Yulei 2013.05.29
function FMrr(){ //人人电台
if(window.opera){ _Q('#init').outerHTML+="<style>.spread{width:50%;padding-right:276px;}</style>";
} //修复CSS
var SS='background:url("http://a.xnimg.cn/xnapp/music/images/webradio/sprite3.png") no-repeat -206px -1268px transparent;height:40px;width:41px;';
YcE('a',SS,'#vol',' ');
if(!GC()){YDelay(function(){
win.XN.APP.WebRadioNotlogin.player.Py=win.XN.APP.WebRadioNotlogin.player.play;
win.XN.APP.WebRadioNotlogin.player.play=function(url, _105){
_Q('#YDn').href=url;
return win.XN.APP.WebRadioNotlogin.player.Py(url, _105);
 }});
}else{_Q('#album_name').addEventListener("DOMSubtreeModified", function(){
_Q('#YDn').href=_Q('audio').src;
 });}
}

// 显示下载；感谢S某；By Yulei 2013.05.29
function FMqq(){ //QQ音乐电台
var SS='background:url("http://imgcache.qq.com/mediastyle/musicprotal/img/player_bg.png") no-repeat -32px -144px transparent;height:15px;width:16px;margin:14px 0px;';
YcE('a',SS,'#showlrc_btn',' ');
setTimeout(function(){if(!_Q('audio')){
 win.$.qPlayer.player.Qpr=win.$.qPlayer.player.playUrl;win.$.qPlayer.player.playUrl=function(songurl){_Q('#YDn').href=songurl;return win.$.qPlayer.player.Qpr(songurl);}
}else{_Q('#YDn').onmouseover=function(){this.href=_Q('audio').src;}} },500);
}
// 下载试听或直链；By Yulei 2013.05.30
function Vvvdj(){ //清风DJ
var Djt=$('.vvvdjtime');if(Djt.last().text()=="免费下载"){ var Sid=Djt.eq(1).text().replace('舞曲编号:',''),linv=_Q('#linkvvvdj a');linv.title+=' | '+Tits;
$.ajax({type:'get',cache:true,mimeType: "text/html;charset=gbk",
url:'/download.asp?id='+Djt.eq(1).text().replace('舞曲编号:',''),success:function(data){
$('#linkvvvdj a').first().attr('href',$(data).find('.red').attr('href')).css('color','#8A2BE2')}});
};
win.download=function(id){
Ypen("http://hp.vvvdj.com/face/"+win.danceFilePath+".mp4");
}
}
// 下载试听或直链；By Yulei 2013.06.05
function nd5(){ //5nd音乐
if ( DM('/ting') ){
var soA=_Q('.songOtherDown>a');soA.href=win.url;soA.title+=' | '+Tits;soA.style.color='#8A2BE2';
}else{ function Ynd(){var Sul=_Qa('#song_list>ul');for (var i=0;i<Sul.length;i++){
if (Sul[i].querySelector('#Yum'))return;
Sul[i].querySelector('.c').innerHTML+='<a id="Yum" onmouseover="this.href=\'http://tingge.5nd.com/20060919/\'+parentNode.parentNode.querySelector(\'#id\').value.split(\'|\')[4]" '+Tit_+'></a>';
  } }
_Q('#song_list').addEventListener("DOMAttrModified",Ynd);
if (GC()){_Q('#song_list').addEventListener("DOMSubtreeModified",Ynd);
setTimeout(function(){win.musicChangeAndPlay(0,0);},500);}
_Q('title').outerHTML+="<style>#Yum{position:absolute;color:blueviolet;margin:8px 0px;width:13px;height:13px;background:url(/skin/blue/playBlue.png) no-repeat -300px -56px transparent;}</style>";
 }
}
// 下载试听或直链；By Yulei 2013.12.19
function cc92(){ //DJ轮回舞曲网 & DJ77舞曲网，支持试听和列表页面
var mDL="http://92mp4.db-cache.com/dance/";
win.dancePlayer.openDown=function(did, uid){
win.$.getJSON(win._config['domainApi']+"dance?a=dancePlayerInfo&callback=?", {did: escape(did),keyHash:'',type:0},function(data) {
Ypen(mDL+(data.file_path||data.mp4_file_path))})
}
YDelay(function(){$('#downClick, #isDown .download').attr({"href":mDL+win.danceFilePath+'.mp4',"title":Tits,"style":Tir,"onclick":""}) },800);
if(_Q('#mList')){ $('head').append('<style>.mdn{ background: url("http://staticdj77.db-cache.com/site/images/label.png") -20px -22px no-repeat transparent;display: block;height:17px;width:17px;position:relative;top:-5px;left:9px;</style>');

$('.player>h1').html($('.wmaPlayer a').attr(Tic));
//批量
function Mli(){if (_Q('.mdn'))return;
win.$.getJSON(win._config['domainApi']+"dance?a=playerDanceName&callback=?","didStr="+(win.$.cookie("playerList3") || win.$.cookie("dj77playerList3")),function(data) {
$('#mList input').each(function(i,e){$(e).parents('li').find('.action').append('<a class="mdn" href="'+mDL+data[$(e).val()].file_path+'" '+Tit_+'/>'); })
 }) };Mli();
$('#mList').bind('mouseenter',Mli);
 }
}


try {if(DM("baidu.com")) { Baidu() } //百度音乐
 else if ( DM("9ku.com") ) { Ku9() } //九酷音乐
  else if ( DM("hcdj.com") ) { Hcdj() } //DJ音乐厅
   else if ( DM("djye.com") ) { Djye() } //DJ耶耶网
    else if ( DM("djcc.com") ) { Djcc() } //djcc舞曲网
     else if ( DM("565656.com") ) { M56() } //56音乐
      else if ( DM("5sing.com") ) { S5() } //原创音乐基地
       else if ( DM("songtaste.com") ) { ST() } //桑啼网
        else if ( DM("djkk.com") ) { Djkk() } //DJ嗨嗨
         else if ( DM("xiami.com") ) { Xiami() } //虾米
          else if ( DM("duole.com") ) { Duole() } //多乐
           else if ( DM("1ting.com") ) { T1() } //一听音乐
          else if ( DM("yinyuetai.com") ) { YYTi() } //音悦台
         else if ( DM("kuwo.cn") ) { KW() } //酷我
        else if ( DM("kxt.fm") || DM("ear.duomi.com") ) { Kxt() } //邻居的耳朵
       else if ( DM("douban.") ) { DouB() } //豆瓣
      else if ( DM("music.weibo.com") ) { MuWb() } //新浪微音乐
     else if ( DM("moe.fm") ) { FMmoe() } //萌否电台
    else if ( DM("fm.renren.com") ) { FMrr() } //人人电台
   else if ( DM("fm.qq.com") ) { FMqq() } //QQ音乐电台
  else if ( DM("vvvdj.com") ) { Vvvdj() } //清风DJ
 else if ( DM("5nd.com") ) { nd5() } //5nd音乐
  else if ( DM("92cc.com") || DM("dj77.com") ) { cc92() } //DJ舞曲网
 } catch(e) {}
}
if(!window.sidebar){window.addEventListener('DOMContentLoaded',Yu,false)}else{Yu()};
//以下全局兼容修复
if ( DM("fm.renren.com") ) { if(window.opera){navigator.userAgent='Gecko';} }; //修复识别加载flash

})();

 /* （兼容：Firefox18、Chromes23；其它主流浏览器；支持：Opera12；） 
*百年老牌，值得信赖！专注下载百年，浩荡品牌里程。
 *主旨：简化流程、节省时间，改善体验。（化复杂的步骤为简，节约大量宝贵的时间浪费！）生存有道，放过别人也是放过自己。
 *声明：如果本JS有损您利益或侵权，请电邮本人，确认后24小时内下线。
  *  音乐爱好者的福音，Music as beauty.
   * 音乐~音为美 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
    */

