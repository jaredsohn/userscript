// ==UserScript==
// @name          show wiki title & links
// @author        kl
// @description   在页面顶端显示wiki格式的网页链接和标题
// @include       *//*.*/*.*
// @include       *//*.*/*/*
// @include       *//*.*/?p=*
// @exclude       *//*//*
// @exclude       *//*.google.*/*
// @exclude       *//*/index.*
// @exclude       *//*/default.*
// @exclude       *login*
// @exclude       *order*
// @exclude       *signup*
// @exclude       *product*
// @exclude       *oauth*
// @exclude       *setting*
// @exclude       *profile*
// @exclude       *mail*
// @exclude       *//*.360buy.com*
// @exclude       *//*.amazon.*
// @exclude       *//*.sf-express.com/*
// @exclude       *//www.tumblr.com/*
// @exclude       *//*/embed/*
// @exclude       *//t.*/mine
// @exclude       *//*.sugarsync.com/*
// @exclude       *iframe*
// @exclude       *widget*
// @exclude       http://player.vimeo.com/video/*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.1
// @history       0.0.1 2011-12-12
// ==/UserScript==

var bltitle=document.title;
var bllink=location.href;
var bldate=new Date();
var blbody = document.getElementsByTagName("body")[0];
var blelement1=blbody.querySelector('*');
var bldiv = document.createElement("div");
var blmonth=bldate.getMonth()+1;
if (blmonth<10){blmonth="0"+blmonth;}
var blday=bldate.getDate();
if (blday<10){blday="0"+blday;}

blbody.insertBefore(bldiv,blelement1);
bldiv.innerHTML='=== ['+bllink+' '+bldate.getFullYear()+blmonth+blday+' | '+bltitle+'] ===';
bldiv.style.cssText="margin:5px;padding:5px;border:1px dashed #c0c0c0;text-align:left;font-size:9.0pt;line-height:100%;";