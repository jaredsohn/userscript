// ==UserScript==
// @name       Clubready Scanner
// @namespace  http://use.i.E.your.homepage/
// @version    0.6
// @description  enter something useful
// @match      http://*/admin/checkinmonitor2.asp
// @copyright  2012+, You
// ==/UserScript==

//Check Search Box Length or No Match
var barcode = document.getElementById('barcode');
var userinfo = document.getElementById('userinfo');
var checkinlist = document.getElementById('checkinlist');
var timer_set = 'on'; //Timer for search
var timer_res = 'off'; //Timer for reload
if(barcode!=null) {
	barcode.focus();
}
//Main Counter
function counter() {
    count(); //Counter for search
    userinfoCheck();
    countRes();
}

setInterval(counter,500); //run timer for checkLength() and userinfoCheck();
//setInterval(relLoc,90000);

function count() {
    if (timer_set=='on') {
        checkLength();
    }
}

function checkLength() {
    var l = barcode.value.length;
    if (l!=6){ 
        barcode.value = '';
        barcode.focus();
        timer_set = "on";
    }
    if (l==6) {
        timer_set = 'off';
        lookupbarcode();
    }
}
//-------------------------------------------------------
//Repeatedly check check in info is displayed
function userinfoCheck() {
    if (userinfo.style.display != 'none') {
        //Click Check in
        var img = document.getElementById('userinfo').getElementsByTagName('img');
    	img[1].click();
        timer_res = 'on';
    }
    else {
        barcode.value = '';
        barcode.focus();
    }
}
//-------------------------------------------------------
//Reload Whole Page
function countRes() {
    if (timer_res == 'on') {
        relLoc();
    }
}

function relLoc() {
    if (checkinlist.style.display != 'none') {
        //location.reload();
    }
}

