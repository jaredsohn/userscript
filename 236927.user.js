// ==UserScript==
// @name       Zattoo fix
// @namespace  http://www.zattoo.com
// @version    0.1
// @description  Small changes for Zattoo
// @match      http://zattoo.com/*
// @copyright  2013+, Kursion
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(function(){
    var hack = function(){
		$("#headerpane").hide();
        $(".controlpane_fold").click();
        $(".watch_channel").css("top", "0px");
        $("#tpx").remove();
        $("#videopane").css("position", "absolute");
        $('#videopane').attr('style', 'top: 0px !important');
    };

    setTimeout(function(){ hack(); }, 2000);  
});