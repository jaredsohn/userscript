// ==UserScript==
// @name       Calm down, Jira
// @namespace  http://www.lous.org/
// @version    0.1
// @description  Make in-place editing a bit less trigger-happy: Require clicking the actual edit icon to edit descriptions, not just anywhere in the description area.
// @match      http://*/browse/*
// ==/UserScript==

$(".user-content-block").click(function(event){event.stopPropagation()});
