// WoD-Lager-Checkboxen user script
// version 0.3.2 BETA!
// 2006-01-25
// Copyright (c) 2005-6, Daniel Hohenberger
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.4 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "WoD-Lager-Checkboxen", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WoD-Lager-Checkboxen
// @namespace     http://hd42.de/wod
// @description   Fuegt in Lager, Keller, Schatzkammer und Gruppenlager praktische Checkboxen zum Verschieben der Items hinzu. || Adds useful checkboxes to your equipment pages to faster move your items
// @include         http*://*world-of-dungeons.*/wod/spiel/hero/items.php*
// ==/UserScript==
  
var lang = 'de';
if(location.host.search('world-of-dungeons.net') != -1) lang = 'en';

var allSelects, allInputs, thisSelect, thisType='', sentOptions; 
sentOptions=Array();
allSelects = document.getElementsByTagName('select');
allInputs = document.getElementsByTagName('input');

var found = false;
for (var i = 0; i < allSelects.length; i++) {
    thisSelect = allSelects[i];
    
    if(thisSelect.name.indexOf('sentto')!=-1 || thisSelect.name.indexOf('sndgrp')!=-1){
    	if(!found){
	    	for(n=1; n<thisSelect.length; n++){
	    		sentOptions[n]=Array();
	    		sentOptions[n]['value']=thisSelect.options[n].value;
	    		sentOptions[n]['text']=thisSelect.options[n].text;
	    	}
	    	found = true;
	    }
	    newInput = document.createElement('input');
	    newInput.setAttribute('type', 'checkbox');
	    newInput.setAttribute('name', 'do'+thisSelect.name);
	    newInput.setAttribute('value', 'do');
	    thisSelect.parentNode.insertBefore(newInput, thisSelect.nextSibling);
	    thisSelect.parentNode.style.whiteSpace = 'nowrap';
	}
}
	    
for (var i = 0; i < allSelects.length; i++) {
    thisSelect = allSelects[i];
    //GM_log(thisSelect.options[thisSelect.selectedIndex].text);
    if(thisSelect.name.indexOf('EquipItem')!=-1
    		&& thisSelect.getElementsByTagName('option').length > 3
    		&& (thisSelect.options[thisSelect.selectedIndex].text == "Lager"
    		|| thisSelect.options[thisSelect.selectedIndex].text == "Keller"
    		|| thisSelect.options[thisSelect.selectedIndex].text == "Schatzkammer"
    		|| thisSelect.options[thisSelect.selectedIndex].text == "Gruppenlager"
    		|| thisSelect.options[thisSelect.selectedIndex].text == "storage"
    		|| thisSelect.options[thisSelect.selectedIndex].text == "group storage"
    		|| thisSelect.options[thisSelect.selectedIndex].text == "treasure vault"
    		|| thisSelect.options[thisSelect.selectedIndex].text == "cellar")
    	){
	    
	    if(thisType==''){
	    	for(n=0; n<thisSelect.length; n++){
	    		if(thisSelect.options[n].hasAttribute('selected')){
	    			thisType=thisSelect.options[n].text;
	    		}
	    	}
	    }
	    newInput = document.createElement('input');
	    newInput.setAttribute('type', 'checkbox');
	    newInput.setAttribute('name', 'do'+thisSelect.name);
	    newInput.setAttribute('value', 'do');
	    thisSelect.parentNode.insertBefore(newInput, thisSelect.nextSibling);
	    thisSelect.parentNode.style.whiteSpace = 'nowrap';
	}
	
	
}

function setAll(event) {
	//var allSelects, thisSelect, val;	
	//allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
	    thisSelect = allSelects[i];
	    if(thisSelect.id.indexOf('doAll')!=-1 && thisSelect.selectedIndex!=0){
	    	val = thisSelect.options[thisSelect.selectedIndex].value;
		}
	}
	var allToDo = Array();	
  //var allInputs = document.getElementsByTagName('input');
	for (var j = 0; j < allInputs.length; j++) {
		thisDo = allInputs[j];
		if(thisDo.type=='checkbox' && thisDo.name.indexOf('doEquipItem')!=-1){
			allToDo[thisDo.name] = thisDo.checked;
			thisDo.checked = false;
		}
	}
    
	//allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
	    thisSelect = allSelects[i];
	    //thisSelect.length > 3 um nicht handelbare Sachen wie Orden abzufangen
	    if(thisSelect.name.indexOf('EquipItem')!=-1 && thisSelect.length > 3){
			if(allToDo['do'+thisSelect.name]){
		    	for(n=0; n<thisSelect.length; n++){
		    		if(thisSelect.options[n].value==val){
		    			thisSelect.selectedIndex=n;
		    		}
		    	}
			}
		    
		}
	    if(thisSelect.id.indexOf('doAll')!=-1){
	    	thisSelect.selectedIndex=0;
		}
	}
	event.preventDefault();
}

