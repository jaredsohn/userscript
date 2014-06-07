// ==UserScript==
//
// @name           clickable guilt-o-meter
// @description    Keeps track of time wasted reading slashdot (or any page).
// @namespace      http://axlotl.net/greasemonkey
// @include        *slashdot.org/article.pl*
// @include        *axlotl.net/greasemonkey/guilt.html
// ==/UserScript==
//
//
//   A userscript to make the web WORSE.
//   How much time are you wasting trolling slashdot discussions?
//   This script places an unobtrusive timer at the bottom right of 
//   slashdot forums to help you feel bad while you're reading them. 
//   Multiple tabs will add to the cumulative time wasted, which
//   can be briefly displayed with a click.
//
//   This is really just a proof of concept for tracking and logging time. I have
//   managed to prove that milisecond updates make low-end machines blink too much....
//      
//   To re-enable centisecond counting, make sure 1 != 1 around line 111
//   and cut the ending setInterval from 999 to, say, 83.
//   
//   Mock my code here: cwf[]axlotl[]net
//   License: GPL: http://www.gnu.org/copyleft/gpl.html

//cumulative = GM_getValue("countoff") ? GM_getValue("countoff") : 0;
function infectStyles(css) {
    var h, s;
    h=document.getElementsByTagName('head')[0];
    if (!h) { return; }
    s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css; 
    h.appendChild(s);
}
var i = 0;
var oneSec = 1000;
var oneMin = 60 * oneSec;
var oneHour = 60 *oneMin;

var timeObj = new Date();
var clock = drawClock();
var b=document.getElementsByTagName('body')[0];
b.appendChild(clock);
var startTime = timeObj.getTime();
var scratchPad;

var countTime = function()
{
    var now = new Date;
    var nowInMS = now.getTime();
    var diff = nowInMS - startTime;
    var totMins = diff / oneMin;

    //hours past
    scratchPad = diff / oneHour;
    var hoursPast = Math.floor(scratchPad);
    diff -= (hoursPast * oneHour);
    //minutes past
    scratchPad = diff / oneMin;
    var minsPast = Math.floor(scratchPad);
    diff -= (minsPast * oneMin);
    //seconds past
    scratchPad = diff / oneSec;
    var secsPast = Math.floor(scratchPad);
    diff -= (secsPast * oneSec);
    // 10ths of seconds
    scratchPad = diff / 100;
    var tenths = Math.floor(scratchPad);
    diff -= (tenths * 10);
    //100ths
    scratchPad = diff / 10;
    var hundreds = Math.floor(scratchPad);

    i++;
    if(i % 60 == 0){
		  var totalMins;
           if (totalMins = parseInt(GM_getValue("countoff")) + 1){
         	  GM_setValue("countoff", totalMins);
           } else {
   	          GM_setValue("countoff", 1);
   	         }
           //GM_log(totalMins);

    }
    
    writeTime(hoursPast, minsPast, secsPast, tenths, hundreds);
}

function writeTime(hours,mins,secs,tenths,hundreds)
{

    var hoursElem = document.getElementById('hours')
    if (parseInt(hoursElem.firstChild.nodeValue) < parseInt(hours)){
        var newHours = document.createTextNode(hours);
        hoursElem.replaceChild(newHours, hoursElem.firstChild);
    }
    var minsElem = document.getElementById('mins');
    if (parseInt(minsElem.firstChild.nodeValue) < parseInt(mins) || parseInt(minsElem.firstChild.nodeValue) >= 59){
        var newMins = document.createTextNode(mins);
        minsElem.replaceChild(newMins, minsElem.firstChild);
    }
    var secsElem = document.getElementById('secs')
    if (1 != 2){ // change 2 to 1 to enable centisecond counting
        var newSecs = document.createTextNode(secs);
    } else {
        newSecs = document.createTextNode(secs+'.'+tenths+hundreds);
    }
    secsElem.replaceChild(newSecs, secsElem.firstChild);
}

