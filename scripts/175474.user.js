// ==UserScript==
// @name       新回复修改
// @namespace 
// @version    1
// @description  修改“新回复”  “@我”
// @match      http://tieba.baidu.com/*
// @copyright  QAQ，864907600cc，
// ==/UserScript==


var t=setInterval(function(){

    if(document.getElementById('message_reply')!=null){
        var reply=document.getElementById('message_reply').getElementsByTagName('a')[0];
        reply.innerHTML='求搞基';
    }
    if(document.getElementById('message_atme')!=null){
var at=document.getElementById('message_atme').getElementsByTagName('a')[0];
at.innerHTML='求合体';
    }
    


},100);
