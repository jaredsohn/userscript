// ==UserScript==
// @name       Project Euler score offsets
// @namespace  http://mathemaniac.org/
// @version    1.0.1
// @description  Shows the difference between your score and your friends' on Project Euler.
// @match      http://projecteuler.net/friends
// @copyright  2013, Sebastian Paaske Tørholm
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @grant none
// ==/UserScript==

(function () {
    var myScore;
    $('table.grid > tbody > tr').each(function () {
        if ($(this).children('td').last().html().match(/&nbsp;/)) {
            myScore = 1 * $(this).children('td:nth-child(4)').text();   
        }
    }).each(function () {
        if ($(this).children('th').length > 0) {
            $(this).children('th:nth-child(4)').after('<th>Offset</th>');
        } else {
            var scoreCell = $(this).children('td:nth-child(4)');
            var score = 1 * scoreCell.text();
            var diff = score - myScore;
            scoreCell.after(diff > 0 ? '<td style="color: green; text-align: center">+' + diff + '</td>' :
                            diff < 0 ? '<td style="color: red; text-align: center">' + diff + '</td>' : '<td style="text-align: center">0</td>');
        }
    });
    
    console.log(myScore);
})();