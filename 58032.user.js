// ==UserScript==
// @name           Set Focus To Google Search
// @namespace      http://as-if.cn
// @description    让页面的谷歌框默认得到焦点
// @include        http://www.w3school.com.cn/*
// ==/UserScript==
function getFocus(){
    if(document.getElementById("searched_content")){
        document.getElementById("searched_content").focus();
        setTimeout(function(){
            document.getElementById("searched_content").focus();
        },500);
    }else{
        setTimeout(function(){
            getFocus();
        },300);
    }
}
getFocus();