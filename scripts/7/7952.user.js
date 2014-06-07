// ==UserScript==
// @name          FreeSoccer.us local time converter
// @namespace     http://*freesoccer.us/matches/*
// @description   Converts the start times from CET to your local time
// @include       http://*freesoccer.us/matches*
// @include       http://www.freesoccer.us/home.html
// ==/UserScript==


var offset = - new Date().getTimezoneOffset()/60;

var offsetstring = offset;

if(offset != Math.floor(offset)) 
    offsetstring = Math.floor(offset) + ":" + (offset - Math.floor(offset)) * 60;

var timezonename = new Date().toString().match(/\(.+\)/);

if(timezonename) 
    timezonename = timezonename[0].slice(1, timezonename[0].length - 1) + "\n";
else
    timezonename = "";

if(offset != 1)
    offsetstring = timezonename + "UTC/GMT " + (offset != 0 ? (offset > 0 ? "+" : "") + offsetstring : "");
else
    offsetstring = "Europe CET +1 ";

var span = document.getElementsByTagName("span");

var i = 0;

while(i < span.length && !(span[i].hasChildNodes() && span[i].firstChild.nodeName == "#text" && span[i].firstChild.data == "Europe CET +1 "))
    i++

if(i < span.length)
    span[i].firstChild.data = offsetstring 

var div = document.getElementsByTagName("div");

for(var i = 0; i < div.length; i++) {
    
    if(!(div[i].hasChildNodes() && div[i].firstChild.nodeName == "#text" && div[i].firstChild.data.search(/\d\d:\d\d/) > -1))
        continue;
    
    var st = div[i].firstChild.data.match(/\d\d:\d\d/)[0];
    
    var starttime = parseInt(st.substr(0,2), 10) * 60 + parseInt(st.substr(3), 10);
    
    starttime -= new Date().getTimezoneOffset() + 60;
    
    var newDate = "";
    
    if(starttime < 0) { 
        starttime += 1440;
        newDate = getNewDate(-1);
    }
    
    if(starttime >= 1440) {
        starttime -= 1440;
        newDate = getNewDate(+1);
    }
    
    var hours = Math.floor(starttime/60);
    var minutes = starttime - (hours * 60);
    
    var newtime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    
    if(div[i].firstChild.data.length == 5)
        div[i].firstChild.data = newtime + (newDate == "" ? "" : " (" + newDate + ")");
    else
        div[i].firstChild.data = div[i].firstChild.data.replace(/\d\d:\d\d.*/, newtime + (newDate == "" ? "" : " (" + newDate + ")") + " (" + offsetstring + ")");
}

function getNewDate(dir) {
    var strong = document.getElementsByTagName("strong");
    if(strong.length > 0 && strong[0].firstChild.nodeName == "#text" && strong[0].firstChild.data.search(/\d\d\d\d/) > -1) {
        return new Date(Date.parse(document.getElementsByTagName("strong")[0].firstChild.data.replace(/[a-z]+/, "")) + dir * 86400000).toString().match(/[a-zA-Z]+ \d+ \d+/)[0];
    } else
    return "Attention! It's on the " + (dir > 0 ? "next" : "previous") + " calendrical day of your local time zone!";
}
