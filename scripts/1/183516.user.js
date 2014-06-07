// ==UserScript== 
// @name              Linki MPC
// @namespace         http://www.mpcforum.pl/user/702704-sebuspl/
// @description       Działające linki w statusach na mpcforum.pl
// @author            SebusPL
// @version           0.1 
// @include           http://www.mpcforum.pl/* 
// @include           mpcforum.pl/*
// @include           http://*mpcforum.pl/
// ==/UserScript== 
  
function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
}