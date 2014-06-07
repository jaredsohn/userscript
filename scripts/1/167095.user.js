// ==UserScript==
// @name        Review Stalker
// @namespace   http://camilstaps.nl
// @description Stalks the StackExchange review pages
// @include     http://*stackexchange.com/review
// @include     http://*stackexchange.com/review/
// @include     http://stackoverflow.com/review
// @include     http://stackoverflow.com/review/
// @include     http://serverfault.com/review
// @include     http://serverfault.com/review/
// @include     http://superuser.com/review
// @include     http://superuser.com/review/
// @include     http://askubuntu.com/review
// @include     http://askubuntu.com/review/
// @version     1.1
// @grant       
// ==/UserScript==

var RS_reviews_avail = 0;

function RS_parseInt(string) {
    var got_decimal_point = false;
    var divider = 10;
    var result = 0;
    for (var i = 0; i < string.length; i++) {
        var char = string.substring(i,i+1);
        if (char >= '0' && char <= '9') {
            if (!got_decimal_point) {
                result *= 10;
                result += parseInt(char);
            } else {
                result += parseInt(char) / divider;
                divider *= 10;
            }
        } else if (char == ',') {
        } else {
            return -1;
        }
    }
    return result;
}

function RS_hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

var RS_numbers = document.getElementsByClassName("dashboard-num");
for (var RS_i = RS_numbers.length - 1; RS_i >= 0; RS_i--) {
    if (!RS_hasClass(RS_numbers[RS_i].parentNode, "dashboard-faded")) {
        var int = RS_parseInt(RS_numbers[RS_i].getAttribute('title'));
        RS_reviews_avail += int;
    }
}

if (RS_reviews_avail) {
    window.setTimeout(function(){
        document.title = "(" + RS_reviews_avail + ") " + document.title;
    }, 300);
} else {
    window.setTimeout(function(){
        window.location = window.location;
    }, 15000);
}