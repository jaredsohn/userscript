// ==UserScript==
// @name        fddb macro support
// @namespace   http://userscripts.org
// @description Adds daily Macros (fat, carbs and protein) to fddb.de's daily overview. Supports two seperate sets of macros for workout and rest days.
// @include     http://fddb.info/db/i18n/myday20/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// @author		Mathias 'mots' Roth (simply.mots@gmail.com)
// ==/UserScript==

//macro format: (kcal, fat, carbs, protein)
var workoutMacros = [2319, 164, 29, 182];
var restMacros = [1839, 133, 23, 138];

//day format: 0 = sunday, 1 = monday etc
var workoutDays = [1, 3, 5];


$(document).ready(function()
{   
    var todaysMacros = (workoutDays.indexOf(new Date().getDay()) == -1) ? restMacros : workoutMacros;
    
    var eatenRow = $('.myday-table-std-td-footer');
    var eatenMacros = [];
    for (var i = 2; i < 6; i++) {
        eatenMacros.push(parseFloat($(eatenRow[i]).text().split(" ")[0].replace(",", ".")));
    }

    var allowanceRow = $('.myday-table-std tbody').append($('<tr>'));
    allowanceRow.append($('<td>').text("Today's allowance:").addClass('myday-table-std-td-footer'));
    allowanceRow.append($('<td>').addClass('myday-table-std-td-footer'));
    allowanceRow.append($('<td>').text(todaysMacros[0] + " kcal").addClass('myday-table-std-td-footer'));
    for (var i = 1; i < 4; i++) {
        allowanceRow.append($('<td>').text(todaysMacros[i] + " g").addClass('myday-table-std-td-footer'));
    }
    
    var diffRow = allowanceRow.append($('<tr>'));
    diffRow.append($('<td>').text("Amount left:").addClass('myday-table-std-td-footer'));
    allowanceRow.append($('<td>').addClass('myday-table-std-td-footer'));
    var delta = todaysMacros[0] - eatenMacros[0];
    allowanceRow.append($('<td>')
        .text((Math.round(delta * 10) / 10) + " kcal")
        .attr('style', 'color:' + ((delta < 0) ? '#D83C3C' : '#40883B') + '!important')
        .addClass('myday-table-std-td-footer'));
    for (var i = 1; i < 4; i++) {
        delta = todaysMacros[i] - eatenMacros[i];
        allowanceRow.append($('<td>')
            .text((Math.round(delta * 10) / 10) + " g")
            .attr('style', 'color:' + ((delta < 0) ? '#D83C3C' : '#40883B') + '!important')
            .addClass('myday-table-std-td-footer'));
    }
    
});