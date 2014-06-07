// ==UserScript==
// @name       CityBus Time
// @version    0.2
// @description  Adds estimated time of arrival
// @match      http://myride.gocitybus.com/*
// @copyright  2012+
// ==/UserScript==
var subRowCountOne=  document.getElementsByClassName('RowStyle').length;
var subRowCountTwo =  document.getElementsByClassName('AlternatingRowStyle').length;
var rowCount = subRowCountOne + subRowCountTwo;
var bus = new Array();
for(i=0; i<rowCount; i++){
    var place = i + 2;
    bus[i] = "_ctl0_cphMainContent_lookupResults_gvDepartureTimes__ctl" + place + "_lblDepartureTime";
}
for(i=0; i<bus.length; i++){
    var str = document.getElementById(bus[i]).innerHTML;
    var patt = new RegExp('[0-9]*');
    var min = patt.exec(str);
    var ms = min * 60 * 1000;
    var current = new Date();
    var future = new Date(current.getTime() + ms);
    var h = future.getHours();
    var ampm = 'am';
    if(h > 12){ 
        h = h - 12;
        ampm = 'pm';
    }
    var m = future.getMinutes();
    var middle = ':';
    if(m < 10) middle = middle + '0';
    var time = str + '<br/>' + h + middle + m + ' ' + ampm;
    document.getElementById(bus[i]).innerHTML = time;
}