function selectSetAll(event) {
	//var allSelects, thisSelect;
	var allToDo = Array();	
    //var allInputs = document.getElementsByTagName('input');
    var selectOption = 0;
    var check = false;
    
    //da hat wer rumgeclickt. Müssen wir was tun?
	//allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
	    thisSelect = allSelects[i];
	    if(thisSelect.id.indexOf('goChoice')!=-1){
	    	if(thisSelect.selectedIndex > 0) selectOption = thisSelect.selectedIndex;
		}
	}
	if(selectOption==1) check = true;
	
	if(selectOption>0){
		for (var j = 0; j < allInputs.length; j++) {
			thisDo = allInputs[j];
			if(thisDo.type=='checkbox' && thisDo.name.indexOf('doEquipItem')!=-1){
				thisDo.checked = check;
			}
		}
	}
    
	//allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
	    thisSelect = allSelects[i];
	    
	    if(thisSelect.id.indexOf('goChoice')!=-1){
	    	thisSelect.selectedIndex=0;
		}
	}
	event.preventDefault();
}
function sendAll(event) {
	var thisSelect, val; //, allSelects;	
	//allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
	    thisSelect = allSelects[i];
	    if(thisSelect.id.indexOf('sendAll')!=-1 && thisSelect.selectedIndex!=0){
	    	val = thisSelect.options[thisSelect.selectedIndex].value;
		}
	}
	var allToDo = Array();	
  //var allInputs = document.getElementsByTagName('input');
	for (var j = 0; j < allInputs.length; j++) {
		thisDo = allInputs[j];
		if(thisDo.type=='checkbox' && (thisDo.name.indexOf('dosentto')!=-1 || thisDo.name.indexOf('dosndgrp')!=-1)){
			allToDo[thisDo.name] = thisDo.checked;
			thisDo.checked = false;
		}
	}
    
	//allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
	    thisSelect = allSelects[i];
	    
	    if(thisSelect.name.indexOf('sentto')!=-1 || thisSelect.name.indexOf('sndgrp')!=-1){
			if(allToDo['do'+thisSelect.name]){
		    	for(n=0; n<thisSelect.length; n++){
		    		if(thisSelect.options[n].getAttribute('value')==val){
		    			thisSelect.selectedIndex=n;
		    		}
		    	}
			}
		    
		}
	    if(thisSelect.id.indexOf('sendAll')!=-1){
	    	thisSelect.selectedIndex=0;
		}
	}
	event.preventDefault();
}
function selectSendAll(event) {
	var thisSelect; //, allSelects;
    //var allInputs = document.getElementsByTagName('input');
    var selectOption = 0;
    var check = false;
    
    //da hat wer rumgeclickt. Mssen wir was tun?
	//allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
	    thisSelect = allSelects[i];
	    if(thisSelect.id.indexOf('sendChoice')!=-1){
	    	if(thisSelect.selectedIndex > 0) selectOption = thisSelect.selectedIndex;
		}
	}
	if(selectOption==1) check = true;
	
	if(selectOption>0){
		for (var j = 0; j < allInputs.length; j++) {
			thisDo = allInputs[j];
			if(thisDo.type=='checkbox' && (thisDo.name.indexOf('dosentto')!=-1 || thisDo.name.indexOf('dosndgrp')!=-1)){
				thisDo.checked = check;
			}
		}
	}
    
	//allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
	    thisSelect = allSelects[i];
	    
	    if(thisSelect.id.indexOf('sendChoice')!=-1){
	    	thisSelect.selectedIndex=0;
		}
	}
	event.preventDefault();
}

