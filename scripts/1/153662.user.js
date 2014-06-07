// ==UserScript==
// @name        form_test
// @namespace   http://userscripts.org/users/
// @include     http://jco.ascopubs.org/site/misc/grease_*
// @version     0.1
// @grant       none
// ==/UserScript==



init();


function init() {

addLink();

}


function addLink() {
    var link = document.write("<a href='javascript:void(0)'>Fill form</a>");
    link.css({
        position: "absolute",
        top: "10px",
        right: "10px"
    });
    
    link.click(function() {
        form.find("[data-field='name']").val("user." + (new Date()).getTime() + "@trash-mail.com");
        

}

