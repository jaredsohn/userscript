// ==UserScript==
// @name           Music liker for Beauty
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Music for the beauty.Music Liker to Gospel Fine.
// @version        2.15.17l
// @create         2013-03-06
// @lastmodified   2013-04-17
// @include        http://music.baidu.com/song/*
// @include        http://www.9ku.com/play/*.htm*
// @include        http://www.djye.com/Player/*.htm
// @include        http://www.djcc.com/dj/*.html*
// @include        http://www.565656.com/music/*.htm*
// @include        http://*c.5sing.com/*.*
// @include        http://www.songtaste.com/song/*
// @include        http://www.djkk.com/dance/play/*.html
// @include        http://www.xiami.com/song/*
// @include        http://www.duole.com/
// @include        http://www.1ting.com/p_*.html
// @include        http://www.1ting.com/player/*/player_*.html
// @include        http://play.baidu.com/*
// @include        http://music.baidu.com/album/*
// @include        http://music.baidu.com/artist/*
// @include        http://www.565656.com/ting/*.htm*
// @include        http://bz.5sing.com/*.*
// @include        http://www.xiami.com/album/*
// @include        http://www.xiami.com/artist/*
// @include        http://www.xiami.com/music/hot*
// @include        http://www.hcdj.com/play/*.htm
// @copyright      2013+, Yulei
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/161719.meta.js
// @downloadURL    https://userscripts.org/scripts/source/161719.user.js
// ==/UserScript==

