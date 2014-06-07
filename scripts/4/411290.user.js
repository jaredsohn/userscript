// ==UserScript==
// @name       FB highlights
// @namespace  http://goodrone.ru/
// @version    0.3
// @description  Highlights cells in filter views
// @match      http://devtools.nvidia.com/FogBugz/*
// @match      http://devtools.nvidia.com/Fogbugz/*
// @match      http://devtools.nvidia.com/fogbugz/*
// @copyright  2014+, Andrey Trachenko
// ==/UserScript==
$(document).ready(function() {
    $("td:contains('Resolved ')").css("background-color", "#56AF73");
    $("td:contains('(Unassigned)')").css("background-color", "#E6E65C");
    $("td:contains('1 – Must/NextS')").css("background-color", "#F7926A");
    $("td:contains('2 – Must/UpcomingS')").css("background-color", "#F7E388");
    var username = $("#username").text();
    if ((username ? username.length : 0) > 3) {
        $("a.person:contains('" + username + "')").parents("td").css("background", "#BDD8FC");
    }
});