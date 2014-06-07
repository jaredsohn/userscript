// ==UserScript==
// @name rmmaxlength
// @description remove maxlength attribute from nfsen page
// ==/UserScript==

$(document).ready(function(){
    $("#filter").attr("maxlength",1000);
});