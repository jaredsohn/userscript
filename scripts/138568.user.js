// ==UserScript==
// @name           KinoExzerpt
// @namespace      http://userscripts.org/users/477034
// @include        http://kino.augusta.de/filme
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version        2.1
// ==/UserScript==


var today = new Date();
var dayofweek = today.getDay();
var timeTableCol = ((dayofweek + 3) % 7 ) + 2;
var deadline = today.getHours();

var sizzleTH = "th:not(:eq("+(timeTableCol-1)+"))";
var sizzleTD = "td:not(:eq("+(timeTableCol  )+"))";

$("table.timetable tr").find(sizzleTH).remove();
$("table.timetable tr").find(sizzleTD).remove();

function filterbyTime (idx) {
    var txt = $(this).text();
    var ergebnis = txt.match(/\d+/);
    if (ergebnis) {
        return ergebnis[0] < deadline;
    }
    return true;
}

$("table.timetable tr td").filter(filterbyTime).remove();

$("table.infobox").find("tr:even").remove();

$("tr.timetable2")
  .contents()
  .filter(function() {
    return this.nodeType == 3;
  }).remove();
$("tr.timetable2:empty").remove();

$("table.timetable")
    .filter(function() {
        return $(this).find("tr.timetable2").length == 0;
    })
    .remove();

$("div.mainarea")
    .filter(function(){
        return $(this).find("table.timetable").length == 0;
    })
    .remove();
