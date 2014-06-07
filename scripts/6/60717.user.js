// ==UserScript==
// @name	Pardus Quicklist Creator
// @namespace	PardusCreateQuicklist
// @description	Creates a Quicklist at the Ambush_view screen, so you can share your used ambush settings with others.
// @include	*.pardus.at/ambush_view.php*
// @author	Hitchhiker
// @version	1.0
// ==/UserScript== 

var inputValue;
var inputChecked = false;
var qlString = '';
var qlStringActLine = '';
var destRaid='';
var useMissiles='';
var trigger='';
var retreat='';
var diplomacyIncl='';
var factionIncl='';
var other ='';
var bountyFedIncl='';
var bountyEmpIncl='';
var bountyUniIncl='';
var bountyPrivIncl='';
var sizeExprIncl='';
var sizeIncl='';
var shipTypeIncl='';
var alliancesIncl='';
var individualsIncl='';
var diplomacyExcl='';
var factionExcl='';
var sizeExprExcl='';
var sizeExcl='';
var shipTypeExcl='';
var alliancesExcl='';
var individualsExcl='';
var attackRounds='';

var arrayInputs = document.getElementsByTagName('INPUT');
for(i=0;i<arrayInputs.length;i++)
{
	inputValue = arrayInputs[i].value;
	if(arrayInputs[i].type=='checkbox' || arrayInputs[i].type=='radio') {
		inputChecked = arrayInputs[i].checked;
		}

	if(inputValue == 'destroy' && inputChecked == true) destRaid = 'd';
	if(inputValue == 'raid' && inputChecked == true) destRaid = 'r';

	if(inputValue=='use_missiles' && inputChecked==true) useMissiles = 'm';
	if(inputValue=='attackers_trigger_ambush' && inputChecked==true) trigger = 't';
	if(inputValue=='retreat' && inputChecked==true) retreat = 'r';
	if(inputValue=='attack_foes' && inputChecked==true) diplomacyIncl+='e';
	if(inputValue=='attack_friends' && inputChecked==true) diplomacyIncl+='f';
	if(inputValue=='attack_neutrals' && inputChecked==true) diplomacyIncl+='n';
	if(inputValue=='attack_federation' && inputChecked==true) factionIncl+='f';
	if(inputValue=='attack_empire' && inputChecked==true) factionIncl+='e';
	if(inputValue=='attack_union' && inputChecked==true) factionIncl+='u';
	if(inputValue=='attack_neutral' && inputChecked==true) factionIncl+='n';
	if(inputValue=='attack_bounties_fed' && inputChecked==true) {
		bountyFedIncl='f';
		i++;
		if(arrayInputs[i].value!='') bountyFedIncl= bountyFedIncl + ':' + arrayInputs[i].value;
	}
	if(inputValue=='attack_bounties_emp' && inputChecked==true) {
		bountyEmpIncl='e';
		i++;
		if(arrayInputs[i].value!='') bountyEmpIncl= bountyEmpIncl + ':' + arrayInputs[i].value;
	}
	if(inputValue=='attack_bounties_uni' && inputChecked==true) {
		bountyUniIncl='u';
		i++;
		if(arrayInputs[i].value!='') bountyUniIncl= bountyUniIncl + ':' + arrayInputs[i].value;
	}
	if(inputValue=='attack_bounties_priv' && inputChecked==true) {
		bountyPrivIncl='n';
		i++;
		if(arrayInputs[i].value!='') bountyPrivIncl= bountyPrivIncl + ':' + arrayInputs[i].value;
	}
	if(arrayInputs[i].name=='attack_mass_value') sizeIncl = inputValue;
	if((inputValue=='0' || inputValue=='1' || inputValue=='2' || inputValue=='3'  || inputValue=='4' || inputValue=='5' || inputValue=='6') && (arrayInputs[i].name=='attack_classes[]') && (inputChecked==true)) shipTypeIncl+=inputValue;
	if(inputValue=='exclude_friends' && inputChecked==true) diplomacyExcl+='f';
	if(inputValue=='exclude_neutrals' && inputChecked==true) diplomacyExcl+='n';
	if(inputValue=='exclude_federation' && inputChecked==true) factionExcl+='f';
	if(inputValue=='exclude_empire' && inputChecked==true) factionExcl+='e';
	if(inputValue=='exclude_union' && inputChecked==true) factionExcl+='u';
	if(inputValue=='exclude_neutral' && inputChecked==true) factionExcl+='n';
	if(arrayInputs[i].name=='exclude_mass_value') sizeExcl = inputValue;
	if((inputValue=='0' || inputValue=='1' || inputValue=='2' || inputValue=='3'  || inputValue=='4' || inputValue=='5' || inputValue=='6') && (arrayInputs[i].name=='exclude_classes[]') && (inputChecked==true)) shipTypeExcl+=inputValue;
}