for (var j = 0; j < allInputs.length; j++) {
	thisButton = allInputs[j];
	if(thisButton.getAttribute('name')=='checknone'){
		
		if(sentOptions.length>0){	
		    newSend = document.createElement('select');
		    newSend.setAttribute('class', '');
		    newSend.setAttribute('id', 'sendAll'+j);
		    newSend.setAttribute('name', 'sendAll'+j);
		    //newSend.setAttribute('onchange', 'sendAll(document.getElementById("sendAll'+j+'").value);');
      		newSend.addEventListener('change', sendAll, true);
		    newSend.appendChild(document.createElement('option'));
		    for(var n = 1; n < sentOptions.length; n++){
		    	newOption = document.createElement('option');
		    	newOption.value = sentOptions[n]['value'];
		    	newOption.appendChild(document.createTextNode(sentOptions[n]['text']));
		    	newSend.appendChild(newOption);
		    }
		    thisButton.parentNode.insertBefore(newSend, thisButton.nextSibling);
		    if(lang=='de') thisButton.parentNode.insertBefore(document.createTextNode(' uebergeben an:'), thisButton.nextSibling);
				else if(lang=='en') thisButton.parentNode.insertBefore(document.createTextNode(' to:'), thisButton.nextSibling);
		    sendChoice = document.createElement('select');
		    sendChoice.setAttribute('id', 'sendChoice'+j);
	    	//sendChoice.setAttribute('onchange', 'selectSendAll(document.getElementById("sendChoice'+j+'").value);');
      		sendChoice.addEventListener('change', selectSendAll, true);
	    	sendChoiceSelected = document.createElement('option');
	    	sendChoiceSelected.value = 'selected';
	    	if(lang=='de') sendChoiceSelected.appendChild(document.createTextNode('Markierte'));
	    	else if(lang=='en') sendChoiceSelected.appendChild(document.createTextNode('marked'));
	    	sendChoice.appendChild(sendChoiceSelected);
	    	sendChoiceAll = document.createElement('option');
	    	sendChoiceAll.value = 'all';
	    	if(lang=='de') sendChoiceAll.appendChild(document.createTextNode('Alle'));
	    	else if(lang=='en') sendChoiceAll.appendChild(document.createTextNode('all'));
	    	sendChoice.appendChild(sendChoiceAll);
	    	sendChoiceNone = document.createElement('option');
	    	sendChoiceNone.value = 'none';
	    	if(lang=='de') sendChoiceNone.appendChild(document.createTextNode('Keine'));
	    	else if(lang=='en') sendChoiceNone.appendChild(document.createTextNode('none'));
	    	sendChoice.appendChild(sendChoiceNone);
		    thisButton.parentNode.insertBefore(sendChoice, thisButton.nextSibling);
				if(lang=='en') thisButton.parentNode.insertBefore(document.createTextNode('  give '), thisButton.nextSibling);
		    thisButton.parentNode.insertBefore(document.createTextNode(' '), thisButton.nextSibling);
		}
	    
	    newSelect = document.createElement('select');
	    newSelect.setAttribute('class', '');
	    newSelect.setAttribute('id', 'doAll'+j);
	    newSelect.setAttribute('name', 'doAll'+j);
	    //newSelect.setAttribute('onchange', 'window.setAll(document.getElementById("doAll'+j+'").value);');
      newSelect.addEventListener('change', setAll, true);
			newSelect.appendChild(document.createElement('option'));
	    optionLager = document.createElement('option');
	    optionLager.setAttribute('value', 'go_lager');
	    if(lang=='de') optionLager.appendChild(document.createTextNode('Lager'));
	    else if(lang=='en') optionLager.appendChild(document.createTextNode('storage'));
	    newSelect.appendChild(optionLager);
	    optionKeller = document.createElement('option');
	    optionKeller.setAttribute('value', 'go_keller');
	    if(lang=='de') optionKeller.appendChild(document.createTextNode('Keller'));
	    else if(lang=='en') optionKeller.appendChild(document.createTextNode('cellar'));
	    newSelect.appendChild(optionKeller);
	    optionGruppenlager = document.createElement('option');
	    optionGruppenlager.setAttribute('value', 'go_group_2');
	    if(lang=='de') optionGruppenlager.appendChild(document.createTextNode('Gruppenlager'));
	    else if(lang=='en') optionGruppenlager.appendChild(document.createTextNode('group storage'));
	    newSelect.appendChild(optionGruppenlager);
	    optionSchatzkammer = document.createElement('option');
	    optionSchatzkammer.setAttribute('value', 'go_group');
	    if(lang=='de') optionSchatzkammer.appendChild(document.createTextNode('Schatzkammer'));
	    else if(lang=='en') optionSchatzkammer.appendChild(document.createTextNode('treasure vault'));
	    newSelect.appendChild(optionSchatzkammer);
	    thisButton.parentNode.insertBefore(newSelect, thisButton.nextSibling);
	    if(lang=='de') thisButton.parentNode.insertBefore(document.createTextNode(' verschieben nach:'), thisButton.nextSibling);	
	    else if(lang=='en') thisButton.parentNode.insertBefore(document.createTextNode(' to:'), thisButton.nextSibling);	
	    goChoice = document.createElement('select');
	    goChoice.setAttribute('id', 'goChoice'+j);
    	//goChoice.setAttribute('onchange', 'selectSetAll(document.getElementById("goChoice'+j+'").value);');
      goChoice.addEventListener('change', selectSetAll, true);
    	goChoiceSelected = document.createElement('option');
    	goChoiceSelected.value = 'selected';
    	if(lang=='de') goChoiceSelected.appendChild(document.createTextNode('Markierte'));
    	else if(lang=='en') goChoiceSelected.appendChild(document.createTextNode('marked'));
    	goChoice.appendChild(goChoiceSelected);
    	goChoiceAll = document.createElement('option');
    	goChoiceAll.value = 'all';
    	if(lang=='de') goChoiceAll.appendChild(document.createTextNode('Alle'));
    	else if(lang=='en') goChoiceAll.appendChild(document.createTextNode('all'));
    	goChoice.appendChild(goChoiceAll);
    	goChoiceNone = document.createElement('option');
    	goChoiceNone.value = 'none';
    	if(lang=='de') goChoiceNone.appendChild(document.createTextNode('Keine'));
    	else if(lang=='en') goChoiceNone.appendChild(document.createTextNode('none'));
    	goChoice.appendChild(goChoiceNone);
	    thisButton.parentNode.insertBefore(goChoice, thisButton.nextSibling);
	    if(lang=='en') thisButton.parentNode.insertBefore(document.createTextNode(' move '), thisButton.nextSibling);	
	    thisButton.parentNode.insertBefore(document.createTextNode(' '), thisButton.nextSibling);    	
    }
}

