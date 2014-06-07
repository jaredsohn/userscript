// ==UserScript==
// @name        feedly-autologin
// @description automates the log-in process of feedly. (via google oauth)
// @namespace   feedlypi
// @run-at      document-end
// @include     http://cloud.feedly.com/#welcome
// @include     https://accounts.google.com/o/oauth2/*
// @version     1
// @require     http://codeorigin.jquery.com/jquery-2.0.3.min.js
// @grant       none
// ==/UserScript==
$(function() {
setTimeout(function() {
$("#feedlyGetStartedButton").siblings().children("a").click();
    if($(".third_party_name").text()=="feedly") {
    setTimeout(function() {
    $("#submit_approve_access").click();
    },1000);
    }
},100);
});