// ==UserScript==
// @name       quizmoder
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  secret
// @match      http://*/*
// @copyright  2014+, snet
// @downloadURL  https://userscripts.org/scripts/source/250477.user.js
// @updateURL    https://userscripts.org/scripts/source/250477.meta.js
// @include      http://quiz-geek.ru/play*
// @include      http://quiz-geek.ru/rooms/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

    $('#usersLink').parent().append('+');
document.addEventListener('DOMNodeInserted', function(e){
    var nick;
    if($(e.target).attr('class')=="message-q"){
        var kolvo = $($(e.target).find(".msg-text")).text().trim().length;
        if(kolvo>1500){
           nick = $($(e.target).find(".nick")).text().trim();
            if(kolvo>=2500){
                sendMessage("!ban "+nick);
            }else{
                $('#log').append("<input value='!ban "+nick+"'></input>");
            }
        }
    }
},true);