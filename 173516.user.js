// ==UserScript==
// @name Set Army Send Time
// @namespace  facebook.com/ryhowe
// @version    0.2
// @description to send armies at designated times
// @match      http://en1.waysofhistory.com/getarmy
// @copyright  2012+, 
// ==/UserScript==

var pArrival = $("#time2");
var mArrival = getArrive();

function getArrive(){
    var x;
    var t=prompt("Please enter the arrival time","12:00:00");
    if (t!=null){
        x="Hello, your troops will arrive at " + t ;
        alert(x);
    }
    return t;
}

function tryLaunch(){
    var submitMe = $("form[action='sendarmy']");
    var checkNow = setInterval(function (){if(pArrival.text() == mArrival){submitMe.submit()}},1000);
}    

tryLaunch()
