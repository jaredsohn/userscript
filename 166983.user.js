// ==UserScript==
// @name        No.More.BaiduHi.Invites
// @auther      freypy
// @description 去掉百度空间烦人的邀请提示
// @include     http://hi.baidu.com/*
// @version     0.1
// ==/UserScript==

(function() {
    var removeInvites = function(){
        var invite_1  = document.getElementById('_XQing1_entity');
        var invite_2 = document.getElementById('_XQing2_entity');
        if (invite_1) {
        	invite_1.parentNode.removeChild(invite_1);
        }
        if (invite_2) {
        	   invite_2.parentNode.removeChild(invite_2);
        }
    }
     if(window.addEventListener){
        document.addEventListener("DOMContentLoaded", removeInvites, false);
    }else{
        window.attachEvent("onload", removeInvites);
    }
   
}) ()
