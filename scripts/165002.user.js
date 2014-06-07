// ==UserScript==
// @name       BaiduMusicVIPTool
// @namespace  http://openszone.com
// @author	Myfreedom614 <openszone@gmail.com>
// @version    0.1.1
// @description  无需VIP,在百度音乐下载界面可保存320KBPS高品质音乐到云
// @homepage	https://userscripts.org/scripts/show/165002
// @updateURL	https://userscripts.org/scripts/source/165002.meta.js
// @downloadURL	https://userscripts.org/scripts/source/165002.user.js
// @match      http://music.baidu.com/song/*
// @grant none
// @copyright  2013,Myfreedom614
// ==/UserScript==

var url=location.href;
var songid=url.match(/[1-9][0-9]*/);

var cgroup=document.getElementsByClassName('collect-btn-group')[0];
var notvip=cgroup.getElementsByClassName('song-collect-not-vip')[0];
notvip.href='javascript:void(0);';
notvip.className='btn btn-c  song-collect song-collect-vip  btn-w120  {"ids":"'+songid+'","type":"song"}';
notvip.removeAttribute('target');
notvip.getElementsByClassName('inner')[0].style.width="120px";
notvip.getElementsByClassName('btn-icon-collect-vip')[0].className='icon btn-icon-collect-max';
notvip.getElementsByClassName('txt')[0].innerHTML='保存到云';
cgroup.getElementsByClassName('btn-extra-info')[0].style.display = "block";