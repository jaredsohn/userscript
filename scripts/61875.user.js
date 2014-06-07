// ==UserScript==
// @name            wszystkielinki
// @namespace       dw.js.gm
// @include         http://*wrzuta.pl/*
// @require         http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function() {
    var text = document.createElement("textarea");
    text.setAttribute("cols", 60);
    text.setAttribute("rows", 10);
    $("#user_audio").append(text);
    $("#user_aud_list div.title a").each(function(){
        text.value=text.value + $(this).attr("href") + "\n";
    });
}());