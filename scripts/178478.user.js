// ==UserScript==
// @name       Replace EDX homework due date with local time string
// @namespace  http://edge.edx.org
// @version    0.4
// @description  replace the confusing UTC timestamp due date with local string
// @match      https://edge.edx.org/*
// @copyright  Rae Liu
// ==/UserScript==
$(function () {
    $('.chapter').find('.subtitle:contains("Homework")').each(function (i) {
        var parsedList = $(this).text().slice(13, ($(this).text().indexOf('UTC') - 1)).split(' ');
        parsedList.splice(3, 1);

        var parsedStr = parsedList.join(' ') + " UTC";
        var newDate = new Date(parsedStr);

        $(this).text('Homework due at ' + newDate.toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric'}));
    });
});
