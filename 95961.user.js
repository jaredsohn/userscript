// ==UserScript==
// @name           APOD-AdvancedStyler
// @include        http://apod.nasa.gov/apod/ap*.html
// @include        http://antwrp.gsfc.nasa.gov/apod/ap*.html
// @description    Script for accentuating the APOD (Astronomy Picture of the Day) layout with a black background and adding functions in the shape of Prev and Next Buttons which use date-time logic. 
// ==/UserScript==


var body = document.body;
body.setAttribute("bgcolor","black");
body.setAttribute("link","white");
body.setAttribute("vlink","grey");
body.setAttribute("text","#cccccc");
body.setAttribute("alink","white");


// get datestring of url
var myString = new String(document.location);
var myArray1 = myString.split("/");
var myArray2 = myArray1[4].split('ap');
var myArray3 = myArray2[1].split('.html');

var myYear = myArray3[0].slice(0,2);
var myMonth = myArray3[0].slice(2,4);
var myDay = myArray3[0].slice(4,6);


if (myYear<70)
{
 var myYearLong = "20"+myYear
}
else
{
 var myYearLong = "19"+myYear
}

// parse date
var d = Date.parse(myYearLong+"-"+myMonth+"-"+myDay);

// determine day before date
var before = d-86400000;
var myDateBefore = new Date(before);
if (myDateBefore.getDate()<10)
{
 dayBefore = myDateBefore.getDate() + "";
 dayBeforeOut = 0 + dayBefore;
}
else
{
 dayBeforeOut = myDateBefore.getDate() + "";
}
var monthBefore = myDateBefore.getMonth();
monthBefore++;
if (monthBefore<10)
{
 monthBeforeIn = 0 + monthBefore + "";
 monthBeforeOut = 0 + monthBeforeIn;
}
else
{
 monthBeforeOut = monthBefore + "";
}
var yearBefore = myDateBefore.getFullYear() + "";
var yearBeforeOut = yearBefore.slice(2,4);

// determine day after date
var after = d+86400000;
var myDateAfter = new Date(after);
if (myDateAfter.getDate()<10)
{
 dayAfter = myDateAfter.getDate() + "";
 dayAfterOut = 0 + dayAfter;
}
else
{
 dayAfterOut = myDateAfter.getDate() + "";
}
var monthAfter = myDateAfter.getMonth();
monthAfter++;
if (monthAfter<10)
{
 monthAfterIn = 0 + monthAfter + "";
 monthAfterOut = 0 + monthAfterIn;
}
else
{
 monthAfterOut = monthAfter + "";
}
var yearAfter = myDateAfter.getFullYear() + "";
var yearAfterOut = yearAfter.slice(2,4);


var p=myArray1[0] + "/" + myArray1[1] + "/" + myArray1[2] + "/" + myArray1[3] + "/" + "ap" + yearBeforeOut + monthBeforeOut + dayBeforeOut + ".html";
var n=myArray1[0] + "/" + myArray1[1] + "/" + myArray1[2] + "/" + myArray1[3] + "/" + "ap" + yearAfterOut + monthAfterOut + dayAfterOut + ".html";


var next = document.createElement("div");
next.setAttribute("class", "nav next");
next.innerHTML="<a href=\""+n+"\">&gt;</a>";
body.appendChild(next);

var prev = document.createElement("div");
prev.setAttribute("class", "nav prev");
prev.innerHTML="<a href=\""+p+"\">&lt;</a>";
body.appendChild(prev);

var style = "body { color: #ccc; font-family: Verdana; font-size: 13px; background-color: black;} a { color: white;} a, a:active,a:visited { color: white;} p { line-height: 20px;} .nav { position:absolute; top:150px; width: 150px; font-size: 70px; text-align: center; border: grey 1px solid; color: white;} .nav a{ text-decoration: none; display: block; width: 100%; height: 100%;} .next { right: 3px;} .prev { left: 3px;}";
addGlobalStyle(style);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
