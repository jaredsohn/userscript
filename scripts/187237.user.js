// ==UserScript==
// @name           Video Downloader
// @description    PS：这个东西只是跳转到硕鼠下载，我与硕鼠没有任何关系
// @include        http://v.youku.com/v_show/*
// @include        http://www.youku.com/playlist_show/*
// @include        http://www.youku.com/show_page/*
// @include        http://www.tudou.com/programs/view/*
// @include        http://www.tudou.com/playlist/*
// @include        http://www.tudou.com/album/view/*
// @include        http://www.qiyi.com/*
// @include        http://v.sohu.com/*
// @include        http://tv.sohu.com/*
// @include        http://my.tv.sohu.com/*
// @include        http://v.ku6.com/show/*
// @include        http://v.ku6.com/film/*
// @include        http://v.ku6.com/special/*
// @include        http://v.qq.com/cover/*
// @include        http://v.qq.com/detail/*
// @include        http://v.pptv.com/show/*
// @include        http://video.sina.com.cn/sports/*
// @include        http://sports.sina.com.cn/*
// @include        http://video.sina.com.cn/ent/*
// @include        http://ent.sina.com.cn/m/*
// @include        http://eladies.sina.com.cn/*
// @include        http://blog.sina.com.cn/*
// @include        http://www.56.com/*
// @include        http://mm.56.com/?action=view*
// @include        http://tieba.56.com/v*
// @include        http://news.163.com/*
// @include        http://ent.163.com/*
// @include        http://v.163.com/video/*
// @include        http://you.joy.cn/playvideo.aspx*
// @include        http://you.joy.cn/video/*
// @include        http://v.joy.cn/movie/detail/*
// @include        http://www.letv.com/ptv/*
// @include        http://tieba.baidu.com/shipin/bw/video/play?*
// @include        http://mv.baidu.com/export/flashplayer.swf*
// @include        http://www.wasu.cn/Play/show/*
// @include        http://v.pps.tv/*
// @include        http://kankan.xunlei.com/vod/*
// @include        http://www.tangdou.com/html/playlist/*
// @include        http://www.funshion.com/subject/play/*
// @include        http://news.cntv.cn/*
// @include        http://space.tv.cctv.com/act/*
// @include        http://space.tv.cctv.com/video/*
// @include        http://www.cctv.com/video/* 
// @include        http://v.cctv.com/html/*
// @include        http://sports.cctv.com/*
// @include        http://space.tv.cctv.com/act/community/television/*
// @include        http://www.m1905.com/vod/*
// @include        http://www.m1905.com/video/play/*
// @include        http://v.ifeng.com/news/*
// @include        http://v.ifeng.com/e/*
// @include        http://v.ifeng.com/v/*
// @include        http://v.ifeng.com/special/*
// @include        http://www.jsbc.com/v/*
// @include        http://www.jstv.com/c/*
// @include        http://tv.btv.com.cn/v/*
// @include        http://space.btv.com.cn/video/*
// @include        http://www.gztv.com/vod/*
// @include        http://ent.hunantv.com/*
// @include        http://www.hunantv.com/*
// @include        http://www.imgo.tv/watch_tv.aspx?*
// @include        http://www.imgo.tv/Mgtv_Mini_play.aspx?*
// @include        http://tv.cztv.com/play?*
// @include        http://www.cztv.com/homepage/tv/*
// @include        http://podcast.tvscn.com/*
// @include        http://www.taihaitv.cn/*
// @include        http://www.s1979.com/news/*
// @include        http://www.cutv.com/yule/*
// @include        http://v.iqilu.com/*
// @include        http://news.xinhuanet.com/video/*
// @include        http://fenxiang.umiwi.com/*
// @include        http://movie.mtime.com/*
// @include        http://i.mtime.com/movietrailers/blog/*
// @include        http://v.v1.cn/*
// @include        http://miniv.v1.cn/mylist/*
// @include        http://www.acfun.tv/v/*
// @include        http://v.163.com/*
// @include        http://17173.tv.sohu.com/*
// @include        http://v.game.sohu.com/*
// @include        http://v.pcgames.com.cn/*
// @include        http://www.aipai.com/*
// @include        http://v.4399pk.com/xiaoyouxi/video_*
// @include        http://www.yinyuetai.com/video/*
// @include        http://www.kugou.com/mvweb/html/mv_*
// @icon           http://tb.himg.baidu.com/sys/portrait/item/0b43e3f1d1c4501a
// @author         Shuangya
// @version        1.0
// ==/UserScript==

var url=window.location.href;
var tourl='http://www.flvcd.com/parse.php?kw='+url;
var my=document.createElement("div");
document.body.appendChild(my);
my.style.position="fixed";
my.style.top='50%';
my.style.margin='-50px 0 0 0';
my.style.left=0;
my.style.backgroundColor="rgb(63,188,239)";
my.style.height='120px';
my.style.zIndex='999';
my.style.width='30px';
my.style.paddingLeft='5px';
my.innerHTML='<a style="text-decoration:none;line-height:30px;color:white;font-size:20px;font-weight:bold;" href="'+tourl+'" target="_blank">立<br/>即<br/>下<br/>载</a>';