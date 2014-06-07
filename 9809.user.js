// ==UserScript==
// @name          Dark Throne - Armory Complete Sets
// @namespace     http://riddle.pl/h/greasemonkey/darkthrone.armorysets.user.js
// @author				ridd1e_PL

// @description		Appends input fields to each equipment category in Armory.
// @description		When you enter value into one of them, its value is copied to 
// @description   all items' input fields saving time and enhancing usability.

// @include       http://omega.darkthrone.com/armory.dt*
// @include       http://www.omega.darkthrone.com/armory.dt*
// ==/UserScript==

var conOff = document.getElementById('class1').parentNode;
var conDef = document.getElementById('class2').parentNode;
var conSpO = document.getElementById('class3').parentNode;
var conSpD = document.getElementById('class4').parentNode;

var inpOff = document.createElement('input');
var inpDef = document.createElement('input');
var inpSpO = document.createElement('input');
var inpSpD = document.createElement('input');

with (inpOff) { type = 'text'; size = '3'; className = 'itemsets'; }
with (inpDef) { type = 'text'; size = '3'; className = 'itemsets'; }
with (inpSpO) { type = 'text'; size = '3'; className = 'itemsets'; }
with (inpSpD) { type = 'text'; size = '3'; className = 'itemsets'; }

function inpOffKeyUp(event) {
	
	/* quantity[1] to  quantity[8] - Type   I - Weapon */

	var offType1 = document.getElementById('quantity[1]');
	var offType2 = document.getElementById('quantity[2]');
	var offType3 = document.getElementById('quantity[3]');
	var offType4 = document.getElementById('quantity[4]');
	var offType5 = document.getElementById('quantity[5]');
	var offType6 = document.getElementById('quantity[6]');
	var offType7 = document.getElementById('quantity[7]');
	var offType8 = document.getElementById('quantity[8]');
	
	if      (offType8) { offType8.value = inpOff.value; }
	else if (offType7) { offType7.value = inpOff.value; }
	else if (offType6) { offType6.value = inpOff.value; }
	else if (offType5) { offType5.value = inpOff.value; }
	else if (offType4) { offType4.value = inpOff.value; }
	else if (offType3) { offType3.value = inpOff.value; }
	else if (offType2) { offType2.value = inpOff.value; }
	else if (offType1) { offType1.value = inpOff.value; }
	
	/* quantity[9] to quantity[11] - Type  II - Helm */
	
	var offType9 = document.getElementById('quantity[9]');
	var offType10 = document.getElementById('quantity[10]');
	var offType11 = document.getElementById('quantity[11]');
	
	if      (offType11) { offType11.value = inpOff.value; }
	else if (offType10) { offType10.value = inpOff.value; }
	else if (offType9) { offType9.value = inpOff.value; }
	
	/* quantity[12] to quantity[14] - Type III - Armor */
	
	var offType12 = document.getElementById('quantity[12]');
	var offType13 = document.getElementById('quantity[13]');
	var offType14 = document.getElementById('quantity[14]');
	
	if      (offType14) { offType14.value = inpOff.value; }
	else if (offType13) { offType13.value = inpOff.value; }
	else if (offType12) { offType12.value = inpOff.value; }
	
	/* quantity[15] to quantity[17] - Type  IV - Boots */
	
	var offType15 = document.getElementById('quantity[15]');
	var offType16 = document.getElementById('quantity[16]');
	var offType17 = document.getElementById('quantity[17]');
	
	if      (offType17) { offType17.value = inpOff.value; }
	else if (offType16) { offType16.value = inpOff.value; }
	else if (offType15) { offType15.value = inpOff.value; }
	
	/* quantity[18] to quantity[20] - Type   V - Bracers */
	
	var offType18 = document.getElementById('quantity[18]');
	var offType19 = document.getElementById('quantity[19]');
	var offType20 = document.getElementById('quantity[20]');
	
	if      (offType20) { offType20.value = inpOff.value; }
	else if (offType19) { offType19.value = inpOff.value; }
	else if (offType18) { offType18.value = inpOff.value; }
	
	/* quantity[21] to quantity[23] - Type VII - Shield */
	
	var offType21 = document.getElementById('quantity[21]');
	var offType22 = document.getElementById('quantity[22]');
	var offType23 = document.getElementById('quantity[23]');
	
	if      (offType23) { offType23.value = inpOff.value; }
	else if (offType22) { offType22.value = inpOff.value; }
	else if (offType21) { offType21.value = inpOff.value; }
	
	event.preventDefault();
}

