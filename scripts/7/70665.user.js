// ==UserScript==
// @name           Earthlost - Animierte Eventzeiten
// @namespace      earthlost.dmo.animatedevents
// @description    Aktualisiert die Restzeit-Anzeigen aller Events auf der Startseite (alle 3 Sek.)
// @exclude 	   http://*.earthlost.de/main.phtml*	
// @include        http://*.earthlost.de/intro.phtml*
// ==/UserScript==
//window.alert('Hello intro!');
var elmNewContent = document.createElement('div');
elmNewContent.appendChild(document.createTextNode('click here'));
document.body.appendChild(elmNewContent);

var xPathEvents = "/html/body/div[1]/table[3]/tbody/tr[2]/td/table/tbody/tr/td/span[count(a)=0]";
var snapResults = document.evaluate(xPathEvents, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


var eventTimerArr = new Array();
var eventNum = snapResults.snapshotLength;
var cMin = 1000*60;
var cHour = cMin*60;
var cDay = cHour*24;

for (var i = 0; i < eventNum; i++) {
	var elmSpan = snapResults.snapshotItem(i);	
	var titleDate = elmSpan.title.split(" ")[1].split(".");
	var titleTime = elmSpan.title.split(" ")[2].split(":");
	var thisTime = new Date(titleDate[2], titleDate[1]-1, titleDate[0]-(-0), titleTime[0]-(-0), titleTime[1], titleTime[2]);
	//alert(thisTime + " * " + titleDate[0]+1);
	eventTimerArr.push(thisTime);
	//break;
	//elmSpan.innerHTML = "<b>" + elmSpan.innerHTML + "</b>";
	elmSpan.id = "eventTime" + i;	
}

function addZero(inVal) {
	if (inVal < 10)
		inVal = "0"+inVal;
	return inVal;
}

window.MyEventTimer = function() {
	var now = new Date();
	var refTime = now.getTime();
	var refTimeOffset =  now.getTimezoneOffset() / 60;
	//alert("jupp: " + eventNum);
	//alert(now);
	
	for (var i = 0; i < eventNum; i++) {
		var name = 'eventTime'+i;		
		var elmSpan = document.getElementById(name);
		var diff = eventTimerArr[i].getTime() - refTime + (cHour * refTimeOffset);// + cDay * 10;
		var days = 0;
		if (diff >= cDay)
		{
			days = Math.floor(diff / cDay);
			diff -= (days * cDay);
		}		
		var timeDiff = new Date(diff);// + cDay * 32));
		days += timeDiff.getDate() - 1;/*
		alert(	days + "d : " + 
				timeDiff.getHours() + "h + " + 
				timeDiff.getMinutes() + "m + " + 
				timeDiff.getSeconds() + "s : "
				
				);*/
		var result = "";
		if (days > 0)
		{
			result += days + " Tag";
			if (days > 1)
				result += "e";			
		}
		result += " "+addZero(timeDiff.getHours())+":"+addZero(timeDiff.getMinutes())+":"+addZero(timeDiff.getSeconds());
		//alert(timeDiff);
		elmSpan.innerHTML = result;
		//alert(timeDiff);
		
		//alert(timeDiff);
		//break;
	}
}
//window.setTimeout(MyEventTimer, 2000);
//var eventTimer = window.setInterval(MyEventTimer, 2000);
var eventTimer;
if (eventNum > 0) {	
	//window.setTimeout(MyEventTimer, 6);
	//window.clearInterval(eventTimer);
	eventTimer = window.setInterval(MyEventTimer, 2000);
}
//alert(eventNum);
	








