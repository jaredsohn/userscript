// ==UserScript==
// @name	Itamaram's SkillSorter
// @namespace	http://itamaram.selfip.com:8621/SkillSorter.user.js
// @description	Allows the quick thinning of drop down skill lists
// @include	http://*kingdomofloathing.com/skills.php*
// @include http://*kingdomofloathing.com/fight.php*
// @include	http://127.0.0.1:60080/skills.php*
// @include	http://127.0.0.1:60080/fight.php*
// ==/UserScript==

//Script Version: v1.2

//add a double slash infront of the line you _don't_ want to be applied
//ie, currently, the checkbox isn't use.

//var useCB = true;
var useCB = false;

var CmBox;
var cb = document.createElement('input');
cb.type = 'checkbox';
var sOps;
if(document.location.toString().indexOf('/skills.php?tiny')!=-1){
	var sels = document.body.getElementsByTagName('select');
	for(var i = 0 ; i < sels.length ; i++){		
		if (sels[i].name == "whichskill"){
			CmBox = sels[i];
			break;
		}
	}
	cb.addEventListener('click', checker, false);
	if (useCB){
		CmBox.parentNode.insertBefore(cb,CmBox);
	}
	cb.checked = GM_getValue('filter',true);
	CmBox.addEventListener('keydown',keycatcher ,false);
	var entries = CmBox.getElementsByTagName('option');
	sOps = CmBox.innerHTML;
	processEntries(entries);
}
function processEntries(entries){
	if (cb.checked){
		CmBox.innerHTML = sOps;
		for(var i = 0 ; i < entries.length; i++){
			if ( GM_getValue(entries[i].value,false)){
				entries[i].style.color = 'red';
			}
			else{
				entries[i].style.color = 'black';
			}
		}
	}
	else{
		for(var i = 0 ; i < entries.length; i++){
			if ( GM_getValue(entries[i].value,false)){
				entries[i].parentNode.removeChild(entries[i]);
				i -= 1;
			}
			else{
								
			}
		}
	}
}
if(document.location.toString().indexOf('/fight')!=-1){
	var boxes = document.getElementsByTagName('select');
	cb.addEventListener('click', checker, false);
	for (var i = 0 ; i < boxes.length ; i++){
		if( boxes[i].getAttribute('name') == 'whichskill'){
			CmBox = boxes[i];
			break;
		}
	}
	var buttons = document.getElementsByTagName('input');
	for (var i = 0 ; i < buttons.length ; i++){
		if (buttons[i].value == 'Use Skill'){
			buttons[i].parentNode.insertBefore(cb, buttons[i].nextSibling);	
		}
	}
	cb.checked = GM_getValue('CombatFilter',true);
	CmBox.addEventListener('keydown',keycatcher ,false);
	var entries = CmBox.getElementsByTagName('option');
	sOps = CmBox.innerHTML;
	processEntries(entries);
}

function checker(e){
	if(document.location.pathname.indexOf('/skills.php')==0){
		GM_setValue('filter',cb.checked)
	}
	if(document.location.pathname.indexOf('/fight')==0){
		GM_setValue('CombatFilter',cb.checked);	
	}
	processEntries(CmBox.getElementsByTagName('option'));
}

function keycatcher(e){
	if(e.keyCode == 39){
		if(!cb.checked) return;
		var temp = CmBox.getElementsByTagName('option')[CmBox.selectedIndex];
		GM_setValue(temp.value, true);
		temp.style.color = 'red';
	}
	else if (e.keyCode == 37){
		if(!cb.checked) return;
		var temp = CmBox.getElementsByTagName('option')[CmBox.selectedIndex];
		GM_setValue(temp.value,false);
		temp.style.color = 'black';
	}
	else if (e.keyCode == 32){
		cb.checked = !cb.checked;
		processEntries(CmBox.getElementsByTagName('option'));
	}
}