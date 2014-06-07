// ==UserScript==
// @author slimx
// @name           discuz login fix
// @description 安全问题和登录类型不显示的修正
// @namespace      com.slimx
// @include        http://bbs.kenapple.com/*
// ==/UserScript==
(function(){
    var q = document.getElementById("questionid");
    if(q){
    var input = document.getElementById("answer");
    addEventListener("change",function(){
        input.style.display = q.value>0?"":"none";
    },false);
//登录类型选择 
var type = document.getElementById("loginfield");
if(type.style.display!="none")return;
type.style.display='';
var a = document.createElement("a");
a.id="loginfield_ctrl";
a.href="javascript:;"
a.hidefocus=true;
a.tabindex="1";
a.innerHTML="用户名";
type.parentNode.insertBefore(a,type.nextSibling);
unsafeWindow.simulateSelect("loginfield");
    }
    else
    {
    	unsafeWindow.simulateSelect=function(){return;}
    	GM_addStyle("#answer{display:inline !important}");
    }


})();