// ==UserScript==
// @name        (Un)vote eComments
// @namespace   com.erepublik.fixcomments
// @include     http://www.erepublik.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1.2
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function UserScript(){
    var $       = jQuery.noConflict();

    function FixVote() {
        var a = $('[trigger="comment_like"]');
        var b = $('[trigger="comment_unlike"]');

        a.html("Vote");
        b.html("Unvote");

        if (a.length <= 0 || b.length <= 0)
            setTimeout(FixVote, 1000);
    }

    $(document).ready(function(){
        $('[trigger="reply"]').bind('click',function(){
            setTimeout(FixVote, 1000);
        });
        $('[trigger="show"]').bind('click',function(){
            setTimeout(FixVote, 1000);
        });
    });
}
if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
    addJQuery(UserScript);
}else{
    UserScript();
}