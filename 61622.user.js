// ==UserScript==
// @name Kuber's video downloader
// @namespace KuberVideoDownloader
// @description Download video files from China video sites
// @version 0.1
// @author Kuber
// @match http://*.openv.com/*play*
// @match http://*.tudou.com/programs/view/*
// @match http://*.tudou.com/program/*
// @match http://*.tudou.com/playlist/*
// @match http://*.youku.com/v_show/* 
// @match http://*.youku.com/*playlist*/* 
// @match http://*.56.com/u*/v_*
// @match http://*.56.com/w*/*aid*
// @match http://*.ku6.com/show/*
// @match http://*.ku6.com/special/*
// @match http://6.cn/watch/*
// @match http://6.cn/playlist/*
// @match http://you.video.sina.com.cn/b/*
// @match http://you.video.sina.com.cn/a/*
// @match http://video.sina.com.cn/sports/*
// @match http://sports.sina.com.cn/g/bn/*
// @match http://video.sina.com.cn/ent/y/bn/*
// @match http://tv.video.sina.com.cn/play/*
// @match http://video.sina.com.cn/news/*
// @match http://movie.video.sina.com.cn/movie/*
// @match http://movie.video.sina.com.cn/teleplay/*
// @match http://video.qq.com/v1/*
// @match http://tv.sohu.com/20*
// @run-at document-start
// ==/UserScript==
var base64DownloadIcon = 'data:image/png;base64,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';

var downloadUrl = 'http://www.flvcd.com/parse.php?kw='+window.location.href;
var celDownloader = document.createElement('div');
celDownloader.setAttribute('id','flvcddownloader');
celDownloader.setAttribute('style','position:fixed;top:0;left:10px;width:65px;height:65px;z-index:1001;opacity:0.4;');
celDownloader.innerHTML='<a style="position:absolute;right:8px;top:8px" href="'+downloadUrl+'" title="Download this video"><img src="'+base64DownloadIcon+'" border="0"/></a>';
document.getElementsByTagName('body')[0].appendChild(celDownloader);