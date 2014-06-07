// ==UserScript==
// @name Autologin
// @namespace ilockerz.ru
// @version 0.01
// @source ilockerz.ru
// @name value 
// @include  *lockerz*
// @include  *www.lockerz.com*
// @author          Freamer
// ==/UserScript==



var email="Ваш e-mail";      // email
var pass="Ваш password";               // password


function $$(a) {
    return document.getElementById(a);
}



if (location.href == "http://lockerz.com/") {
 $$("email-email").value = email;
 $$("password-password").value = pass;
 $$("sumbitLogin").click();
}


// login at lockerz.com

if (location.href == "http://www.lockerz.com/") {
 $$("email-email").value = email;
 $$("password-password").value = pass;
 $$("sumbitLogin").click();
}



// login at ptzplace.lockerz.com

if (location.href.indexOf("welcome") > -1 || location.href == "http://ptzplace.lockerz.com/") {
 $$("email").value = email;
 $$("combination").value = pass;
 $$("loginForm").submit();
}