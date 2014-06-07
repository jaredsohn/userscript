// ==UserScript==
// @name   	   Gather username and password of submit
// @namespace  gunderjt
// @version    0.1
// @include http://*
// @include https://*
// @description  Does what the title says
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @match      https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo/related?hl=en
// @copyright  2012+, You
// ==/UserScript==

$.fn.exists = function () {
    return this.length !== 0;
}
$('document').ready(function() {
    $("form").submit(function( event ) {
        var pass = $( 'input[type=password]' ).val()
        if (pass.exists()){
            var userName = $( 'input[type=text]' ).val()
            alert( "Username:  " + userName + " Password: " + pass);
            //	event.preventDefault();
        }
    });
});