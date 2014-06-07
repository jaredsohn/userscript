// ==UserScript==
// @name        SSRS Details View Selector
// @namespace   http://userscripts.org/users/540437
// @description Always 
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// @include     */Reports/Pages/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
        function checkIt(){
            var getName = $('#ui_btnSwitchView').attr('title');
            if(getName == 'Details View'){
                $('#ui_btnSwitchView img').click();
            }
            else {
            }
        };
        checkIt();
});