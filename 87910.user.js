// ==UserScript==
// @name           Compare Designs
// @namespace      http://www.war-facts.com/message.php?player=9972
// @include        http://www.war-facts.com/ship_designs.php*
// ==/UserScript==

//VARIABLES

var designTable = document.getElementsByTagName('table')[0];
var newDesign = "";
var oldDesign = "";

// FUNCTION

function saveDesign() {

}

function addDesign() {
	oldDesign = GM_getValue('design',0);
	GM_setValue('design',designTable.innerHTML);
	newDesign = designTable.innerHTML;

	if (oldDesign) {
		compareDesigns(newDesign,oldDesign);

		designTable.innerHTML = "";
		var newTr = document.createElement('tr');
		var newTd = document.createElement('td');
		var newTd2 = document.createElement('td');
		var newTable = document.createElement('table');
		newTable.innerHTML = newDesign;
		var oldTable = document.createElement('table');
		oldTable.innerHTML = oldDesign;

		designTable.insertBefore(newTr, designTable.firstChild);
		newTr.insertBefore(newTd, newTr.firstChild);
		newTr.insertBefore(newTd2, newTr.firstChild.nextSibling);
		newTd.insertBefore(newTable, newTd.firstChild);
		newTd2.insertBefore(oldTable, newTd2.firstChild);
	}
}

function clearDesign() {
	GM_deleteValue('design');
}

function compareDesigns(a,b) {
	a = clearCommas(a);
	b = clearCommas(b);

	var itA = a.indexOf("Cruise Speed");
	var itB = b.indexOf("Cruise Speed");
	var designA;
	var designB;
	var tValueA = 0;
	var tValueB = 0;

	if ( itA != -1 && itB != -1) {

//(guns * gunsdamage * gunrate + cannons * cannonsdamage * cannonrate) 
// * ((mass + armor + (shield * 2)-speed/10))

//Cruise Speed:
		designA = parseInt(a.slice(itA+22));
		designB = parseInt(b.slice(itB+22));
		var tempA = designA/-10;
		var tempB = designB/-10;

		if ( designA < designB ) {
			a = a.replace('Cruise Speed:</td><td>','Cruise Speed:</td><td><font color=#FF0000>');
			a = a.replace('</td><td class="strong">Range','</font></td><td class="strong">Range');
			b = b.replace('Cruise Speed:</td><td>','Cruise Speed:</td><td><font color=#00FF00>');
			b = b.replace('</td><td class="strong">Range','</font></td><td class="strong">Range');
		}
		else if ( designA > designB ) {
			a = a.replace('Cruise Speed:</td><td>','Cruise Speed:</td><td><font color=#00FF00>');
			a = a.replace('</td><td class="strong">Range','</font></td><td class="strong">Range');
			b = b.replace('Cruise Speed:</td><td>','Cruise Speed:</td><td><font color=#FF0000>');
			b = b.replace('</td><td class="strong">Range','</font></td><td class="strong">Range');
		}

//Range:
		itA = a.indexOf("Range:");
		itB = b.indexOf("Range:");
		designA = parseInt(a.slice(itA+15));
		designB = parseInt(b.slice(itB+15));

		if ( designA < designB ) {
			a = a.replace('Range:</td><td>','Range:</td><td><font color=#FF0000>');
			a = a.replace('</td></tr><tr><td class="strong">Trav','</font></td></tr><tr><td class="strong">Trav');
			b = b.replace('Range:</td><td>','Range:</td><td><font color=#00FF00>');
			b = b.replace('</td></tr><tr><td class="strong">Trav','</font></td></tr><tr><td class="strong">Trav');
		}
		else if ( designA > designB ) {
			a = a.replace('Range:</td><td>','Range:</td><td><font color=#00FF00>');
			a = a.replace('</td></tr><tr><td class="strong">Trav','</font></td></tr><tr><td class="strong">Trav');
			b = b.replace('Range:</td><td>','Range:</td><td><font color=#FF0000>');
			b = b.replace('</td></tr><tr><td class="strong">Trav','</font></td></tr><tr><td class="strong">Trav');
		}
//Mass
		itA = a.indexOf("Mass:");
		itB = b.indexOf("Mass:");
		designA = parseInt(a.slice(itA+15));
		designB = parseInt(b.slice(itB+15));
		tempA = tempA + designA;
		tempB = tempB + designB;
//Guns
		itA = a.indexOf("Gun Type");
		itB = b.indexOf("Gun Type");
		if (itA != -1 && itB != -1) {
			itA = a.indexOf("l Strike:</td><td>");
			itB = b.indexOf("l Strike:</td><td>");
			designA = parseInt(a.slice(itA+18));
			designB = parseInt(b.slice(itB+18));
			tValueA = designA;
			tValueB = designB;
			if ( designA < designB ) {
				a = a.replace('l Strike:</td><td>','l Strike: </td><td><font color=#FF0000>');
				a = a.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
				b = b.replace('l Strike:</td><td>','l Strike: </td><td><font color=#00FF00>');
				b = b.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
			}
			else if ( designA > designB ) {
				a = a.replace('l Strike:</td><td>','l Strike: </td><td><font color=#00FF00>');
				a = a.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
				b = b.replace('l Strike:</td><td>','l Strike: </td><td><font color=#FF0000>');
				b = b.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
			}
		}

//Cannons 
		itA = a.indexOf("Cannon Type");
		itB = b.indexOf("Cannon Type");
		if (itA != -1 && itB != -1) {
			itA = a.indexOf("l Strike:</td><td>");
			itB = b.indexOf("l Strike:</td><td>");
			designA = parseInt(a.slice(itA+18));
			designB = parseInt(b.slice(itB+18));
			tValueA = tValueA + designA;
			tValueB = tValueB + designB;

			if ( designA < designB ) {
				a = a.replace('l Strike:</td><td>','l Strike: </td><td><font color=#FF0000>');
				a = a.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
				b = b.replace('l Strike:</td><td>','l Strike: </td><td><font color=#00FF00>');
				b = b.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
			}
			else if ( designA > designB ) {
				a = a.replace('l Strike:</td><td>','l Strike: </td><td><font color=#00FF00>');
				a = a.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
				b = b.replace('l Strike:</td><td>','l Strike: </td><td><font color=#FF0000>');
				b = b.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
			}
		}

//Battery 
		itA = a.indexOf("rstrike:");
		itB = b.indexOf("rstrike:");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+17));
			designB = parseInt(b.slice(itB+17));

			if ( designA < designB ) {
				a = a.replace('rstrike:</td><td>','rstrike:</td><td><font color=#FF0000>');
				a = a.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
				b = b.replace('rstrike:</td><td>','rstrike:</td><td><font color=#00FF00>');
				b = b.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
			}
			else if ( designA > designB ) {
				a = a.replace('rstrike:</td><td>','rstrike:</td><td><font color=#00FF00>');
				a = a.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
				b = b.replace('rstrike:</td><td>','rstrike:</td><td><font color=#FF0000>');
				b = b.replace('kilotons</td><td>&nbsp;','kilotons</font></td><td>&nbsp;');
			}
		}

