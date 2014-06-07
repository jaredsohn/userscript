// ==UserScript==
// @name       BiliBili Danmu
// @namespace  http://thestargazer.net/
// @version    0.11
// @description  get bilibili danmu
// @match      http://*.bilibili.tv/video/av*
// @copyright  2013, Gi Tetsu
// ==/UserScript==
console.log('BiliBili Danmu Start!');

var result=document.documentElement.innerHTML.match(/cid\=(\d+?)/i);
console.log(result);
var comment_url="http://comment.bilibili.tv/"+result[1]+".xml";
document.getElementById("assdown").href=comment_url;
console.log(comment_url);
console.log('BiliBili Danmu Ended!');