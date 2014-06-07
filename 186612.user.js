// ==UserScript==
// @name autoShare
// @namespace mimiko.autoShare
// @version 0.1
// @description A simple userscript for auto share on weibo.com
// @match http://service.weibo.com/share/share.php*
// @copyright 2013+, Mimiko
// @require http://static.acfun.tv/dotnet/20130418/script/jquery.min.js
// @grant none
// ==/UserScript==
//ready
$(document).ready(function () {
    //vars
    var tv = null;

    //check url
    tv = function(){
        var url = window.location.href;
        if(url.search(/tu\.acfun\.tv/) != -1){
            //auto share
            var elem = $('#shareIt');
            elem[0].click();
        }
    }();
});