//Shields
		itA = a.indexOf(">Shield:");
		itB = b.indexOf(">Shield:");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+18));
			designB = parseInt(b.slice(itB+18));
			tempA = tempA + designA*2;
			tempB = tempB + designB*2;
		}

		itA = a.indexOf("Shielding:");
		itB = b.indexOf("Shielding:");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+19));
			designB = parseInt(b.slice(itB+19));
			tempA = tempA + designA*2;
			tempB = tempB + designB*2;

			if ( designA < designB ) {
				a = a.replace('Shielding:</td><td>','Shielding:</td><td><font color=#FF0000>');
				a = a.replace('</td><td class="strong">Effective A','</font></td><td class="strong">Effective A');
				b = b.replace('Shielding:</td><td>','Shielding:</td><td><font color=#00FF00>');
				b = b.replace('</td><td class="strong">Effective A','</font></td><td class="strong">Effective A');
			}
			else if ( designA > designB ) {
				a = a.replace('Shielding:</td><td>','Shielding:</td><td><font color=#00FF00>');
				a = a.replace('</td><td class="strong">Effective A','</font></td><td class="strong">Effective A');
				b = b.replace('Shielding:</td><td>','Shielding:</td><td><font color=#FF0000>');
				b = b.replace('</td><td class="strong">Effective A','</font></td><td class="strong">Effective A');
			}
		}

