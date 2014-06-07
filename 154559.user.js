// ==UserScript==
// @name       NekMinnet
// @namespace  http://LOLCHEATING.com
// @version    0.1
// @description  Bot script to automate the research on spacefed, triggers every 5 seconds and resets turn count to 9.
// @match      http://gc.gamestotal.com/*
// @copyright  2012+, You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(document).ready(function($) {
    var target = $("input[value='Start Research !'], input[value=' Explore! ']");
    $("input[name='turns'], input[name='turn']").val("9");
    setTimeout(function() {
        $(target).trigger('click');
    }, 8000);
});
