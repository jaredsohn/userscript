// ==UserScript==
// @name       FriendConfirmAutoClose
// @namespace  
// @version    1
// @description  
// @match      http://m.odnoklassniki.ru/dk?st.cmd=userEvents*
// @copyright  2012+, tehKost
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    sleep(100);
    $('input[name=button_auth_yes]').click();
    sleep(100);
}); 

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
} 