function drawClock()
{
    var tr,td;
    var clock = document.createElement("table");
    clock.setAttribute("borders", "1");
    clock.setAttribute('id', 'countDown');
    tr = clock.insertRow(0);

    td = tr.insertCell(0);
    td.setAttribute("id","hours");
    td.style.width = "23px";
    td.innerHTML = "0";
    td = tr.insertCell(1);
    td.innerHTML = ":";
    td = tr.insertCell(2);
    td.setAttribute("id","mins");
    td.style.width = "23px";
    td.innerHTML = "0";
    td = tr.insertCell(3);
    td.innerHTML = ":";
    td = tr.insertCell(4);
    td.setAttribute("id","secs");
    td.style.width = "23px;";
    td.innerHTML = "&nbsp;";

    return clock;
}

var timer = document.getElementById('countDown');
timer.addEventListener('click', function (event)
{
    var toDate = document.createElement("dl");
    toDate.setAttribute("id","toDate");
    toDate.style.right = "20px";
    toDate.style.bottom = "20px";
    toDate.style.opacity = 0.90;

    if(GM_getValue){
        
        var totalWaste = GM_getValue("countoff");
        if (Math.floor(totalWaste / 60) >= 1){
            var todMins = totalWaste % 60;
            var todHours = Math.floor(totalWaste / 60);
        } else {
            todMins = (totalWaste != '' && typeof(totalWaste) != 'undefined') ? totalWaste : 0;
            todHours = 0;
        }
        toDate.innerHTML = "<dt>Wasted:</dt><dd>Mins: "+todMins+"</dd><dd>Hours: "+todHours+"</dd>";
    } else {
        toDate.innerHTML = "Totals Unavailable";
    }
    var b=document.getElementsByTagName('body')[0];
    b.appendChild(toDate);
    setTimeout(function(){fadeaway("toDate")},3500);
    event.stopPropagation();
    event.preventDefault();
}, true);

var fadeaway = function(elemId)
{
    var elem = document.getElementById(elemId);
    var opaq = elem.style.opacity;
    if (opaq > 0){
        elem.style.opacity = (opaq - 0.01);
        setTimeout(function(){fadeaway(elemId)}, 18);
                } else {
        elem.parentNode.removeChild(elem);
    }
} 

var countWidth = (parseInt(document.defaultView.getComputedStyle(document.getElementById('countDown'), null).width) - 8);
GM_log('width: ' + countWidth);
infectStyles(
'table#countDown{'+
'opacity: 0.6;'+
'table-layout:fixed;'+
'border-collapse:collapse;'+
'text-align: right;'+
'margin-left: 10px;'+
'cursor: crosshair;'+
'z-index:99;'+
'}'+
'table#countDown, #toDate {'+
'position: fixed;'+
'bottom: 2px;'+
'right: 20px;'+
'color: #666;'+
'font-size: 12px;'+
'background-color: #bed;'+
'font-family:  \'trebuchet ms\', arial, sans-serif;'+
'padding: 2px 8px;'+
'-moz-border-radius: 4px;'+
'}'+
'table#countdown td {'+
'font-weight:600;'+
'}'+
'td#secs,td#mins,td#hours{'+
'font-weight:400;'+
'}'+
'td#secs {'+
'width: 52px;'+
'padding-left:12px;'+
'text-align:left;'+
'}'+
'dl#toDate{'+
'font-size: 12px;'+
'font-family:  \'trebuchet ms\', arial, sans-serif;'+
'margin: 3px 3px 6px;'+
'padding: 2px;'+
'color: #fff;'+
'font-weight: 600;'+
'-moz-border-radius: 4px;'+
'background-color: #9bb;'+
'width:' + countWidth + 'px;'+
'z-index:98;'+
'}'+
'dt {'+
'font-weight: 400;'+
'background-color: #bed;'+
'color: #666;'+
'list-style-type: none;'+
'-moz-border-radius: 3px;'+
'}'+
'dd {'+
'margin: 0;'+
'}');
/*
*	Set timeout to something like 83 to acheive acceptable granularity
*	for centisecond counting...
*/
setInterval(countTime, 999);
