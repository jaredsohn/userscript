// ==UserScript==
// @name        IncrementVisitors
// @namespace   ravij
// @include     http://www.tr-ees.co.in/*
// @include     https://www.tr-ees.co.in/*
// @include     http://*tr-ees.co.in/*
// @include     https://*tr-ees.co.in/*
// @version     1.1
// @author      Ravi Joshi
// ==/UserScript==

var max = 1000;
var url = 'http://www.tr-ees.co.in';

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function ajaxRequest() {
    var httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return httpRequest;
}
var i = 0; //  set counter to 0
function loop() { //  create a loop function
    setTimeout(function () { //  call time out when the loop is called

        deleteAllCookies();
        var http = new ajaxRequest();
        http.open('GET', url, false);

        http.onreadystatechange = function () {
            if (http.readyState != 4) return;
            if (http.status == 200) {
                console.log('success');
            } else {
                console.log('error');
            }
        };
        //Set request header before sending it
        http.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
        http.setRequestHeader('Connection', 'keep-alive');
        http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0');
        http.send(null);

        if (i++ < max) {
            loop(); //  ..  again which will trigger new loop 
        } //  ..  setTimeout()
    }, 10) // give some relief to server :D
}
loop(); //  start the loop