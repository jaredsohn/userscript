// ==UserScript==
// @name       zgpingshu simplify
// @namespace  http://uanguei.info/
// @version    0.1
// @description  hide all ads in zgpingshu.com
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match      http://*.zgpingshu.com/*
// @copyright  2012+, Wayne Wang
// ==/UserScript==


var puzzlega = window.puzzlage || {};
puzzlega.zgpingshu = {
    HIDE_PARTS : ['iframe','#top_ad'],
    HideEverything: function(){
        for(var i =0 ; i< this.HIDE_PARTS.length; i++){
            $(this.HIDE_PARTS[i]).remove();
        }},
    RemoveAdScripts: function(){
        $('script').each(function(index,value){
            // sorry baidu...
            if(value.src.match(/baidu/)){
                $(value).remove();
            }
        });
    },
    Main: function(){
        this.RemoveAdScripts();
        this.HideEverything();
    }
};

$(function(){
    puzzlega.zgpingshu.Main();
});