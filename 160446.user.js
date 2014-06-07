// ==UserScript==
// @name          贴吧翻页
// @description  贴吧翻页
// @author         陌百百<feng_zilong@163.com>
// @include        http://tieba.baidu.com/*
// @exclude       http://tieba.baidu.com/i/*
// @exclude       http://tieba.baidu.com/f/*
// @updateURL     https://userscripts.org/scripts/source/160446.meta.js
// @downloadURL    https://userscripts.org/scripts/source/160446.user.js
// @version       0.1
// ==/UserScript==
/*******************添加节点************************/
//left按钮
function create_left_button(){
    var l_button_span,l,l_css,dis_frs_l;
    l_button_span=document.createElement("span");
    l=document.getElementById("container");
    l.appendChild(l_button_span);
    l_button_span.className+="page_l_span";
    l_button_span.id+="page_l_span_1";
    dis_frs_l=(document.body.clientWidth-980)/2-80;
    l_css="position: fixed;top: 200px;width:60px;height:230px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAADeCAYAAACHWai/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QjgwREY3NDIwNjFFMjExQjMyMDlCNkFCMjI1QUY4NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQkJCQTQyMTYxRTkxMUUyODc5MEZENjYwNThEQTE4MyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQkJCQTQyMDYxRTkxMUUyODc5MEZENjYwNThEQTE4MyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOUVFRDA0OUUzNjFFMjExQUNEMzkxRDAzNjc5MTAzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QjgwREY3NDIwNjFFMjExQjMyMDlCNkFCMjI1QUY4NCIvPiA8L3JkZjpEZXNjcmlwdGlv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);";
    l_button_span.style.cssText=l_css;
    l_button_span.style.left=dis_frs_l+"px";
    
    //pageLeft函数
    function pageLeft(){
        var a,b,c,d,e,f;
        a=location.href;
        b=location.href.length;
        c=document.getElementById("wd1").value;
        d=String(parseInt(a.substring(a.indexOf("pn=")+3,b))-50);
        if(document.getElementById("frs_list_pager"))
        {
        location.href="http://tieba.baidu.com/f?kw="+c+"&tp=0&pn="+d;
        }
        else
        {
            e=a.substring(0,a.indexOf("pn=")+3);
            f=String(parseInt(a.substring(a.indexOf("pn=")+3,b))-1);
            location.href=e+f;
        }
    }
    l_button_span.addEventListener("click",pageLeft,false);
}
//right按钮
function create_right_button(){
    var r_button_span,r,r_css,dis_frs_r;
    r_button_span=document.createElement("span");
    r=document.getElementById("container");
    r.appendChild(r_button_span);
    r_button_span.className+="page_r_span";
    r_button_span.id+="page_r_span_1";
    dis_frs_r=(document.body.clientWidth-980)/2-80;
    r_css="position: fixed;top: 190px;width:57px;height:230px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAADVCAYAAADtnlh8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QjgwREY3NDIwNjFFMjExQjMyMDlCNkFCMjI1QUY4NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MEQ0NzVFRDYxRTkxMUUyOUQzNEEwRUY4ODkzQkRCNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MEQ0NzVFQzYxRTkxMUUyOUQzNEEwRUY4ODkzQkRCNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOUVFRDA0OUUzNjFFMjExQUNEMzkxRDAzNjc5MTAzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QjgwREY3NDIwNjFFMjExQjMyMDlCNkFCMjI1QUY4NCIvPiA8L3JkZjpEZXNjcmlwdGlv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);";
    r_button_span.style.cssText=r_css;
    r_button_span.style.right=dis_frs_r+"px";

    //pageRight函数
    function pageRight(){
        var a,b,c,d,e,f;
        a=location.href;
        b=location.href.length;
        c=document.getElementById("wd1").value;
        d=String(parseInt(a.substring(a.indexOf("pn=")+3,a.length))+50);
        if(document.getElementById("frs_list_pager"))
        {
            if (a.substring(a.indexOf("&")+1,a.indexOf("&")+3)=="fr"||a.substring(b-3,b-2)=="%"||a.substring(a.indexOf("kw=")+3,b)==c){location.href="http://tieba.baidu.com/f?kw="+c+"&tp=0&pn=50";}
            else {location.href="http://tieba.baidu.com/f?kw="+c+"&tp=0&pn="+d;}
        }
        else
        {
            if(a.indexOf("pn=")<0)
            {
                if(a.indexOf("fr=")>0) {location.href=a.substring(0,a.indexOf("fr="))+"pn=2";}
                else{location.href=a+"?pn=2";}
            }
            else
            {
                e=a.substring(0,a.indexOf("pn=")+3);
                if(a.substring(a.indexOf("pn="),b)=="pn=1") {location.href=e+"2";}
                else {f=String(parseInt(a.substring(a.indexOf("pn=")+3,b))+1);location.href=e+f;}
            }
        }
    }
    r_button_span.addEventListener("click",pageRight,false);
}
create_left_button();
create_right_button();
/**********************监听浏览器窗口宽度*****************/
function checkWidth() {
    var browser_width,l_b,r_b,dis;
    browser_width=document.body.clientWidth;
    l_b=document.getElementById("page_l_span_1");
    r_b=document.getElementById("page_r_span_1");
    dis=(browser_width-980)/2-80;
    l_b.style.left=dis+"px";
    r_b.style.right=dis+"px";
}
window.addEventListener("resize",checkWidth,false);
/*************若在首页或尾页则隐藏对应按钮**************/
function l_hide() {
    var l_vis;
    //贴吧首页left按钮隐藏
    if(document.getElementById("frs_list_pager"))
    {
        if(document.getElementById("frs_list_pager").innerHTML.indexOf("上一页")<0){l_vis="hidden";}
        else {l_vis="visible";}
    }
    //帖子页left按钮隐藏
    else
    {
        if(document.getElementById("thread_theme_4"))
        {
            if(document.getElementById("thread_theme_4").childNodes[1].childNodes[1].childNodes[1].innerHTML.indexOf("上一页")<0) {l_vis="hidden";}
            else {l_vis="visible";}
        }
        //若帖子只有一页，则隐藏
        else{l_vis="hidden";}
    }
    return(l_vis);
}
document.getElementById("page_l_span_1").style.visibility=l_hide();

function r_hide() {
    var r_vis;
    //贴吧首页right按钮隐藏
    if(document.getElementById("frs_list_pager"))
    {
        if(document.getElementById("frs_list_pager").innerHTML.indexOf("下一页")<0){r_vis="hidden";}
        else {r_vis="visible";}
    }
    //帖子中right按钮隐藏
    else
    {
        if(document.getElementById("thread_theme_4"))
        {
            if(document.getElementById("thread_theme_4").childNodes[1].childNodes[1].childNodes[1].innerHTML.indexOf("下一页")<0) {r_vis="hidden";}
            else {r_vis="visible";}
        }
        //若找不到两个节点中的任何一个，即帖子只有一页，则隐藏
        else {r_vis="hidden";}
    }
    return(r_vis);
}
document.getElementById("page_r_span_1").style.visibility=r_hide();