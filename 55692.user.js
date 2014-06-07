// ==UserScript==
// @name           SCAB consulta - Total Time
// @namespace      http://10.2.3.22/scabc/index.php
// @include        http://10.2.3.22/scabc/index.php
// ==/UserScript==

(function () {

  

function version(){
var scab_version = "0.2";

var spans = document.getElementsByTagName ("span")
span = null;
for (var i in spans){

   if(spans[i].className == "smallblue"){
        span = spans[i];
        break;
	}
	
}

var versionDiv = document.createElement('div');
versionDiv.setAttribute("style", "font-style:italic");
versionDiv.innerHTML = "SCAB - Total Time v." + scab_version 
span.appendChild(versionDiv);
}


  
  function myf(){

  

version();

var tables = document.getElementsByTagName ("table")
if(tables[2].className != "blue"){

	return;
}


table = tables[2];

var normalIn = true;
var normalOut = false;


var totalResult = new Array()
var item = 0;
var currentDate = "";

	for(var x = 1; x < table.rows.length; x++)

	{

		cells = table.rows[x].cells;
		currentDate = cells[1].textContent;
		if(!totalResult[currentDate]){
			totalResult[currentDate] = new Array();
		}
		var normalIn = true;
		var normalOut = false;
		
		for(var y = 3; y < cells.length; y++)

		{
			if(cells[y].className == "normalin" && normalIn){
			//console.log("normalin -> tdIndex:"+ tdIndex);
			result = totalResult[currentDate];
			result[item] = new Array("0","0");
			result[item][0] = cells[y].textContent;
			normalIn = false;
			normalOut = true;
			//console.trace();
			}
			if(cells[y].className == "normalout" && normalOut){
			//console.log("normalout -> tdIndex:"+ tdIndex);
			result = totalResult[currentDate];
			result[item][1] = cells[y].textContent;
			normalIn = true;
			normalOut = false;
			item++;
			}
		}

		

	}


totalTime = getTotalTime(totalResult);

//console.log("size:" + associativeArrayLength(totalTime))

//console.dir(totalTime)
if(associativeArrayLength(totalTime) > 0){
addResult(table, totalTime);
}




}

function calculateEndTime(totalTime){
  now5=new Date();

totalMin = 480 - (totalTime[0]*60 + totalTime[1])

  hour3 = (totalMin / 60) + now5.getHours();
  min3 = (totalMin % 60) + now5.getMinutes();


  if (min3>=60) { min3 = -(60 - min3); hour3 = parseInt(hour3)+1; }
  if (hour3>=24) { hour3 = -(24 - hour3); }

return [parseInt(hour3), min3]
}

function associativeArrayLength(array)

{

length = 0;

for (var object in array) {

length++;

}

return length;

}


function addResult(table, totalTime){

var tBody = table.getElementsByTagName('tbody')[0];
for (var i in totalTime){
	var newTR = document.createElement('tr');

	var totalTD = document.createElement('td');
	var newTD = document.createElement('td');
	totalTD.setAttribute("colspan", '2');
	totalTD.setAttribute("align", 'right');
	totalTD.innerHTML = '<b>[' + i + '] Total worked time=></b>';
	newTD.setAttribute("colspan", '9');
	newTD.innerHTML = '<b>' + timeStr(totalTime[i]) + '</b> <i>Estimated time to go home => ' + timeStr1(calculateEndTime(totalTime[i])) 
 "</i>";

	
	newTR.appendChild (totalTD);
	newTR.appendChild (newTD);

	tBody.appendChild(newTR);
}

}

String.prototype.trim = function () {

    return this.replace(/^\s*/, "").replace(/\s*$/, "");

}


function getTotalTime(data){
	var total = 0;
	result = new Array();
	for (var i in data)

	{
		if(!((i.trim().length) == 0)){
		result[i] = getTime(data[i])
		}

	}
	return result;

}


function getTime(data){
	var total = 0;
	console.dir(data);
	for(var i=0; i < data.length; i++){
		if(data[i] == undefined){
			continue;
		}
		
		t = data[i];
		if(t[1] == "0"){
			var d = new Date();
			var curr_hour = d.getHours();

			var curr_min = d.getMinutes();
			//console.log("curr_hour:"+curr_hour + " - curr_min:" + curr_min);

			t[1] = curr_hour + ":" + curr_min;
		}
		//console.log("TIME:" + t[0]+ " -- " + t[1]);
		time1 = HMStoSec1(t[0]+":00");
		time2 = HMStoSec1(t[1]+":00");
		
		
		//console.log("SECOND:" + time1+ " -- " + time1);
		var diff = time2 - time1;
		total += diff;
		//console.log("SubTOTAL:" + total);
	}
	//console.log("TOTAL!!!!:" + convertSecondsToHHMMSS(total));
	return convertSecondsToHHMMSS(total);
}
	

var secondsPerMinute = 60;



var minutesPerHour = 60;







function convertSecondsToHHMMSS(intSecondsToConvert) {



var hours = convertHours(intSecondsToConvert);



var minutes = getRemainingMinutes(intSecondsToConvert);



minutes = (minutes == 60) ? "00" : minutes;



var seconds = getRemainingSeconds(intSecondsToConvert);




return [hours, minutes]; 



}


function timeStr(time){
   return (time[0] < 10? "0" : "") + time[0]+" h:"+ (time[1] < 10? "0" : "") + time[1] + " m";
}

function timeStr1(time){
   return (time[0] < 10? "0" : "") + time[0]+":"+ (time[1] < 10? "0" : "") + time[1];
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



  var A = T.split(/\D+/) ; return (A[0]*60 + +A[1])*60 + +A[2] }

myf();  

})();