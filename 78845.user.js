// ==UserScript==
// @name ll time
// @namespace bjgood
// @description Shows how long ago posts were made
// @include *endoftheinter.net*
// ==/UserScript==

var datepattern = "[0-9]{1,2}/[0-9]{1,2}/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} .M";
var d=new Date();

function timestring(timediff)
{
var sec = Math.floor(timediff/1000);
var min = Math.floor(sec/60);
sec = sec % 60;
var hour = Math.floor(min/60);
min = min % 60;
var day = Math.floor(hour/24);
hour = hour%24;
var months = Math.floor(day/30);
day = day%30;
var years = Math.floor(months/12);
months = months%12;

var result = "";
if (years > 0) {
result = " ("+years + " year"+(years!=1?"s ":" ")+ months + " month"+(months!=1?"s":"")+" ago)";
} else if (months > 0){
result = " ("+months + " month"+(months!=1?"s ":" ")+ day + " day"+(day!=1?"s":"")+" ago)";
} else if (day > 0) {
result = " ("+day + " day"+(day!=1?"s ":" ")+ hour + " hour"+(hour!=1?"s":"")+" ago)";
} else if (hour > 0) {
result = " ("+hour + " hour"+(hour!=1?"s ":" ")+ min + " minute"+(min!=1?"s":"")+" ago)";
} else if (min > 0) {
result = " ("+min+" minute"+(min!=1?"s":"")+" ago)";
} else if (sec > 0) {
result = " ("+sec+" second"+(sec!=1?"s":"")+" ago)";
} else {
result = " Right Now!";
}

return result;
}

if ( document.location.href.match("profile.php"))
{
var rows = document.getElementsByTagName("tr");
for (var j=0; j<rows.length; j++)
{
if (rows[j].innerHTML.match(datepattern))
{
var postdate = rows[j].innerHTML.match(datepattern);
var timediff = d.getTime() - Date.parse(postdate);
rows[j].innerHTML = rows[j].innerHTML.replace(postdate, postdate + timestring(timediff));
}
}
}
else
{
var divs=document.getElementsByTagName("div");
for (var i=0; i<divs.length; i++)
{
if (divs[i].className=="message-top")
{
var postdate = divs[i].innerHTML.match(datepattern);
var timediff = d.getTime() - Date.parse(postdate);
divs[i].innerHTML = divs[i].innerHTML.replace(postdate, postdate + timestring(timediff));
}
}
}