(function() {
function Yu(){
var dhost=location.hostname,Lc=location,lurl=Lc.href;var win = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow; var _Q=function(d) {return document.querySelector(d)},_Qa=function(d) {return document.querySelectorAll(d)};
var DM=function (m){return lurl.indexOf(m)>0;}
var Tits='[点击直接下载] - By Yulei',Tit='title="'+Tits+'" ',Sty0=' style="font-weight:bold;font-size:15px;color:gold;background-color:chocolate;"';

//下载超高品质音乐，简化下载 //By Yulei 2013.03.06
function Baidu(){ //百度音乐
if (DM('download?')){
var Bld=_Q('.login-down'),Bl=_Qa('li'),Bhr=Bl[2];
function TBurl(Urlc){
var url=Urlc.outerHTML.match(/\/\d+\\\/\d+\.mp3\?xcode=\w+/).toString();
return url.replace(/\\/,'');
}
var BTit=" title='[点击直接下载] - By Yulei'",BUrl="http://zhangmenshiting.baidu.com/data2/music";
//登录检查，修复无高品质问题
if (DM('#bai')){Lc.href=BUrl+TBurl(Bl[0])};if(Bld){Bld.style="color:yellow;background-color:gold;font-size:20px;font-weight:bold";}
if((Bld != 'javascript:;') || (win.isLogin=='true')){
win.isCloudVip=true;//collectBtn
win.$(".extra-ad-link, .vip-power").remove();
if (Bhr){
Bhr.innerHTML="<a href='#' id='SCo' "+BTit+">"+Bhr.innerHTML+"</a>";
} win.collectBtnToDone=function(){};
win.$("#SCo").click(function(){
win.$('.song-collect').removeClass("song-collect-not-vip").click();win.$("#collected_extra")[0].click();
});
if (Bl[1]){Bl[1].innerHTML="<a href='"+BUrl+TBurl(Bl[1])+"'"+BTit+">"+Bl[1].innerHTML+"</a>";
}}if (Bl[0]){Bl[0].innerHTML="<a href='"+BUrl+TBurl(Bl[0])+"'"+BTit+">"+Bl[0].innerHTML+"</a>";
}
_Q('.downpage-adbanner').style.display="none";_Q('.btn-download-span').style.display="none"; _Q('#download').style.display="none";
if (!window.opera){
_Q("#bit128").parentNode.removeChild(_Q("#bit128"));
_Q("#bit192").parentNode.removeChild(_Q("#bit192"));
//_Q("#bit320").parentNode.removeChild(_Q("#bit320"));
Bld.style.color="yellow";Bld.style.backgroundColor="gold";Bld.style.fontSize="20px";
}
}
//以下截获Baidu下载事件
if (/\/\d+$/.test(lurl)){
win.ting.media.downloadSong = function (e){ //如果登录弹出下载
var t; if(_Q('#loginbtn')){document.head.innerHTML+='<iframe name="Op"></iframe>';}
if (e) {
    var n = encodeURIComponent(window.location.pathname);
    if (/^\d+$/.test(e)) {
t = "/song/" + e + "/download?__o=" + n + "#bai"
    } else {
t = "/song/0/download?title=" + encodeURIComponent(e) + "&__o=" + n + "#bai"
    }
    window.open(t, "Op", "height=405,width=785,status=no,toolbar=no,menubar=no,location=no");
	}
}
}
if (DM('mboxCtrl.')){
win.boxCtrl.download=function (i){
var songModels = [],Lon=_Q('.login');if(Lon){Lon.innerHTML+='<iframe style="display:none" name="naga_download"></iframe>';
}
if (win._.isUndefined(i)) {
    songModels.push(this.getListCtrl().get("playlist").getCurSong())
} else {
    songModels = this.getListCtrl().get("showlist").getSongList(i)
}
var feature = "height=405,width=755,status=no,toolbar=no,menubar=no,location=no",
target = "naga_download";
if (songModels.length === 1) {
    var songId = songModels[0].songId || 0,
    qid = songModels[0].queryId || "",
    title = !songId && qid ? encodeURIComponent(qid) : "";
    var url = win.mbox.CONF.WEB_URL + "/song/" + songId + "/download?title=" + title + "&from=naga#baidu";
    window.open(url, target, feature)
} else {
    var songIds = [];
    win._.each(songModels,
    function(e) {
e.songId && songIds.push(e.songId)
    },
    this);
    window.open(win.mbox.CONF.CLOUD_URL + "/?download=" + songIds.join(",") + "&from=naga#baidu", target, "")
}
}
}

}

//免登录，列表多音乐下载 //By Yulei 2013.03.09
function Ku9(){ //九酷音乐网
_Q('.ringDown').innerHTML+=' <a href="'+win.firstplay+'" '+Tit+Sty0+'>下载 </a>';
//批量下载
function Plist(){ if (_Q('#Yum')){return};for (var i=0;i<_Qa('.check').length-1;i++){
 var Murl=_Qa('.check')[i].value.split('|')[4];
_Qa('.playListBtn')[i].innerHTML+='<span id="Yum" style="position:absolute;cursor:pointer;color:blueviolet;margin:-3px;" onclick="location.href=\'http://mp3.9ku.com'+Murl+'\'" '+Tit+'>下载<span/>';
}
}
_Q('#song_list').addEventListener('mouseover',Plist,false);
}

//下载试听音乐 //By Yulei 2013.03.09
function Hcdj(){ //DJ音乐厅
var Turl=(typeof url=="string");var ii=Turl?"39":"33";var f39=_Q('table').getElementsByTagName('font')[ii]; var MusU=Turl ? url : win.flashvars.f.replace(/Serverurl/,"");
f39.outerHTML+=' <a href="http://s5.hcdj.com:8080/uuauth/'+MusU+'" '+Tit+Sty0+'>下载 </a>';
}

//免登录，免Y币：1块钱=1Y币 //By Yulei 2013.03.09
function Djye(){ //DJ耶耶网
_Q('#play_title').innerHTML+='<a style="position:absolute;margin:70px 1px;z-index:999;color:blueviolet;" href="'+win.firstplay+'" '+Tit+'>下载 </a>'
}

// 免积分，免登录； //By Yulei 2013.03.11
function Djcc(){ //djcc舞曲网
_Q('#downclick').outerHTML='<a style="color:#8A2BE2" href=http://play.m12.djcc.com/music/'+win.playlist[0][3]+' '+Tit+'><em>下载</em></a>';
}

//免专用播放器（千千），可下两种格式 //By Yulei 2013.03.11
function M56(){ //56音乐
_Q('#playing-singername').outerHTML+='<a href="#" class="aDN" '+Tit+' onclick="location.href=listen_server_mp4+splayer.musicinfo().url"><b>下载</b></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# id="Dmp3" class="aDN"'+Tit+'>下载MP3版</a><style>.aDN{position:absolute;color:blueviolet;font-size:14px;margin:-30px;}</style>';
var _fixSongUrl = function (song) { // By scripts/splayer.js
    var apiUrl = "/plus/UrlSearch.ashx";
    $.ajax({
        type:"GET",
        async: false,
        cache:true,
        url:apiUrl,
        data:{n:song.songname, s:song.singername,num: splayer.maxErrorTime},
        dataType:"json",
            success:function(data){
                splayer.tempUrls = data;
                if(data && data.length > 0){
                    song.url = data[0];
                }else {
                    if(splayer.playingSongListCount() > 1){
                    setTimeout(function(){splayer.playNext();},100);
                }
            }
        }
    });
location.href=song.url;//return song.url;location.reload();
};
_Q('#Dmp3').onclick=function (){_fixSongUrl(win.splayer.musicinfo())};
}

//以下迁自：“Crack Url Wait Code Login”
 //By Yulei 2012.11.27
function S5(){ //原创音乐基地
if(location.href.toLowerCase().indexOf("down")>0) {
  if(window.confirm('本页的歌曲无法下载啦，要钱的哦!\n本人囊中羞涩，可还是想下载呢！！(→__⊙)')) {
var urls=lurl.replace(/down\.aspx\?sid\=/i,'');
Lc.href=urls+".html";
  }
 }
if (win.$('embed')[0]){
 var gemd1=win.$('embed')[0].getAttribute('flashvars'); //必须装有FLASH，否则可能出错
 var gemd2=gemd1.split('=');
  var gemd3=gemd2[gemd2.length-1];
 }else{var gemd3=win.wplayer.playList[0].file;}
if (gemd3.length>0) {
win.$(".func_icon3").html("<a title='本页突然挖出歌曲来了哦!免费哦！亲，你现在愿意下载呢还是下载呢？(^__^) --by Yulei' style='font-weight:bold;color:blueviolet' target=_blank href=\""+gemd3+"\"><b/>免费下载</b><img src='http://static.5sing.com/images/tj.gif' border=0 align='absmiddle'/></a>");
}
}

 //By Yulei 2012.11.30 ;Remove register and logon to tips.
function ST(){ //桑啼网
//SongTaste,Source-Code by (image.songtaste.com/inc/common.js) flashplay swfReady
		var str1=win.$('#playicon a')[0].href;
		var str2=str1.split("'");
		var sURL1=str2[5],type1=str2[11],Head1=str2[13],songid1=str2[15];
function SUrl(){
if(sURL1.indexOf('rayfile')>0) {
    var SongUrl = Head1 + sURL1 + GetSongType(type1);
    } else {
    SongUrl = win.$.ajax({
    type:'POST',
    url:'/time.php',
    cache:true,
    data: 'str=' + sURL1 + '&sid=' + songid1 + '&t=0',
    dataType:'html',
    async:false //main
    }).responseText;
  }Lc.href=SongUrl;return false;
}
    win.$('#custom_1').attr({
	'style' : 'font-weight:bold;font-size:15px;color:blueviolet;background-color:azure;',
	'title' : Tits
	}).click(SUrl);
}

 //DJ嗨嗨
function Djkk(){ //Logon,Integral,Quality,By Yulei 2013.01.08
var pl4=_Q('.play_4');
 var imgs='<img style="margin:-2px" src="/images/p_down.gif" border="0"/>',rmp3=win.list[0].m4a.replace(/mp/,'do');
   if (/img/g.test(pl4.innerHTML)) {pl4.innerHTML="<a href='"+win.list[0].m4a+"' style='color:blueviolet;' title='试听音乐下载 - Cracker By Yulei'><b>下载1</b></a> ";
 pl4.innerHTML+="<a href='"+rmp3.replace(/m4a/g,'mp3')+"' title='高品质音乐下载；注意了,可能很大哦 - Cracker By Yulei'>"+imgs+"</a>";
 pl4.style.width="82px";
_Q('.play_2').style.display = "none";
}
}
//以上转移内容结束


 //感谢'jixun66,阿呆妹妹'提供代码，合并优化修复
function Xiami(){ //虾米
win.uid=win.myUid; //登录检查
if(!uid){win.download=win.xm_download=win.promotion_download= function (ids) {
var Surl="/song/playlist/id/"+ids+"/object_name/default/object_id/0";
var xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET",Surl,false);
xmlhttp.send(null);
xmlDoc=xmlhttp.responseXML; 
var songUrl=xmlDoc.querySelector("location").textContent;
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
Lc.href=Jurl(songUrl);
  }
 }
}
// By Yulei 2013.03.30
function Duole(){ //多乐，直接下载
win.$('#player_left').append('<a id="YMs" style="font-weight:bold;font-size:11px;color:gold;background-color:chocolate;position:absolute;left:273px;top:2px;" href="#" '+Tit+'>下载</a>');win.$('#YMs').mouseover(function(){
this.href=win.duolePlayer.getCurMusic().song_file;
});
}
// By Yulei 2013.03.30
function T1(){ //一听音乐，选中下载
setTimeout(function(){win.yiting.player.play(0)},1001);
win.$('#listtabs').append('<a style="position:absolute;color:#8A2BE2" href="#" onclick="location.href=yiting.player.entity.URL || \'\'" '+Tit+'><b>下载</b></a>');
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
 } catch(e) {}
}
window.addEventListener('DOMContentLoaded',Yu,false);
})();

 /* （兼容：Firefox19、Chromes25；其它主流浏览器；支持：Opera12；） 
 *百年老牌，值得信赖！专注下载百年，浩荡品牌里程。
 *  音乐爱好者的福音，Music as beauty.
  * 音乐~音为美 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
   */

