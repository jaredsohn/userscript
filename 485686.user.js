// ==UserScript==
// @name Legacy Github Javascript Color
// @description #throwbackthursday
// ==/UserScript==
$(".language-color:contains('JavaScript')").css('background-color', '#F8510A');
$('.language-color', $(".lang:contains('JavaScript')").parent()).css('background-color', '#F8510A');