//Armor

		itA = a.indexOf(">Armor:");
		itB = b.indexOf(">Armor:");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+17));
			designB = parseInt(b.slice(itB+17));
			tempA = tempA + designA;
			tempB = tempB + designB;
		}

		itA = a.indexOf("e Armor:");
		itB = b.indexOf("e Armor:");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+17));
			designB = parseInt(b.slice(itB+17));


			if(a.indexOf('kilotons</td></tr><tr><td class="head">Cost') != -1 
			&& b.indexOf('kilotons</td></tr><tr><td class="head">Cost') != -1) {
				if ( designA < designB ) {
					a = a.replace('e Armor:</td><td>','e Armor:</td><td><font color=#FF0000>');
					a = a.replace('</td></tr><tr><td class="head">Cost','</font></td></tr><tr><td class="head">Cost');
					b = b.replace('e Armor:</td><td>','e Armor:</td><td><font color=#00FF00>');
					b = b.replace('</td></tr><tr><td class="head">Cost','</font></td></tr><tr><td class="head">Cost');
				}
				else if ( designA > designB ) {
					a = a.replace('e Armor:</td><td>','e Armor:</td><td><font color=#00FF00>');
					a = a.replace('</td></tr><tr><td class="head">Cost','</font></td></tr><tr><td class="head">Cost');
					b = b.replace('e Armor:</td><td>','e Armor:</td><td><font color=#FF0000>');
					b = b.replace('</td></tr><tr><td class="head">Cost','</font></td></tr><tr><td class="head">Cost');
				}
			}
		}

//Transport Capacity:
		itA = a.indexOf("t Capacity");
		itB = b.indexOf("t Capacity");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+33));
			designB = parseInt(b.slice(itB+33));

			if ( designA < designB ) {
				a = a.replace('t Capacity:</td><td class="head">','t Capacity:</td><td class="head"><font color=#FF0000>');
				a = a.replace('</td><td class="head">Col','</font></td><td class="head">Col');
				b = b.replace('t Capacity:</td><td class="head">','t Capacity:</td><td class="head"><font color=#00FF00>');
				b = b.replace('</td><td class="head">Col','</font></td><td class="head">Col');
			}
			else if ( designA > designB ) {
				a = a.replace('t Capacity:</td><td class="head">','t Capacity:</td><td class="head"><font color=#00FF00>');
				a = a.replace('</td><td class="head">Col','</font></td><td class="head">Col');
				b = b.replace('t Capacity:</td><td class="head">','t Capacity:</td><td class="head"><font color=#FF0000>');
				b = b.replace('</td><td class="head">Col','</font></td><td class="head">Col');
			}
		}

//Colonists Capacity:
		itA = a.indexOf("s Capacity");
		itB = b.indexOf("s Capacity");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+33));
			designB = parseInt(b.slice(itB+33));

			if ( designA < designB ) {
				a = a.replace('s Capacity:</td><td class="head">','s Capacity:</td><td class="head"><font color=#FF0000>');
				a = a.replace('</td></tr><tr><td class="head">Fig','</font></td></tr><tr><td class="head">Fig');
				b = b.replace('s Capacity:</td><td class="head">','s Capacity:</td><td class="head"><font color=#00FF00>');
				b = b.replace('</td></tr><tr><td class="head">Fig','</font></td></tr><tr><td class="head">Fig');
			}
			else if ( designA > designB ) {
				a = a.replace('s Capacity:</td><td class="head">','s Capacity:</td><td class="head"><font color=#00FF00>');
				a = a.replace('</td></tr><tr><td class="head">Fig','</font></td></tr><tr><td class="head">Fig');
				b = b.replace('s Capacity:</td><td class="head">','s Capacity:</td><td class="head"><font color=#FF0000>');
				b = b.replace('</td></tr><tr><td class="head">Fig','</font></td></tr><tr><td class="head">Fig');
			}
		}

//Fighter Capacity:
		itA = a.indexOf("r Capacity");
		itB = b.indexOf("r Capacity");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+33));
			designB = parseInt(b.slice(itB+33));

			if ( designA < designB ) {
				a = a.replace('r Capacity:</td><td class="head">','r Capacity:</td><td class="head"><font color=#FF0000>');
				a = a.replace('</td><td class="head">Scan','</font></td><td class="head">Scan');
				b = b.replace('r Capacity:</td><td class="head">','r Capacity:</td><td class="head"><font color=#00FF00>');
				b = b.replace('</td><td class="head">Scan','</font></td><td class="head">Scan');
			}
			else if ( designA > designB ) {
				a = a.replace('r Capacity:</td><td class="head">','r Capacity:</td><td class="head"><font color=#00FF00>');
				a = a.replace('</td><td class="head">Scan','</font></td><td class="head">Scan');
				b = b.replace('r Capacity:</td><td class="head">','r Capacity:</td><td class="head"><font color=#FF0000>');
				b = b.replace('</td><td class="head">Scan','</font></td><td class="head">Scan');
			}
		}

