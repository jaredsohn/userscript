// ==UserScript==
// @name        Fix Firefox Youtube Comments Bug
// @namespace   http://userscripts.org/users/423014
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include     http://*youtube.com*/watch*
// @include     https://*youtube.com*/watch*
// @version     1
// @grant       none
// @run-at document-end
// @unwrap
// ==/UserScript==


window.fix_bug = function(){
    $(".comment").css("overflow", "visible");
    $(".comment").css("overflow", "hidden");
};


$(function() {
//$(document).load( function(){
    
    fix_bug();
    
    $("#watch-discussion").click( function(){
        console.log("comments click");
        fix_bug();
    });
    
});

