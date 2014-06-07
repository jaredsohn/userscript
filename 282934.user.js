// ==UserScript==
// @name       landes admin click-all-button
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description lets you have a 'click all' button
// @match      http://www.landesbioscience.com/admin/article/*
// @copyright  None, but made by Yves Courtois
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$("#send_pmc").on("click",function() {
    setTimeout(function() {
    	$("#pmc_checklist button").before("<hr><button style='float:left' onclick=\"$('#pmc_checklist input').click();\">check all</button>");
    },500);
});

