// ==UserScript==
//
// Displayable Name of your script 
// @name           cnBeta宽屏脚本
// 
// brief description
// @description    方便宽屏用户(1280px 以上的显示器)在cnBeta上浏览新闻，尤其是当有些图片被阅读区域遮挡时，该脚本能很好的改善阅读空间。   
//
// URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://userscripts.org/users/515318/cnbeta/
//
// Your name, userscript userid link (optional)   
// @author         brian (http://userscripts.org/users/515318) 
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://userscripts.org/scripts/show/166042/ 
//
// Version Number
// @version        1.1
//
// Urls process this user script on
// @include        http://www.cnbeta.com/articles/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        http://code.jquery.com/jquery-1.9.1.min.js
//
// @history        1.1 updated version
// @history        1.0 first version!
//
// ==/UserScript==


$(function(){

    function expand(){
        var increment = $(window).width() - 1024;
        increment = increment > 0 ? increment : 200;
        for(var i=0; i<arguments.length; i++){
            var div = $(arguments[i]);
            div.width(div.width() + increment);
        }
    }
    
    if(!window.expanded){
        expand('#wrapper', '#head', '#main', '#newsBox', '#news_content');
        window.expanded = true;
    }

});

