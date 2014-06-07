// ==UserScript==
// @name       FriendEventAutoClose
// @namespace  
// @version    1
// @description  
// @match      http://m.odnoklassniki.ru/dk?st.cmd=userFriendshipConfirm*
// @copyright  2012+, tehKost
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    sleep(100);
    $('input[name=button_comp_close]').click();
    sleep(100);
}); 

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
} 