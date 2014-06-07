// ==UserScript==
// @name           Count point Dexter Nyköping
// @include        https://dexter.nykoping.se/Default.asp?page=gy/bas/studyplan
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function run() {

var total_points = 0;
var total_grade = 0;

var tatt;

$('span').each(function(index, span) {
    if ($(span).text() == 'Avslutade kurser') {
        var prev = $(span).parent().parent().parent().parent();
        var table = prev.next();
        var tbody = table.children(":first");
        tatt = tbody;
    }
});

$.each(tatt.children(), function(index, row) {
    if (!$(row).hasClass('clsListHead')) {
        var tds = $(row).children();
        var points = parseInt($(tds.get(5)).text());
        if (!isNaN(points)) {
            var grade = $(tds.get(8)).text();
            if (grade == 'MVG') {
                grade = 20;
            } else if (grade == 'VG') {
                grade = 15;
            } else if (grade == 'G') {
                grade = 10;
            }
            grade = points*grade
            total_points += points;
            total_grade += grade;
        }
    }
});

var hp = total_grade/total_points;

alert(hp);

}

var button = $('<button style="position: fixed;top:5px;left:5px;">Calculate points</button>');
$('#sesTimeOut').after(button);

button.click(run);
