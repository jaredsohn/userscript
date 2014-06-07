// ==UserScript==
// @name        PAS GKP
// @namespace   ANAND KUMAR
// @include     https://portal1.passportindia.gov.in/AppOnlineProject/secure/createAppointOnline
// @include     https://portal1.passportindia.gov.in/AppOnlineProject/secure/showSlotsByLocation
// @version     1
// ==/UserScript==
var time_box = document.createElement("div");
time_box.setAttribute("id", "digital_clock");
time_box.setAttribute("style", "position: fixed; bottom: 1px; right: 1px; padding: 5px; color: #000000; text-shadow: 0 0 10px #000000; background: #FFFFFF; border: 1px solid #C7C7C7; border-radius: 6px; font-size: 12px; font-family: sans-serif, arial, verdana; z-index:99999;");
document.body.insertBefore(time_box, document.body.firstChild);
function setTime() {
		DateArr = new Array(),
		date = new Date();
		DateArr["hours"] = date.getHours(),
		DateArr["minutes"] = date.getMinutes().toString(),
		DateArr["seconds"] = date.getSeconds().toString();
		time_box.textContent = DateArr["seconds"]+": SECOND"
 if(
//DateArr["hours"] >7 &&
DateArr["seconds"]==1 && 
(document.getElementById('showSlotsByLocation_Next_key')))
        {document.getElementById('showSlotsByLocation_Next_key').click();}
	    window.setTimeout(setTime, 1000); }
    setTime();
    if(document.getElementById('pfcLocation')){
	document.getElementById('pfcLocation').value="51";    
    document.getElementById('test').focus();}
    getPSKAddress();