// ==UserScript==
// @name			Cyber Monster 2 time
// @namespace		http://userscripts.org/users/409423
// @description		Adds a clock in the top left of the window to track various things in Cyber Monster 2
// @include			http://*s*.monster2.game321.com/*
// @include			https://*s*.monster2.game321.com/*
// @version			1.0
// @author			Saxas, Server 18
// ==/UserScript==

// Make sure the page is not in a frame
if(window.self !== window.top)
    throw "";

if(document.getElementById("digital_clock") !== null) 
    throw "";

var time_box = document.createElement("div");
time_box.setAttribute("id", "digital_clock");
time_box.setAttribute("style", "width: 178px; position: fixed; top: 10px; left: 1px; color: #FFFFFF; font-size: 12px; font-family: sans-serif, arial, verdana; z-index:99999;");
document.body.insertBefore(time_box, document.body.firstChild);

function setTime() {
	var period = "",
	DateArr = new Array(),
	fulldate = "",
	date = new Date();

	DateArr["hours"] = date.getHours(),
	DateArr["minutes"] = date.getMinutes().toString(),
	DateArr["seconds"] = date.getSeconds().toString();

	DateArr["hours"] -= 5; // Edit this number for your own timezone. Server Time is currently -5 GMT so -=5. You just change for what the server is for YOUR time.
	if(DateArr["hours"]<=0) 
		DateArr["hours"]+=24;
        
    if((DateArr["minutes"]==58 && DateArr["hours"]==9) || (DateArr["minutes"]==59 && DateArr["hours"]==9)|| (DateArr["minutes"]==00 && DateArr["hours"]==10) || (DateArr["minutes"]==58 && DateArr["hours"]==15) || (DateArr["minutes"]==59 && DateArr["hours"]==15) || (DateArr["minutes"]==00 && DateArr["hours"]==16) || (DateArr["minutes"]==58 && DateArr["hours"]==19) || (DateArr["minutes"]==59 && DateArr["hours"]==19) || (DateArr["minutes"]==00 && DateArr["hours"]==20)) {
		document.body.style.backgroundColor = "red";
    }else if((DateArr["minutes"]==28 && DateArr["hours"]==11) || (DateArr["minutes"]==29 && DateArr["hours"]==11) || (DateArr["minutes"]==30 && DateArr["hours"]==11) || (DateArr["minutes"]==28 && DateArr["hours"]==19) || (DateArr["minutes"]==29 && DateArr["hours"]==19) || (DateArr["minutes"]==30 && DateArr["hours"]==19)) {
		document.body.style.backgroundColor = "blue";
    }else if((DateArr["minutes"]==58 && DateArr["hours"]==10) || (DateArr["minutes"]==59 && DateArr["hours"]==10) || (DateArr["minutes"]==00 && DateArr["hours"]==11) || (DateArr["minutes"]==58 && DateArr["hours"]==18) || (DateArr["minutes"]==59 && DateArr["hours"]==18) || (DateArr["minutes"]==00 && DateArr["hours"]==19)) {
        document.body.style.backgroundColor = "green";
    }else {
		document.body.style.backgroundColor = "black";
    }
	DateArr["hours"] = DateArr["hours"].toString();
    
	if(DateArr["hours"].length==1) DateArr["hours"]="0"+DateArr["hours"]; // Correct the 1 digit glitch
	if(DateArr["minutes"].length==1) DateArr["minutes"]="0"+DateArr["minutes"]; // Correct the 1 digit glitch
	if(DateArr["seconds"].length==1) DateArr["seconds"]="0"+DateArr["seconds"]; // Correct the 1 digit glitch

	time_box.innerHTML = "Server Time: "+DateArr["hours"]+":"+DateArr["minutes"]+":"+DateArr["seconds"]+"<br />"+"<br />";
	time_box.innerHTML += "BM: 10:00/16:00/20:00 <br /><br />";
	time_box.innerHTML += "Bahamut: 11:00/19:00<br /><br />";
	time_box.innerHTML += "DN: 11:30/19:30<br /><br />";
	if((DateArr["minutes"]==58 && DateArr["hours"]==9) || (DateArr["minutes"]==59 && DateArr["hours"]==9)|| (DateArr["minutes"]==00 && DateArr["hours"]==10) || (DateArr["minutes"]==58 && DateArr["hours"]==15) || (DateArr["minutes"]==59 && DateArr["hours"]==15) || (DateArr["minutes"]==00 && DateArr["hours"]==16) || (DateArr["minutes"]==58 && DateArr["hours"]==19) || (DateArr["minutes"]==59 && DateArr["hours"]==19) || (DateArr["minutes"]==00 && DateArr["hours"]==20)) 
		time_box.innerHTML += "Black Market Starting NOW";
	else if((DateArr["minutes"]==28 && DateArr["hours"]==11) || (DateArr["minutes"]==29 && DateArr["hours"]==11) || (DateArr["minutes"]==30 && DateArr["hours"]==11) || (DateArr["minutes"]==28 && DateArr["hours"]==19) || (DateArr["minutes"]==29 && DateArr["hours"]==19) || (DateArr["minutes"]==30 && DateArr["hours"]==19)) 
		time_box.innerHTML += "Dragon Nest Starting NOW";
	else if((DateArr["minutes"]==58 && DateArr["hours"]==10) || (DateArr["minutes"]==59 && DateArr["hours"]==10) || (DateArr["minutes"]==00 && DateArr["hours"]==11) || (DateArr["minutes"]==58 && DateArr["hours"]==18) || (DateArr["minutes"]==59 && DateArr["hours"]==18) || (DateArr["minutes"]==00 && DateArr["hours"]==19)) 
		time_box.innerHTML += "Bahamut Starting NOW";
        
	window.setTimeout(setTime, 1000);
}

window.setTimeout(setTime, 0);