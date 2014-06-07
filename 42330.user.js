// ==UserScript==
// @name           Buster Helper
// @version       1.0.1
// @author         Germanaz0
// @namespace 	http://geoks.com.ar/bustout.user.js
// @description	Will save you time. when someone bust you out from jail or the time is over, you will be redirected to prission page
// @license	GNU/GPL Version 3, 29 June 2007 http://www.gnu.org/licenses/gpl-3.0-standalone.html
// @include	http://barafranca.com/*
// @include	http://*barafranca.com/*	
// ==/UserScript==

var jail_url = '/iminjail.php';
var jail_place = '/jail.php';


//function for go in a specific URL
function ira(pagina){
	location.href = pagina;
}


//checker function
function checkeamos() {
if (location.pathname == jail_url) { //check if the current URL is the jail URL
	
	
	var tiempo = parsetimers(document.body.innerHTML); //get timers form page
	tiempo = tiempo['jt']; 
	
	var tiempo_ml = tiempo*1000; //pass the timer to miliseconds
	
	if (tiempo != undefined) 
		setTimeout(ira,tiempo_ml, jail_place) //set the timeout for that time

	else {
		clearInterval(verID); //clear the interval of the refresh page
		ira(jail_place); 
		
		}
	
	var verID = setInterval(ira, 13000, jail_place); //refresh page each 13sec

}
}

//Function that parse the times from the webpage, the param should be a text. I get this function //from kredu script - Omerta Plus

function parsetimers (text) {
  var timers = new Array();
  if (regs = text.match(RegExp('var oTimer = new Timer.*','ig'))) {
    for (id in regs) {
      timers[id] = new Array();
      timers[id]['label'] = regs[id].match('var oTimer = new Timer\\\("(.*)"')[1];
    }
    if (regs = text.match(RegExp('oTimer.setTime.*','ig'))) {
      for (id in regs) {
        timers[id]['value'] = regs[id].match('oTimer.setTime\\\((.*)\\\)')[1];
      }
    }
  }
  var output = new Array();
  for (id in timers) output[timers[id]['label']] = timers[id]['value'];
  return output;
}

setInterval(checkeamos, 3253); //check if you are in jail or not :D