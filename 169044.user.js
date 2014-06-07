// ==UserScript==
// @name           clicker
// @namespace      Does some specific stuff
// @author         TestUser
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/
// @description    Does some specific stuff
// @include        http://s*.ikariam.*/index.php*
// @include        http://s*.*.ikariam.*/index.php*
// @version        0.07
// @exclude        http://support*.ikariam.*/*
//
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#selectmission {position: relative; left:700px; top: 60px; font-size:16px;} #seltag {position:relative; left:700px; top: 50px;background-color:white;width:100px;}');

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}

//************  calculate random delays  **************
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var topperdiv=document.getElementById('GF_toolbar').innerHTML;
var caplevel=getCookie('piratemission'); if (caplevel==null || caplevel=="" || caplevel==0) caplevel=1;
var myindex=(caplevel-1)/2;
var selectmission='<p id="seltag">SELECT MISSION</p><SELECT id="selectmission" onchange="setCookie('+"'piratemission'"+',this.value,365);"><option value="1">2.5 min</option><option value="3">7.5 min</option><option value="5">15 min</option><option value="7">30 min</option><option value="9">1 hour</option><option value="11">2 hours</option><option value="13">4 hours</option><option value="15">8 hours</option><option value="17">16 hours</option></select>';
document.getElementById('GF_toolbar').innerHTML=topperdiv+selectmission;
document.getElementById('selectmission').selectedIndex=myindex;
var mintime, maxtime;
var evalstring;
var mypauseinterval = 2000; // Wait 2 seconds at first... Interval is set then every time the function is called.

function GetLevel(){
  caplevel=getCookie('piratemission');
  switch (caplevel)
  {
    case "3": //7.5 minutes	
      mintime=2000;    maxtime=3500;    evalstring="//a[contains(@href,'buildingLevel=3')]";    break;
    case "5": //15 minutes	
      mintime=2500;    maxtime=5000;    evalstring="//a[contains(@href,'buildingLevel=5')]";    break;
    case "7": //30 minutes	
      mintime=3500;    maxtime=7000;    evalstring="//a[contains(@href,'buildingLevel=7')]";    break;
    case "9": //1 hour
      mintime=7000;    maxtime=10000;    evalstring="//a[contains(@href,'buildingLevel=9')]";    break;
    case "11": //2 hours
      mintime=7000;    maxtime=12000;    evalstring="//a[contains(@href,'buildingLevel=11')]";    break;
    case "13": //4 hours
      mintime=8000;    maxtime=14000;    evalstring="//a[contains(@href,'buildingLevel=13')]";    break;
    case "15": //8 hours
      mintime=10000;    maxtime=15000;    evalstring="//a[contains(@href,'buildingLevel=15')]";    break;
    case "17": //16 hours
      mintime=10000;    maxtime=15000;    evalstring="//a[contains(@href,'buildingLevel=17')]";    break;
    default: // 2.5 minutes
      mintime=2000;     maxtime=3000;    evalstring="//a[contains(@href,'buildingLevel=1')]";    break;
  }
}


function click_captureSmuglersBtn(){
GetLevel();
var captureSmuglersBtn=document.evaluate(evalstring, document.body, null, 9, null).singleNodeValue;   
mypauseinterval = getRandomInt (mintime+1000, maxtime+1000);
if ( captureSmuglersBtn ){ setTimeout(function(){ if (document.getElementById('tabBootyQuest').style.display!="none") captureSmuglersBtn.click();},mypauseinterval);
//setTimeout( click_captureSmuglersBtn, mypauseinterval ); 
}
}

setInterval( click_captureSmuglersBtn, mypauseinterval);
