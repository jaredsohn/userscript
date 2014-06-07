// ==UserScript==
// @name       贴吧链接反跳转
// @namespace  http://bingkubei.tk/
// @version    1.1
// @description  enter something useful
// @match      http://tieba.baidu.com/*
// @include http://tieba.baidu.com/*
// @copyright  2012+, You
// ==/UserScript==

var tzqs = document.getElementsByTagName("a");
var max = tzqs.length;
var num = 0;
for (var min = 0;min<max;min++){
tznmb(tzqs[min]);
}
function tznmb(link){
if (link.href.indexOf("jump.bdimg.com")>-1){

if (link.innerHTML.indexOf("@")==0){
link.href = link.innerHTML.replace("@","http://www.baidu.com/p/") + "?from=tieba";
num++;
}
else{
if (link.innerHTML.indexOf("http")==0){
link.href = link.innerHTML;
num++;
while (link.href.indexOf("amp;")>-1){
link.href = link.href.replace("amp;","");
}
}
else {
link.href = "http://" + link.innerHTML;
num++;
while (link.href.indexOf("amp;")>-1){
link.href = link.href.replace("amp;","");
}
}
}
}   
if (link.innerHTML.indexOf("pan.baidu.com/share/")>-1||link.innerHTML.indexOf("yun.baidu.com/share")>-1){
link.innerHTML = "【度娘网盘】";
}
    if (link.innerHTML.indexOf('kz=') > -1){
    link.innerHTML = "主题(贴号:" + link.innerHTML.substring(link.innerHTML.indexOf('kz=') + 3) + ")" ;
    }
if(link.innerHTML.indexOf('z=')>-1){
    link.innerHTML = "回复(贴号:" + link.innerHTML.substring(link.innerHTML.indexOf('z=') + 2,link.innerHTML.indexOf('#')) + ")";
}
if    (link.innerHTML.indexOf('/p/')>-1){
    if (link.innerHTML.indexOf('?') > -1){
    link.innerHTML = "回复(贴号:" + link.innerHTML.substring(link.innerHTML.indexOf('/p/') + 3,link.innerHTML.indexOf('?')) + ")" ;
    }
    else{
     link.innerHTML = "主题(贴号:" + link.innerHTML.substring(link.innerHTML.indexOf('/p/') + 3) + ")" ;
    }
   }
if (link.innerHTML.indexOf("yunpan.cn")>-1){
link.innerHTML = "【360云盘】";
}
if (link.innerHTML.indexOf("chrome.google.com")>-1){
link.innerHTML = "【Chrome商店】";
}
if (link.innerHTML.indexOf("kuai.xunlei.com")>-1){
link.innerHTML = "【迅雷快传】";
}   
if (link.innerHTML.indexOf("userscripts.org")>-1){
link.innerHTML = "【油猴脚本】";
}
if (link.innerHTML.indexOf("www.renren.com")>-1){
link.innerHTML = "【人人网】";
}
if (link.innerHTML.indexOf("page.renren.com")>-1){
link.innerHTML = "【人人公共主页】";
} 
var bdhd = document.getElementsByClassName('j_d_post_yingyin_url');for(var bdhd_min  = 0;bdhd_min<bdhd.length;bdhd_min++){bdhd[bdhd_min].innerHTML="<a href='" + bdhd[bdhd_min].innerHTML +bdhd[bdhd_min].innerHTML + "</a>";num++;bdhd[bdhd_min].className="";}
}  
/*不喜欢右上角提示的请删掉以下内容*/
if(num==0){
document.getElementsByClassName("sign_title_text_bright")[0].innerHTML="<span style='color:#333333;text-shadow:#333333 0px 0px 1px'>没有需要替换的链接</span>";
}
else{
document.getElementsByClassName("sign_title_text_bright")[0].innerHTML="<span style='color:#333333;text-shadow:#333333 0px 0px 1px'>本次共替换&nbsp;<b style='color:#ff3366;text-shadow:#ff3366 0px 0px 2px'>" + num + "</b>&nbsp;条链接</span>" ;
}

