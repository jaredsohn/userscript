// ==UserScript==
// @name       K-Force
// @namespace  http://fuckIE.com
// @version    0.1
// @description  Ajax password brute forcer, uses local php to manage dictionairy file etc.
// @match      http://*/administrator*
// @copyright  2012+, K-Money
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(document).ready(function($) {
    var username = "admin";
    var password = "stevieeeeee";
    
    $("#modlgn_username").val(username);
    $("#modlgn_passwd").val(password);
});