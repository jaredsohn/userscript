// ==UserScript==
// @name        GUC Swift report calculator
// @description A script that enhances the GUC swift report by calculating the duration spent everyday
// @namespace   http://userscripts.org
// @include     http://intranet/external/TempProjects/SwiftReports.aspx?SwiftReportId=5&ExecuteReport=1
// @include     http://intranet.guc.edu.eg/external/TempProjects/SwiftReports.aspx?SwiftReportId=5&ExecuteReport=1
// @version     0.2
// ==/UserScript==
var secondsPerMinute = 60;
var minutesPerHour = 60;

function convertSecondsToHHMMSS(intSecondsToConvert) {
  if (isNaN(intSecondsToConvert)){
    return "00:00:00";
  }
  var hours = convertHours(intSecondsToConvert);
  hours = hours<10? "0"+hours : hours;
  var minutes = getRemainingMinutes(intSecondsToConvert);
  minutes = (minutes == 60) ? "00" : (minutes<10)? "0"+minutes : minutes;
  var seconds = getRemainingSeconds(intSecondsToConvert);
  return hours+":"+minutes+":00";
}

function convertHours(intSeconds) {
var minutes = convertMinutes(intSeconds);
var hours = Math.floor(minutes/minutesPerHour);
return hours;
}
function convertMinutes(intSeconds) {
return Math.floor(intSeconds/secondsPerMinute);
}
function getRemainingSeconds(intTotalSeconds) {
return (intTotalSeconds%secondsPerMinute);
}
function getRemainingMinutes(intSeconds) {
var intTotalMinutes = convertMinutes(intSeconds);
return (intTotalMinutes%minutesPerHour);
}

function HMStoSec1(T) { // h:m:s
  excess = 0;
  //in case of PM, add 12 hours, this should always happen unless it is 12 pm
  if (T.indexOf("PM")!==-1){
    excess = 12;
  }
  var A = T.split(/\D+/) ; 
  //excess will reset to zero if it is 12 pm
  if (A[0]=="12"){
    excess = 0;
  }
  return (A[0]*60 + excess*60 + +A[1])*60 + +A[2] }


/*************************************************************/

var cells = document.getElementById("DG_SwiftReport").getElementsByTagName("td");
var firstCellIndex  = 9;
var numberOfDays = parseInt(cells[cells.length-9].childNodes[0].childNodes[0].nodeValue);
var lastDate = cells[cells.length-6].childNodes[0].childNodes[0].nodeValue;
var firstDate = cells[12].childNodes[0].childNodes[0].nodeValue;
var limit = HMStoSec1("08:24:00");

function getRowDate(day){
  return cells[ firstCellIndex + 8 * day + 3 ].childNodes[0].childNodes[0].nodeValue;
}

function setRowDate(day, val){
  cells[ firstCellIndex + 8  * day + 3 ].childNodes[0].childNodes[0].nodeValue = val;
}

function getRowIn(day){
  return cells[ firstCellIndex + 8  * day + 4 ].childNodes[0].childNodes[0].nodeValue;
}

function setRowIn(day, val){
  cells[ firstCellIndex + 8  * day + 4 ].childNodes[0].childNodes[0].nodeValue = val;
}

function getRowOut(day){
  return cells[ firstCellIndex + 8  * day + 5 ].childNodes[0].childNodes[0].nodeValue;
}

function setRowOut(day, val){
  cells[ firstCellIndex + 8  * day + 5 ].childNodes[0].childNodes[0].nodeValue = val;
}

function getRowDuration(day){
  return cells[ firstCellIndex + 8  * day + 6 ].childNodes[0].childNodes[0].nodeValue;
}

function setRowDuration(day, val){
  cells[ firstCellIndex + 8  * day + 6 ].childNodes[0].childNodes[0].nodeValue = val;
  if(HMStoSec1(val)<limit){
    cells[ firstCellIndex + 8  * day + 6 ].childNodes[0].style.color = "red";
  }
  else{
    cells[ firstCellIndex + 8  * day + 6 ].childNodes[0].style.color = "green";
  }
}

function calculateDuration(day){
  var time1 = HMStoSec1(getRowIn(day));
  var time2 = HMStoSec1(getRowOut(day));
  var diff = time2 - time1;
  return convertSecondsToHHMMSS(diff);
}

function getRowAction(day){
  return cells[ firstCellIndex + 8  * day + 7 ]
}

totalTimeSpent = 0;

for (day = 0; day < numberOfDays; day++) {
  timeSpent = calculateDuration(day);
  setRowDuration(day, timeSpent);  
  totalTimeSpent += HMStoSec1(timeSpent);
}
actualSpent = convertSecondsToHHMMSS(totalTimeSpent)
expected = convertSecondsToHHMMSS(numberOfDays*limit)

expectedString = "\nYou were expected to spend: "+expected;
alert("From "+firstDate+" to "+lastDate+"\nYou spent: "+actualSpent);

