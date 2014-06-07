// ==UserScript==
// @name           Pardus Fuel Alert
// @namespace      pardus.at
// @description    Displays an alert box if your fuel drops below 1.5 and you have none in your cargo hold
// @include        http://orion.pardus.at/main.php*
// @author         Rhindon
// @version        1.1
// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

var warningThreshold = 1.5;

var displayWarningOnlyOnce = true;	//Set to false to display the error
									//every time the Nav screen is loaded
									//if you're under the threshold.
									//Otherwise, it'll show every time
									//the page is loaded.
									
var cookieName = "PrevFuelAmount";


// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////

function createCookie(name,value,days) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	GM_setValue(subdomain + '-' + name,value);

}

function readCookie(name) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	try {
		var temp = GM_getValue(subdomain + '-' + name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}

function eraseCookie(name) {
	createCookie(name,"~~~DELETED~~~");
}

// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////



// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////


function fuelAlertInit() {

	var tankFuel  = document.getElementById('fuel').innerHTML;

	var cargo = document.getElementById('cargo');
	var imgs = cargo.getElementsByTagName('img');

	var fuelCell;

	for(var i = 0; i < imgs.length; i++) {

	  if(imgs[i].title == 'Hydrogen fuel') {
		fuelCell = imgs[i].parentNode;
		break;
	  }
	}

	var cargoFuel = fuelCell.innerHTML;
	cargoFuel = cargoFuel.substr(cargoFuel.lastIndexOf(':') + 1);

	if(cargoFuel.indexOf('<') == 0) {
	  cargoFuel = cargoFuel.substr(cargoFuel.indexOf('>') + 1);
	}

	if(cargoFuel.indexOf('<') > 0) {
	  cargoFuel = cargoFuel.substr(0, cargoFuel.indexOf('<'));
	}


	var totalFuel = parseFloat(tankFuel) + parseFloat(cargoFuel);
	
//	alert(totalFuel);

	var prevAmt = readCookie(cookieName);
	
	if(displayWarningOnlyOnce && prevAmt < warningThreshold) {
		createCookie(cookieName, totalFuel);
		return;
	}
	
	createCookie(cookieName, String(totalFuel));
	
	if(totalFuel < warningThreshold) {
	  alert("Check your tank!  You're almost out of gas!");
	}

}

fuelAlertInit();