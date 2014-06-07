// ==UserScript==
// @name           Pardus Fuel Dumper
// @namespace      http://pardus.at
// @description    ISIS copyleft
// @include        http://*pardus.at/main.php*
// ==/UserScript==

//USER VARIABLES
//enlarge_fuel_number: increaces the font size of fuel
enlarge_fuel_number = true;
//leave_fuel_amount: how much fuel to leave when dumping
//(will not dump if this is more than you have)
leave_fuel_amount = 1;
//change_button_color: changes the color of the button
//depending on the amount to dump; if 0, the button is disabled
change_button_color = true;


var correctTd = document.getElementById('cargo_image').parentNode.parentNode.nextSibling.childNodes[0].childNodes[0];
if (enlarge_fuel_number) {correctTd.getElementsByTagName('font')[0].setAttribute('style','font-size: 20px;');}
var fuelNumber = correctTd.getElementsByTagName('font')[0].innerHTML;
fuelNumber -= leave_fuel_amount; if (fuelNumber<0) fuelNumber = 0;

var buttonColor = "#aa0000";
var disable = '';
if (change_button_color) {
	if (fuelNumber==0) {
		buttonColor="#666688";
		disable="disabled=\"yes\"";
	}
}

//buttonCode: we'll make the form which dumps the fuel here:
var buttonCode = '<center><br /><form action="drop_cargo.php" method="post"><input type="hidden" name="16" id="16" value="'+fuelNumber+'"></input><button type="submit" name="drop" height="10px" width="30px" '+disable+' style="display: inline; background: '+buttonColor+'; color: #000000; border: 1px dashed #000000;">ISIS Dump <b>'+fuelNumber+'</b> FUEL</input></form></center>';

//adding the button (sorry, I'll use getElById again)
//correctTd.setAttribute('style','visibility:hidden');
var correctTd = document.getElementById('cargo_image').parentNode.parentNode.nextSibling.childNodes[0].childNodes[0];
correctTd.innerHTML = correctTd.innerHTML + buttonCode;