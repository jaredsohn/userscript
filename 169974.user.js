// ==UserScript==
// @name       5Sing Resolver
// @namespace  http://openszone.com
// @author	Myfreedom614 <openszone@gmail.com>
// @version    0.1
// @description  5Sing歌曲页面点击下载即可开始下载歌曲，无需登陆，无需再跳转下载页面
// @homepage	https://userscripts.org/scripts/show/169974
// @updateURL	https://userscripts.org/scripts/source/169974.meta.js
// @downloadURL	https://userscripts.org/scripts/source/169974.user.js
// @include      http://yc.5sing.com/*.html
// @include      http://fc.5sing.com/*.html
// @include      http://bz.5sing.com/*.html
// @copyright  2013,Myfreedom614
// ==/UserScript==

/* History
 * 2013-06-08 v0.1 首个版本
 */

var reg = /file: "((\w+.|\/)+(\w+).(mp3|wma))/i;
var arr = document.body.outerHTML.match(reg);
//alert( arr[1]);
var songname=document.getElementsByClassName("mc_info_tit")[0].title;
//alert(songname);
var link = arr[1];
document.getElementsByClassName('func_icon3')[0].getElementsByTagName('a')[0].href = link;