// ==UserScript==
// @name        test for dev
// @namespace   uriahwu.net
// @include     http://dev129-vm3.se.corp.tw1.yahoo.com:8880/*
// @require     http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js
// @require     http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js
// @require     http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog2.min.js
// @version     1
// ==/UserScript==
$(".touchableImage").on("taphold", function(e) {
        e.stopPropagation();
        $(this).simpledialog2({
            mode:"blank",
            headerText:"Image Options",
            showModal:false,
            forceInput:true,
            headerClose:true,
            blankContent:"<ul data-role='listview'><li><a href=''>Send to Facebook</a></li><li><a href=''>Send to Twitter</a></li><li><a href=''>Send to Cat</a></li></ul>"
        });
});

$("h1").on("taphold", function(e) {
        e.stopPropagation();
        $(this).simpledialog2({
            mode:"blank",
            headerText:"Image Options",
            showModal:false,
            forceInput:true,
            headerClose:true,
            blankContent:"<label for='basic'>Text Input:</label><input type='text' name='name' id='basic' value=''  /><ul data-role='listview'><li><a href=''>Send to Dictionary</a></li></ul>"
        });
});