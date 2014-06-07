// ==UserScript== 
// @name poll 
// @description auto poll filler 
// @include http://www.cineroundup.com/* 
// ==/UserScript==



function setCheckedValue(radioObj, newValue) {
if(count < 3){
alert("hi");
count++;
	}
if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}



var count = 0;
var runCount = 0;  
var button1 = document.getElementByName("task_button");  
var radio1 = document.getElementById("voteid2")

function timerMethod() {

    runCount++;
    if(runCount >500) 
		clearInterval(timerId);
	setCheckedValue(radio1, "true");
        button1[0].submit();
}

var timerId = setInterval(timerMethod, 30000);    
