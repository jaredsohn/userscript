// ==UserScript==
// @name        KMITL Reg enter key
// @description Allow user to press enter key in KMITL Registra login page.
// @namespace   http://userscripts.org/users/492554
// @updateURL   https://userscripts.org/scripts/source/178456.meta.js
// @include     https://www.reg.kmitl.ac.th/user/index.php*
// @include     https://www2.reg.kmitl.ac.th/user/index.php*
// @include     https://www3.reg.kmitl.ac.th/user/index.php*
// @include     https://www4.reg.kmitl.ac.th/user/index.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @version     1.1
// ==/UserScript==

var $loginForm = $("#usermm");
$("#user_id").keyup(function(e) {
    if(e.keyCode == 13) {
        $loginForm[0].submit();
    }
});
$("#password").keyup(function(e) {
    if(e.keyCode == 13) {
        $loginForm[0].submit();
    }
});
$("#DrawBotTxt").change(function() {
    $("#BotInput").keyup(function(e) {
        if(e.keyCode == 13) {
            $loginForm[0].submit();
        }
    });
});