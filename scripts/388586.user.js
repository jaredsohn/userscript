// ==UserScript==
// @author		极品ΦωΦ小猫
// @name		重载未加载的图片
// @namespace		http://bbs.maxthon.cn/forum.php?mod=viewthread&tid=856185
// @version		0.1
// @description		重新加载因为网络延迟等原因而导致加载失败的图片。（此脚本执行为菜单命令，需要手动执行重载）
// @include		*
// @updata		http://userscripts.org/scripts/show/388586
// @icon		http://s3.amazonaws.com/uso_ss/icon/388586/large.png
// ==/UserScript==

'use strict';

function ReloadImage(){
    var img=document.images;
    for(var i=0;i<img.length;i++){
        if(document.images[i].naturalWidth===0){
            if (document.images[i].src.indexOf('?')>=0){
                document.images[i].src=img[i].src.replace(/Times=\d+/ig,"Times="+(new Date()).getTime());
            } else {
                document.images[i].src=img[i].src+"?"+"Times="+(new Date()).getTime();
            }
        }
    }
}

GM_registerMenuCommand( "重载未加载的图片",  ReloadImage, "", "", "" );