//Scanner Level:
		itA = a.indexOf("r Level");
		itB = b.indexOf("r Level");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+30));
			designB = parseInt(b.slice(itB+30));

			if ( designA < designB ) {
				a = a.replace('r Level:</td><td class="head">','r Level:</td><td class="head"><font color=#FF0000>');
				a = a.replace('</td></tr><tr><td class="head">Cost','</font></td></tr><tr><td class="head">Cost');
				b = b.replace('r Level:</td><td class="head">','r Level:</td><td class="head"><font color=#00FF00>');
				b = b.replace('</td></tr><tr><td class="head">Cost','</font></td></tr><tr><td class="head">Cost');
			}
			else if ( designA > designB ) {
				a = a.replace('r Level:</td><td class="head">','r Level:</td><td class="head"><font color=#00FF00>');
				a = a.replace('</td></tr><tr><td class="head">Cost','</font></td></tr><tr><td class="head">Cost');
				b = b.replace('r Level:</td><td class="head">','r Level:</td><td class="head"><font color=#FF0000>');
				b = b.replace('</td></tr><tr><td class="head">Cost','</font></td></tr><tr><td class="head">Cost');
			}
		}

//Cost & tValue
		itA = a.indexOf("Cost:");
		itB = b.indexOf("Cost:");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+27));
			designB = parseInt(b.slice(itB+27));
			tValueA = Math.round(tValueA*tempA*1000)/1000;
			tValueB = Math.round(tValueB*tempB*1000)/1000;

			if ( designA > designB ) {
				a = a.replace('Cost:</td><td class="head">','Cost:</td><td class="head"><font color=#FF0000>');
				//a = a.replace('</td><td class="head" valign="middle">&nbsp;','</font></td><td class="head" valign="middle">Target Value: '+tValueA);
				b = b.replace('Cost:</td><td class="head">','Cost:</td><td class="head"><font color=#00FF00>');
				//b = b.replace('</td><td class="head" valign="middle">&nbsp;','</font></td><td class="head" valign="middle">Target Value: '+tValueB);
			}
			else if ( designA < designB ) {
				a = a.replace('Cost:</td><td class="head">','Cost:</td><td class="head"><font color=#00FF00>');
				//a = a.replace('</td><td class="head" valign="middle">&nbsp;','</font></td><td class="head" valign="middle">Target Value: '+tValueA);
				b = b.replace('Cost:</td><td class="head">','Cost:</td><td class="head"><font color=#FF0000>');
				//b = b.replace('</td><td class="head" valign="middle">&nbsp;','</font></td><td class="head" valign="middle">Target Value: '+tValueB);
			}
		}

