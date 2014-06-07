// ==UserScript==
// @name        Guokr Addons
// @namespace   Zhenyan
// @description Guokr Addons
// @include     http://www.guokr.com/*
// @include     http://guokr.com/*
// @version     1
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==
function include(search,text){
    var ret=text.indexOf(search,0);
    if(ret==-1){
        return false;
    }
    else{
        return true;
    }
}
var url=window.location.href;
var isGroup=include("/group/posts/",url);
var isArticle=include("/article/",url);
var isBlog=include("/blog/",url);
var isAsk=include("/question/",url);
var isPost=include("/post/",url);
var isUser=include("/i/",url);
//var hideUsers=["吹口琴的猫","食物链征服者","晨光01","Sagredo","霜焰","thelight","果壳就是个壳","紫粉马","真正的当事人","小螺号a","liuyazhi111","这里能说真话么","冷读","NECST","赫米斯之鸟","创人杨十三","神之疯神"]
var hideUsers=[];
get();
function get(){
    hideUsers=localStorage.users.split(",");
}
function set(){
    localStorage.users=hideUsers.join(",");
}
function needHide(user){
    for(var i=0;i<hideUsers.length;i++){
        if(user==hideUsers[i]){
            return true;
        }
    }
    return false;
}
$(document).ready(function(){
    if(isPost||isArticle||isBlog){
        var Authors=$("a.cmt-author.cmtAuthor");
        $.each(Authors,function(){
            if(needHide($(this).text())){
                $(this).parent().remove();
            }
        });
    }
    else if(isAsk){
        var Authors=$("a.answer-usr-name");
        $.each(Authors,function(){
            if(needHide($(this).text())){
                $(this).parent().parent().parent().parent().remove();
            }
        });
    }
    else if(isGroup){
        var Authors=$("a");
        $.each(Authors,function(){
            if($(this).parent().attr("class")=="titles-b-l"&&needHide($(this).text())){
                $(this).parent().parent().parent().remove();
            }
        });
    }
    else if(isUser){
        if(confirm("屏蔽此人")){
            var Users=$("a");
            $.each(Users,function(){
                if($(this).parent().attr("class")=="top-main-n1"&&!needHide($(this).text())){
                    hideUsers.push($(this).text());
                    set();
                }
            });
        }
    }
});