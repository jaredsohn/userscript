// ==UserScript==
// @name       TYS Booking Date keeper
// @version    0.1
// @description  Preservers the date when switching between apartments
// @match      http://booking.tys.fi/varaus/service/timetable/*
// @copyright  2013+, Jarko Papalitsas. Feel free to share and edit
// ==/UserScript==

function getCurrentDate() {
   var datePicker = document.getElementsByClassName('js-datepicker');
   return(datePicker[0].innerHTML.split("."));
}

function getApartments() {
   var apartmentBox = document.getElementsByClassName('box service-nav');
   return apartmentBox[0].getElementsByTagName('a');
}

var rewriteURL = function() {
       var oldURL = this.getAttribute("href");
       var date = getCurrentDate();
       var newURL = (oldURL + "/" + date[0] + "/" + date[1] + "/" + date[2] + "/");
       this.setAttribute("href", newURL);
};

function main() {
    var apartments = getApartments();
    for (var i = 0; i < apartments.length; i++) {
       apartments[i].onclick = rewriteURL;
    }
}

main();