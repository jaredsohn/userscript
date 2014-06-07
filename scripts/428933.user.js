// ==UserScript==
// @name       UTSW_Moodle_Week_Table
// @namespace  https://plus.google.com/107332279152288777803/
// @version    0.1
// @description  Convert line formatting to nice table formatting
// @match      http://utsouthwestern.mrooms3.net/mod/page/view.php?id=*
// @copyright  2014+, Mark Kittisopikul
// ==/UserScript==

if(/^Week/.test(Y.one('#pageheading').getHTML())) {

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


var div = Y.one('div.region-content div.no-overflow');

var lines = div.get('children');

var t = Y.Node.create('<table class="week_agenda"/>');
var th = Y.Node.create('<thead><tr><td>Time</td><td>Lecture (Notes) - Faculty</td><td>Slides</td><td>Audio</td><td colspan="2">Video</td></tr></thead>');
var tb = Y.Node.create('<tbody/>');

Y.one('head').append('<link rel="stylesheet" title="kittisopikul-table" href="http://medschool.kittisopikul.org/moodle-kittisopikul.css" type="text/css"/>');


t.append(th);
t.append(tb);

lastDate = '';
var today = new Date();

lines.each(function (l) {
 tr = Y.Node.create('<tr/>');
 parts = l.getHTML().replace(/Video/g,'').split(/(?: \()|(?:\)\: )|(?:\|)/);
 date = parts.shift();
    if(date != lastDate) {
        lastDate = date;
        date = new Date(date + '/' + today.getFullYear());
        tb.append('<tr><td colspan="6">' + weekdays[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + '</td></tr>')
    }
    
    console.log(date);
 Y.each(parts,function (p) {
  td = Y.Node.create('<td>'+p+'</td>');
  tr.append(td);
 });
 tr.append(Array(6-parts.length+1).join('<td></td>'));
 tb.append(tr);
 div.removeChild(l);
})

div.append(t);

}