//Resources...
		itA = a.indexOf("Iron<");
		itB = b.indexOf("Iron<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+13));
			designB = parseInt(b.slice(itB+13));

			if ( designA > designB ) {
				a = a.replace('Iron</td><td>','Iron</td><td><font color=#FF0000>');
				a = a.replace('</td><td class="strong">Cop','</font></td><td class="strong">Cop');
				b = b.replace('Iron</td><td>','Iron</td><td><font color=#00FF00>');
				b = b.replace('</td><td class="strong">Cop','</font></td><td class="strong">Cop');
			}
			else if ( designA < designB ) {
				a = a.replace('Iron</td><td>','Iron</td><td><font color=#00FF00>');
				a = a.replace('</td><td class="strong">Cop','</font></td><td class="strong">Cop');
				b = b.replace('Iron</td><td>','Iron</td><td><font color=#FF0000>');
				b = b.replace('</td><td class="strong">Cop','</font></td><td class="strong">Cop');
			}
		}

		itA = a.indexOf("Copper<");
		itB = b.indexOf("Copper<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+15));
			designB = parseInt(b.slice(itB+15));

			if ( designA > designB ) {
				a = a.replace('Copper</td><td>','Copper</td><td><font color=#FF0000>');
				a = a.replace('</td></tr><tr><td class="strong">Sil','</font></td></tr><tr><td class="strong">Sil');
				b = b.replace('Copper</td><td>','Copper</td><td><font color=#00FF00>');
				b = b.replace('</td></tr><tr><td class="strong">Sil','</font></td></tr><tr><td class="strong">Sil');
			}
			else if ( designA < designB ) {
				a = a.replace('Copper</td><td>','Copper</td><td><font color=#00FF00>');
				a = a.replace('</td></tr><tr><td class="strong">Sil','</font></td></tr><tr><td class="strong">Sil');
				b = b.replace('Copper</td><td>','Copper</td><td><font color=#FF0000>');
				b = b.replace('</td></tr><tr><td class="strong">Sil','</font></td></tr><tr><td class="strong">Sil');
			}
		}

		itA = a.indexOf("Silver<");
		itB = b.indexOf("Silver<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+15));
			designB = parseInt(b.slice(itB+15));

			if ( designA > designB ) {
				a = a.replace('Silver</td><td>','Silver</td><td><font color=#FF0000>');
				a = a.replace('</td><td class="strong">Tit','</font></td><td class="strong">Tit');
				b = b.replace('Silver</td><td>','Silver</td><td><font color=#00FF00>');
				b = b.replace('</td><td class="strong">Tit','</font></td><td class="strong">Tit');
			}
			else if ( designA < designB ) {
				a = a.replace('Silver</td><td>','Silver</td><td><font color=#00FF00>');
				a = a.replace('</td><td class="strong">Tit','</font></td><td class="strong">Tit');
				b = b.replace('Silver</td><td>','Silver</td><td><font color=#FF0000>');
				b = b.replace('</td><td class="strong">Tit','</font></td><td class="strong">Tit');
			}
		}

		itA = a.indexOf("Titanium<");
		itB = b.indexOf("Titanium<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+17));
			designB = parseInt(b.slice(itB+17));

			if ( designA > designB ) {
				a = a.replace('Titanium</td><td>','Titanium</td><td><font color=#FF0000>');
				a = a.replace('</td></tr><tr><td class="strong">Gold','</font></td></tr><tr><td class="strong">Gold');
				b = b.replace('Titanium</td><td>','Titanium</td><td><font color=#00FF00>');
				b = b.replace('</td></tr><tr><td class="strong">Gold','</font></td></tr><tr><td class="strong">Gold');
			}
			else if ( designA < designB ) {
				a = a.replace('Titanium</td><td>','Titanium</td><td><font color=#00FF00>');
				a = a.replace('</td></tr><tr><td class="strong">Gold','</font></td></tr><tr><td class="strong">Gold');
				b = b.replace('Titanium</td><td>','Titanium</td><td><font color=#FF0000>');
				b = b.replace('</td></tr><tr><td class="strong">Gold','</font></td></tr><tr><td class="strong">Gold');
			}
		}

		itA = a.indexOf("Gold<");
		itB = b.indexOf("Gold<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+13));
			designB = parseInt(b.slice(itB+13));

			if ( designA > designB ) {
				a = a.replace('Gold</td><td>','Gold</td><td><font color=#FF0000>');
				a = a.replace('</td><td class="strong">Ura','</font></td><td class="strong">Ura');
				b = b.replace('Gold</td><td>','Gold</td><td><font color=#00FF00>');
				b = b.replace('</td><td class="strong">Ura','</font></td><td class="strong">Ura');
			}
			else if ( designA < designB ) {
				a = a.replace('Gold</td><td>','Gold</td><td><font color=#00FF00>');
				a = a.replace('</td><td class="strong">Ura','</font></td><td class="strong">Ura');
				b = b.replace('Gold</td><td>','Gold</td><td><font color=#FF0000>');
				b = b.replace('</td><td class="strong">Ura','</font></td><td class="strong">Ura');
			}
		}

		itA = a.indexOf("Uranium<");
		itB = b.indexOf("Uranium<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+16));
			designB = parseInt(b.slice(itB+16));

			if ( designA > designB ) {
				a = a.replace('Uranium</td><td>','Uranium</td><td><font color=#FF0000>');
				a = a.replace('</td></tr><tr><td class="strong">Plat','</font></td></tr><tr><td class="strong">Plat');
				b = b.replace('Uranium</td><td>','Uranium</td><td><font color=#00FF00>');
				b = b.replace('</td></tr><tr><td class="strong">Plat','</font></td></tr><tr><td class="strong">Plat');
			}
			else if ( designA < designB ) {
				a = a.replace('Uranium</td><td>','Uranium</td><td><font color=#00FF00>');
				a = a.replace('</td></tr><tr><td class="strong">Plat','</font></td></tr><tr><td class="strong">Plat');
				b = b.replace('Uranium</td><td>','Uranium</td><td><font color=#FF0000>');
				b = b.replace('</td></tr><tr><td class="strong">Plat','</font></td></tr><tr><td class="strong">Plat');
			}
		}

		itA = a.indexOf("Platinum<");
		itB = b.indexOf("Platinum<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+17));
			designB = parseInt(b.slice(itB+17));

			if ( designA > designB ) {
				a = a.replace('Platinum</td><td>','Platinum</td><td><font color=#FF0000>');
				a = a.replace('</td><td class="strong">Dia','</font></td><td class="strong">Dia');
				b = b.replace('Platinum</td><td>','Platinum</td><td><font color=#00FF00>');
				b = b.replace('</td><td class="strong">Dia','</font></td><td class="strong">Dia');
			}
			else if ( designA < designB ) {
				a = a.replace('Platinum</td><td>','Platinum</td><td><font color=#00FF00>');
				a = a.replace('</td><td class="strong">Dia','</font></td><td class="strong">Dia');
				b = b.replace('Platinum</td><td>','Platinum</td><td><font color=#FF0000>');
				b = b.replace('</td><td class="strong">Dia','</font></td><td class="strong">Dia');
			}
		}

		itA = a.indexOf("Diamonds<");
		itB = b.indexOf("Diamonds<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+17));
			designB = parseInt(b.slice(itB+17));

			if ( designA > designB ) {
				a = a.replace('Diamonds</td><td>','Diamonds</td><td><font color=#FF0000>');
				a = a.replace('</td></tr><tr><td class="strong">Oil','</font></td></tr><tr><td class="strong">Oil');
				b = b.replace('Diamonds</td><td>','Diamonds</td><td><font color=#00FF00>');
				b = b.replace('</td></tr><tr><td class="strong">Oil','</font></td></tr><tr><td class="strong">Oil');
			}
			else if ( designA < designB ) {
				a = a.replace('Diamonds</td><td>','Diamonds</td><td><font color=#00FF00>');
				a = a.replace('</td></tr><tr><td class="strong">Oil','</font></td></tr><tr><td class="strong">Oil');
				b = b.replace('Diamonds</td><td>','Diamonds</td><td><font color=#FF0000>');
				b = b.replace('</td></tr><tr><td class="strong">Oil','</font></td></tr><tr><td class="strong">Oil');
			}
		}

		itA = a.indexOf("Oil<");
		itB = b.indexOf("Oil<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+12));
			designB = parseInt(b.slice(itB+12));

			if ( designA > designB ) {
				a = a.replace('Oil</td><td>','Oil</td><td><font color=#FF0000>');
				a = a.replace('</td><td class="strong">Wat','</font></td><td class="strong">Wat');
				b = b.replace('Oil</td><td>','Oil</td><td><font color=#00FF00>');
				b = b.replace('</td><td class="strong">Wat','</font></td><td class="strong">Wat');
			}
			else if ( designA < designB ) {
				a = a.replace('Oil</td><td>','Oil</td><td><font color=#00FF00>');
				a = a.replace('</td><td class="strong">Wat','</font></td><td class="strong">Wat');
				b = b.replace('Oil</td><td>','Oil</td><td><font color=#FF0000>');
				b = b.replace('</td><td class="strong">Wat','</font></td><td class="strong">Wat');
			}
		}

		itA = a.indexOf("Water<");
		itB = b.indexOf("Water<");
		if (itA != -1 && itB != -1) {
			designA = parseInt(a.slice(itA+14));
			designB = parseInt(b.slice(itB+14));

			if ( designA > designB ) {
				a = a.replace('Water</td><td>','Water</td><td><font color=#FF0000>');
				a = a.replace('</td></tr></tb','</font></td></tr></tb');
				b = b.replace('Water</td><td>','Water</td><td><font color=#00FF00>');
				b = b.replace('</td></tr></tb','</font></td></tr></tb');
			}
			else if ( designA < designB ) {
				a = a.replace('Water</td><td>','Water</td><td><font color=#00FF00>');
				a = a.replace('</td></tr></tb','</font></td></tr></tb');
				b = b.replace('Water</td><td>','Water</td><td><font color=#FF0000>');
				b = b.replace('</td></tr></tb','</font></td></tr></tb');
			}
		}

		newDesign = a;
		oldDesign = b;
	}
}

function clearCommas(text){
	while( text.indexOf(",") != -1) { text = text.replace(",", ""); }
	return text;
}



// MAIN

if (designTable.innerHTML.indexOf("Create new ship class") == -1 ) {
	addDesign();

}
else {
	//clearDesign();
}
