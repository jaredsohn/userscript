// ==UserScript==
// @name        AutoLogin
// @namespace   http://jayrajput.blogspot.com
// @description Script to login on clicking a shortcut key.
// @include     https:/*.*.*.*
// @version     1
// @grant       none
// ==/UserScript==
//

// This script was created out of my frustation to type user name and password
// for the lab servers. As a developer, I have to work on multiple lab servers
// which have the same username and password.
function logIn(username, passwd) {
    var userDiv = document.getElementsByName('user');
    var passDiv = document.getElementsByName('password');
    var button = document.getElementsByName('submit');

    userDiv[0].value = username ;
    passDiv[0].value = passwd ;
    button[0].click ();
}

autoLogin = function(e) {
    if (e.altKey && 80 == e.keyCode){ 
        // Alt + p will login
        console.log("auto login starting");
        logIn("youruserid", "yourpassword");
    }
}

document.addEventListener(
    "keydown", 
    autoLogin,
    0
);
