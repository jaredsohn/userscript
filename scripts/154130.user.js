// ==UserScript==
// @name          sysu-jwxt
// @namespace     http://userscripts.org/scripts/show/154130
// @description   Let SYSU school affair system support non-IE browsers. Use this with sysu-jwxt-ieemu.
// @include       http://uems.sysu.edu.cn/jwxt/*
// @grant         none
// @run-at        document-end
// @version       0.3
// ==/UserScript==

//if (document.location = "http://uems.sysu.edu.cn/jwxt/") { // Login page
    // Get DOM objects
    var j_username = document.getElementsByName("j_username")[0];
    var j_password = document.getElementsByName("j_password")[0];
    // Fix username field keydown event
    j_username.onkeydown = "";
    /*j_password.addEventListener("keydown", function (e) {
        e = e || window.event;
        var charCode = e.charCode || e.keyCode;
        if (charCode == 13) {
            j_password.focus();
        }
    });*/
    // Fix password field keydown event
    j_password.onkeydown = "";
    j_password.addEventListener("keydown", function (e) {
        e = e || window.event;
        var charCode = e.charCode || e.keyCode;
        if (charCode == 13) {
            submit_form();
        }
    });
//}