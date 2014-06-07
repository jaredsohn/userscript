// ==UserScript==
// @name       百度加上Google和360链接
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.baidu.com/*
// @copyright  2012+, EDU
// ==/UserScript==
    
    //setTimeout("window.location.reload();", 500);

function $(id) {
    return document.getElementById(id);
}


var kw = $("kw");  

if(kw.value!="")
{
    //alert(kw.value);
    
    var s = "切换：<a  target=\"_blank\" href=http://www.google.com.hk/search?hl=zh-CN&ie=utf-8&q="+kw.value+" >搜出Google</a>";
        s+="&nbsp;&nbsp;<a target=\"_blank\" href=http://so.360.cn/s?ie=utf-8&src=hao_phome&q="+kw.value+" >搜出360</a> "; 
        s+="&nbsp;&nbsp;<a target=\"_blank\" href=http://search.360buy.com/Search?enc=utf-8&keyword="+kw.value+" >搜出京东</a> "; 
        
    //把google加上
    var setf=  $('setf')  
     
    setf.innerHTML=s;
}
