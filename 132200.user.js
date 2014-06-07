// ==UserScript==
// @name       weibo sharer
// @namespace  http://tsuyoikaze.allcx.com/
// @version    0.1
// @description  将网页分享至渣浪weibo
// @match      http://www.bilibili.tv/video/*
// @copyright  tsuyoikaze Creative Commons Attribution 3.0 BY-NC-SA
// ==/UserScript==
//Creative Commons Attribution 3.0 BY-NC-SA
var link=location.href;
var p=document.createElement("p");

p.style.width="80px";
p.style.height="60px";
p.style.right="30px";
p.style.top="20px";
p.style.position="fixed";
p.innerHTML='<a href="http://service.weibo.com/share/share.php?url='+link+'" target="_blank">分享到渣浪weibo</a>';

document.body.appendChild(p);