arrayInputs = document.getElementsByTagName('SELECT');
for(i=0;i<arrayInputs.length;i++) 
{
	var selectName=arrayInputs[i].name;
	
	if(selectName=='attack_mass' && sizeIncl != '') {
		sizeExprIncl = arrayInputs[i].options(arrayInputs[i].selectedIndex).value;
		if(sizeExprIncl=='<') sizeIncl = 'l:' + sizeIncl;
		if(sizeExprIncl=='>') sizeIncl = 'g:' + sizeIncl;
	}
	if(selectName=='exclude_mass' && sizeExcl != '') {
		sizeExprExcl = arrayInputs[i].options(arrayInputs[i].selectedIndex).value;
		if(sizeExprExcl=='<') sizeExcl = 'l:' + sizeExcl;
		if(sizeExprExcl=='>') sizeExcl = 'g:' + sizeExcl;
	}
	if(selectName=='attack_alliances') {
		for(j=0;j<arrayInputs[i].options.length;j++) {
			if(arrayInputs[i].options[j].value != 'NULL') {
				if(alliancesIncl != '') alliancesIncl += ',';
				alliancesIncl += arrayInputs[i].options[j].value;
			}
		}
		if(arrayInputs[i].options.length==1 && arrayInputs[i].options[0].value == 'NULL') alliancesIncl = '';
	}
	if(selectName=='attack_individuals') {
		for(j=0;j<arrayInputs[i].options.length;j++) {
			if(arrayInputs[i].options[j].value != 'NULL') {
				if(individualsIncl != '') individualsIncl += ',';
				individualsIncl += arrayInputs[i].options[j].value;
			}
		}
		if(arrayInputs[i].options.length==1 && arrayInputs[i].options[0].value == 'NULL') individualsIncl = '';
	}
	if(selectName=='exclude_alliances') {
		for(j=0;j<arrayInputs[i].options.length;j++) {
			if(arrayInputs[i].options[j].value != 'NULL') {
				if(alliancesExcl != '') alliancesExcl += ',';
				alliancesExcl += arrayInputs[i].options[j].value;
			}
		}
		if(arrayInputs[i].options.length==1 && arrayInputs[i].options[0].value == 'NULL') alliancesExcl = '';
	}
	if(selectName=='exclude_individuals') {
		for(j=0;j<arrayInputs[i].options.length;j++) {
			if(arrayInputs[i].options[j].value != 'NULL') {
				if(individualsExcl != '') individualsExcl += ',';
				individualsExcl += arrayInputs[i].options[j].value;
			} 
		}
		if(arrayInputs[i].options.length==1 && arrayInputs[i].options[0].value == 'NULL') individualsExcl = '';
	}
	if(selectName=='rounds') attackRounds=arrayInputs[i].options[arrayInputs[i].selectedIndex].value;
}

var s = ';'
qlString = destRaid + s + useMissiles + s + trigger + s + retreat + s + diplomacyIncl + s + factionIncl + s + other + s + bountyFedIncl + s + bountyEmpIncl + s + bountyUniIncl + s + bountyPrivIncl + s + sizeIncl + s + shipTypeIncl + s
qlStringActLine = qlString;
if(qlString.length + alliancesIncl.length > 110) {
	qlString = qlString + '<br>'; 
	qlStringActLine = '';
}
qlString = qlString + alliancesIncl + s;
qlStringActLine = qlStringActLine + alliancesIncl + s;

if(qlStringActLine.length + individualsIncl.length > 110) {
	qlString = qlString + '<br>';
	qlStringActLine = '';
}
qlString = qlString + individualsIncl + s + diplomacyExcl + s+ factionExcl + s + sizeExcl + s + shipTypeExcl + s;
qlStringActLine = qlStringActLine + individualsIncl + s + diplomacyExcl + s+ factionExcl + s + sizeExcl + s + shipTypeExcl + s;
if(qlStringActLine.length + alliancesExcl.length > 110) {
	qlString = qlString + '<br>';
	qlStringActLine = '';
}
qlString = qlString + alliancesExcl + s 
if(qlStringActLine.length + individualsExcl.length > 110) {
	qlString = qlString + '<br>';
        qlStringActLine = '';
}
qlString = qlString + individualsExcl + s + attackRounds; 
var qlElement = document.createElement("div");
qlElement.innerHTML = "<p style='font-size:1.2em; font-weight:bold;' align=center>Quicklist</p><p align=center>" + qlString + "</p>";
t = document.getElementsByTagName('FORM');
t[0].parentNode.insertBefore(qlElement, t[0]);