function inpDefKeyUp(event) {

	/* quantity[24] to quantity[31] - Type   I - Weapon */
	
	var defType24 = document.getElementById('quantity[24]');
	var defType25 = document.getElementById('quantity[25]');
	var defType26 = document.getElementById('quantity[26]');
	var defType27 = document.getElementById('quantity[27]');
	var defType28 = document.getElementById('quantity[28]');
	var defType29 = document.getElementById('quantity[29]');
	var defType30 = document.getElementById('quantity[30]');
	var defType31 = document.getElementById('quantity[31]');
		
	if      (defType31) { defType31.value = inpDef.value; }
	else if (defType30) { defType30.value = inpDef.value; }
	else if (defType29) { defType29.value = inpDef.value; }
	else if (defType28) { defType28.value = inpDef.value; }
	else if (defType27) { defType27.value = inpDef.value; }
	else if (defType26) { defType26.value = inpDef.value; }
	else if (defType25) { defType25.value = inpDef.value; }
	else if (defType24) { defType24.value = inpDef.value; }

	/* quantity[32] to quantity[34] - Type  II - Helm */
	
	var defType32 = document.getElementById('quantity[32]');
	var defType33 = document.getElementById('quantity[33]');
	var defType34 = document.getElementById('quantity[34]');
	
	if      (defType34) { defType34.value = inpDef.value; }
	else if (defType33) { defType33.value = inpDef.value; }
	else if (defType32) { defType32.value = inpDef.value; }
	
	/* quantity[35] to quantity[37] - Type III - Armor */
	
	var defType35 = document.getElementById('quantity[35]');
	var defType36 = document.getElementById('quantity[36]');
	var defType37 = document.getElementById('quantity[37]');
	
	if      (defType37) { defType37.value = inpDef.value; }
	else if (defType36) { defType36.value = inpDef.value; }
	else if (defType35) { defType35.value = inpDef.value; }
	
	/* quantity[38] to quantity[40] - Type  IV - Boots */
	
	var defType38 = document.getElementById('quantity[38]');
	var defType39 = document.getElementById('quantity[39]');
	var defType40 = document.getElementById('quantity[40]');
	
	if      (defType40) { defType40.value = inpDef.value; }
	else if (defType39) { defType39.value = inpDef.value; }
	else if (defType38) { defType38.value = inpDef.value; }
	
	/* quantity[41] to quantity[43] - Type   V - Bracers */
	
	var defType41 = document.getElementById('quantity[41]');
	var defType42 = document.getElementById('quantity[42]');
	var defType43 = document.getElementById('quantity[43]');
	
	if      (defType43) { defType43.value = inpDef.value; }
	else if (defType42) { defType42.value = inpDef.value; }
	else if (defType41) { defType41.value = inpDef.value; }
	
	/* quantity[44] to quantity[46] - Type VII - Shield */
	
	var defType44 = document.getElementById('quantity[44]');
	var defType45 = document.getElementById('quantity[45]');
	var defType46 = document.getElementById('quantity[46]');
	
	if      (defType46) { defType46.value = inpDef.value; }
	else if (defType45) { defType45.value = inpDef.value; }
	else if (defType44) { defType44.value = inpDef.value; }
	
	event.preventDefault();
}

function inpSpOKeyUp(event) {
	document.getElementById('quantity[47]').value = inpSpO.value;
	document.getElementById('quantity[48]').value = inpSpO.value;
	document.getElementById('quantity[49]').value = inpSpO.value;
	document.getElementById('quantity[50]').value = inpSpO.value;
	event.preventDefault();
}

function inpSpDKeyUp(event) {
	document.getElementById('quantity[51]').value = inpSpD.value;
	document.getElementById('quantity[52]').value = inpSpD.value;
	document.getElementById('quantity[53]').value = inpSpD.value;
	document.getElementById('quantity[54]').value = inpSpD.value;
	event.preventDefault();
}

conOff.className += ' itemsetscon';
conDef.className += ' itemsetscon';
conSpO.className += ' itemsetscon';
conSpD.className += ' itemsetscon';

conOff.appendChild(inpOff);
conDef.appendChild(inpDef);
conSpO.appendChild(inpSpO);
conSpD.appendChild(inpSpD);

var newSS, styles= '.itemsetscon { overflow: auto; } input.itemsets { float: right; margin: 0 11px 0 0; position: relative; top: -8px; }';

	if(document.createStyleSheet) {
		document.createStyleSheet("javascript:'"+styles+"'");
	}
	else {
		newSS = document.createElement('link');
		newSS.rel='stylesheet';
		newSS.href='data:text/css,'+escape(styles);
		document.getElementsByTagName("head")[0].appendChild(newSS);
	}

inpOff.addEventListener('keyup', inpOffKeyUp, true); 
inpDef.addEventListener('keyup', inpDefKeyUp, true); 
inpSpO.addEventListener('keyup', inpSpOKeyUp, true); 
inpSpD.addEventListener('keyup', inpSpDKeyUp, true); 
