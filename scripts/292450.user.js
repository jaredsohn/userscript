// ==UserScript==
// @id             4Shared.com Premium HighSpeed Download By Shivesh96
// @name           4Shared.com Premium HighSpeed Download By Shivesh96
// @description    Link Generated From http://4server.info. No Login Required.
// @icon           
// @version        1.0 Final Version
// @namespace      Shivesh96
// @author         Shivesh96
// @include        http://www.4shared.com/android/*
// @include        http://www.4shared.com/archive/*
// @include        http://www.4shared.com/file/*
// @include        http://www.4shared.com/get/*
// @include        http://www.4shared.com/mobile/*
// @include        http://www.4shared.com/mp3/*
// @include        http://www.4shared.com/music/*
// @include        http://www.4shared.com/office/*
// @include        http://www.4shared.com/photo/*
// @include        http://www.4shared.com/rar/*
// @include        http://www.4shared.com/video/*
// @include        http://www.4shared.com/zip/*
// @include        http://www.4shared.com/mobile/*
// @run-at         document-start
// ==/UserScript==

if (document.domain ="4shared.com")
{
    var urlArray = window.location.href.split('/'); 
    alert(window.location.href); 
    var url=""; 
    for(var i = urlArray.length-1; i>1; i--) 
    { 
        url = urlArray[i]+"/"+url; 
    }
    window.location.href="http://4server.info/premium/"+url;
}