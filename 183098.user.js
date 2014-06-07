// ==UserScript==
// @name        AutoPutlocker
// @namespace   AutoPutlocker
// @include     http://www.putlocker.com/file/*
// @version     1
// @grant       none
// ==/UserScript==
$(document).ready(function(){
check();
});

var check = function(){
    if ($("#submitButton").attr("disabled") != undefined ) {
        if($("#submitButton").attr("disabled") == false){
            $("#submitButton").click();
            }
        else{
            setTimeout(check, 500); // check again in a second
        }
    }
    else{
        $(".file_splash a")[0].click();
    }
}


