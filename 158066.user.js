// ==UserScript==
// @name        SZS_Stammerweiterung
// @namespace   Eissegler
// @description erweitert den SZS assistenten um Eissegler optionen
// @author				Thomas [InGame-Nick]
// @include				http://szs.looki.de/*
// @exclude				http://szs.looki.de/impressum.php
// @exclude				http://szs.looki.de/logout.php
// @exclude				http://szs.looki.de/szsb.html*
// @exclude				http://szs.looki.de/szss.html*
// @exclude				http://szs.looki.de/premium_looki.php?m=*
// @version				0.3.3
// @updateURL			http://userscripts.org/scripts/show/158066
// @downloadURL			http://userscripts.org/scripts/review/158066
// @grant				none
// ==/UserScript==





if(document.URL.indexOf('/stamm.php?do=uebersicht') != -1) {

//##### special user summary #####
	// load stored values from local storage
	var eissegler_GZ = [];
	var eissegler_BF = [];
	var eissegler_HFB = [];
	var eissegler_SV = [];
	var eissegler_Stamm = [];
	//init arrays from local storage
	if(typeof(Storage)!=="undefined"){
		if (!localStorage.getItem("SZS_Eissegler_GZ")) localStorage.SZS_Eissegler_GZ = JSON.stringify(eissegler_GZ);
		if (!localStorage.getItem("SZS_Eissegler_BF")) localStorage.SZS_Eissegler_BF = JSON.stringify(eissegler_BF);
		if (!localStorage.getItem("SZS_Eissegler_HFB")) localStorage.SZS_Eissegler_HFB = JSON.stringify(eissegler_HFB);
		if (!localStorage.getItem("SZS_Eissegler_SV")) localStorage.SZS_Eissegler_SV = JSON.stringify(eissegler_SV);
		if (!localStorage.getItem("SZS_Eissegler_Stamm")) localStorage.SZS_Eissegler_Stamm = JSON.stringify(eissegler_Stamm);
		
		//load from local storage
		eissegler_GZ = JSON.parse(localStorage['SZS_Eissegler_GZ']);
		eissegler_BF = JSON.parse(localStorage['SZS_Eissegler_BF']);
		eissegler_HFB = JSON.parse(localStorage['SZS_Eissegler_HFB']);
		eissegler_SV = JSON.parse(localStorage['SZS_Eissegler_SV']);
		eissegler_Stamm = JSON.parse(localStorage['SZS_Eissegler_Stamm']);
		
	
	}else{
		alert('Sorry! No web storage support..');
	}
	// get content element
	var content = document.getElementById('content');
	var gruender = 0;
	if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
	var table = content.getElementsByTagName("table")[1 + gruender];
	var tags = table.getElementsByTagName("tr");
	tags[0].innerHTML = "<td bgcolor=\"#FF0000\"><select id=\"eissegler_specialMemberAuswahl\"><option value=\"empty\"> - </option><option value=\"GZ\">GZ</option><option value=\"BF\">BF</option>><option value=\"HFB\">HFB</option><<option value=\"SV\">SV</option><option value=\"!SV\">Stamm</option></select></td>" + tags[0].innerHTML;
	
	// Eventlistener - main selection changed
	document.getElementById('eissegler_specialMemberAuswahl').addEventListener('change', function() {
		var selection = document.getElementById('eissegler_specialMemberAuswahl');
			if(selection.value == 'GZ'){
				eissegler_selectGZ();
			}
			else if(selection.value == 'BF'){
				eissegler_selectBF();
			}
			else if(selection.value == 'HFB'){
				eissegler_selectHFB();
			}
			else if(selection.value == 'SV'){
				eissegler_selectSV();
			}
			else if(selection.value == '!SV'){
				eissegler_selectNotSV();
			}
			else if(selection.value == 'empty'){
				eissegler_selectNone();
			}
		});
	// add checkbox for every member
	for(var i = 1; i < tags.length; i +=1){
		tags[i].innerHTML = "<td><input type=\"checkbox\" id=\"eissegler_memberCheckBox_" + i + "\"></td>" + tags[i].innerHTML;
		document.getElementById('eissegler_memberCheckBox_' + i).addEventListener('change', function() {
			// get the index
			var n = this.id.replace(/eissegler_memberCheckBox_/g,""); 
			
			// call save function
			eissegler_saveCheckBox(eissegler_getName(n), this.checked);
		});
	}
	
	// insert additional info
	var insertFields = document.getElementById('content').getElementsByTagName("table")[1+gruender].getElementsByTagName("tr")[0].getElementsByTagName("td");
	insertFields[3].innerHTML = "<center><b>EP</b><br><font color=\"white\"><i id=\"eissegler_selEP\">" + insertFields[3].getElementsByTagName("i")[0].innerHTML + "</i></font><center>";
	insertFields[4].innerHTML = "<center><b>Holz</b><br><font color=\"white\"><i id=\"eissegler_selHolz\">" + insertFields[4].getElementsByTagName("i")[0].innerHTML + "</i></font><center>";
	insertFields[5].innerHTML = "<center><b>Stein</b><br><font color=\"white\"><i id=\"eissegler_selStein\">" + insertFields[5].getElementsByTagName("i")[0].innerHTML + "</i></font><center>";
	insertFields[6].innerHTML = "<center><b>Gold</b><br><font color=\"white\"><i id=\"eissegler_selGold\">" + insertFields[6].getElementsByTagName("i")[0].innerHTML + "</i></font><center>";
	insertFields[7].innerHTML = "<center><b>Wasser</b><br><font color=\"white\"><i id=\"eissegler_selWasser\">" + insertFields[7].getElementsByTagName("i")[0].innerHTML + "</i></font><center>";
	insertFields[8].innerHTML = "<center><b>Nahrung</b><br><font color=\"white\"><i id=\"eissegler_selNahrung\">" + insertFields[8].getElementsByTagName("i")[0].innerHTML + "</i></font><center>";
	
//##### special user rights settings #####
	
	if(gruender){
		var form = document.getElementById('content').getElementsByTagName("form")[1];
		form.innerHTML = form.innerHTML + "<center>Vorauswahl : <select id=\"eissegler_specialRightSelection\"><option value=\"normal\"> Normal </option><option value=\"save\"> Save </option></select> <button type=\"button\" id=\"eissegler_rightsLoad\">Laden</button> <button type=\"button\" id=\"eissegler_rightsStore\">Speichern</button> </center>";
		var button = document.getElementById('eissegler_rightsLoad');
		document.getElementById('eissegler_rightsLoad').addEventListener("click", loadRights);
		document.getElementById('eissegler_rightsStore').addEventListener("click", saveRights);
	}
}

// reload the page if code was wrong
if(document.URL.indexOf('/wasser.php') != -1) {
	if(document.getElementById('content').innerHTML.indexOf('Du hast den Zufallscode leider nicht richtig abgeschrieben.') != -1)
		window.location.replace(window.location.pathname);
}

function saveRights(){
	var member_GR = [];
	var member_LR = [];
	var selection = document.getElementById('eissegler_specialRightSelection').value;
	//init arrays from local storage
	if(selection == "normal"){
		//load from local storage
		member_GR = JSON.parse(localStorage['SZS_Eissegler_Rechte_Normal_GR']);
		member_LR = JSON.parse(localStorage['SZS_Eissegler_Rechte_Normal_LR']);
	}else if(selection == "save"){
		//load from local storage
		member_GR = JSON.parse(localStorage['SZS_Eissegler_Rechte_Save_GR']);
		member_LR = JSON.parse(localStorage['SZS_Eissegler_Rechte_Save_LR']);
	}
	
	var tableRows = document.getElementById('content').getElementsByTagName('form')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	var tags = content.getElementsByTagName('table')[2].getElementsByTagName('tr');
	for(var i=1; i<tags.length; i++) {
		var GR_checkBox = tableRows[i].getElementsByTagName('td')[8].getElementsByTagName('input')[0];
		var LR_checkBox = tableRows[i].getElementsByTagName('td')[7].getElementsByTagName('input')[0];
		
		//GR check
		var index = member_GR.indexOf(eissegler_getName(i)); 
		if(GR_checkBox.checked){
			if(index == -1){
				member_GR.push(eissegler_getName(i));
			}
		}else{
			if(index != -1){
				member_GR.splice(index,1);
			}
		}

		//LR check
		index = member_LR.indexOf(eissegler_getName(i)); 
		if(LR_checkBox.checked){
			if(index == -1){
				member_LR.push(eissegler_getName(i));
			}
		}else{
			if(index != -1){
				member_LR.splice(index,1);
			}
		}
	}
	// save values to local storage
	if(selection == "normal"){
		localStorage.SZS_Eissegler_Rechte_Normal_GR = JSON.stringify(member_GR);
		localStorage.SZS_Eissegler_Rechte_Normal_LR = JSON.stringify(member_LR);
	}else if(selection == "save"){
		localStorage.SZS_Eissegler_Rechte_Save_GR = JSON.stringify(member_GR);
		localStorage.SZS_Eissegler_Rechte_Save_LR = JSON.stringify(member_LR);
	}
}

function initRights(){
	if(typeof(Storage)!=="undefined"){
		var member_GR = [];
		var member_LR = [];
		if (!localStorage.getItem('SZS_Eissegler_Rechte_Normal_GR')) localStorage.SZS_Eissegler_Rechte_Normal_GR = JSON.stringify(member_GR); // init local storage
		if (!localStorage.getItem('SZS_Eissegler_Rechte_Normal_LR')) localStorage.SZS_Eissegler_Rechte_Normal_LR = JSON.stringify(member_LR); // init local storage
		if (!localStorage.getItem('SZS_Eissegler_Rechte_Save_GR')) localStorage.SZS_Eissegler_Rechte_Save_GR = JSON.stringify(member_GR); // init local storage
		if (!localStorage.getItem('SZS_Eissegler_Rechte_Save_LR')) localStorage.SZS_Eissegler_Rechte_Save_LR = JSON.stringify(member_LR); // init local storage
	}
}

function loadRights(){
	initRights();
	var member_GR = [];
	var member_LR = [];
	var selection = document.getElementById('eissegler_specialRightSelection').value;
	//init arrays from local storage
	if(selection == "normal"){
		//load from local storage
		member_GR = JSON.parse(localStorage['SZS_Eissegler_Rechte_Normal_GR']);
		member_LR = JSON.parse(localStorage['SZS_Eissegler_Rechte_Normal_LR']);
	}else if(selection == "save"){
		//load from local storage
		member_GR = JSON.parse(localStorage['SZS_Eissegler_Rechte_Save_GR']);
		member_LR = JSON.parse(localStorage['SZS_Eissegler_Rechte_Save_LR']);
	}
	
	var tableRows = document.getElementById('content').getElementsByTagName('form')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	var mitglieder = content.getElementsByTagName('table')[2].getElementsByTagName('tr');
	for(var i=1; i<mitglieder.length; i++) {
		var GR_checkBox = tableRows[i].getElementsByTagName('td')[8].getElementsByTagName('input')[0];
		var LR_checkBox = tableRows[i].getElementsByTagName('td')[7].getElementsByTagName('input')[0];
		//GR check
		var index = member_GR.indexOf(eissegler_getName(i)); 
		if(index != -1){
			GR_checkBox.checked = true;
		}else{
			GR_checkBox.checked = false;
		}
		
		//LR check
		index = member_LR.indexOf(eissegler_getName(i)); 
		if(index != -1){
			LR_checkBox.checked = true;
		}else{
			LR_checkBox.checked = false;
		}
	}
}

function updateView(){
		var selEP = 0;
		var selHolz = 0;
		var selStein = 0;
		var selGold = 0;
		var selWasser = 0;
		var selNahrung = 0;
		var gruender = 0;
		if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
		var mitglieder = content.getElementsByTagName('table')[1+gruender].getElementsByTagName('tr');
		for(var i=1; i<mitglieder.length; i++) {
			if(isChecked(i)){
				selEP += parseInt(mitglieder[i].getElementsByTagName('td')[3].innerHTML.replace(".","").trim(),10);
				selHolz += parseInt(mitglieder[i].getElementsByTagName('td')[4].innerHTML.replace(".","").trim(),10);
				selStein += parseInt(mitglieder[i].getElementsByTagName('td')[5].innerHTML.replace(".","").trim(),10);
				selGold += parseInt(mitglieder[i].getElementsByTagName('td')[6].innerHTML.replace(".","").trim(),10);
				selWasser += parseInt(mitglieder[i].getElementsByTagName('td')[7].innerHTML.replace(".","").trim(),10);
				selNahrung += parseInt(mitglieder[i].getElementsByTagName('td')[8].innerHTML.replace(".","").trim(),10);
			}
		}
		document.getElementById("eissegler_selEP").innerHTML = number_format(selEP);
		document.getElementById("eissegler_selEP").style.color = "red";
		document.getElementById("eissegler_selHolz").innerHTML = number_format(selHolz);
		document.getElementById("eissegler_selHolz").style.color = "red";
		document.getElementById("eissegler_selStein").innerHTML = number_format(selStein);
		document.getElementById("eissegler_selStein").style.color = "red";
		document.getElementById("eissegler_selGold").innerHTML = number_format(selGold);
		document.getElementById("eissegler_selGold").style.color = "red";
		document.getElementById("eissegler_selWasser").innerHTML = number_format(selWasser);
		document.getElementById("eissegler_selWasser").style.color = "red";
		document.getElementById("eissegler_selNahrung").innerHTML = number_format(selNahrung);
		document.getElementById("eissegler_selNahrung").style.color = "red";
}

function eissegler_getName(n){
	// get correspondig name to checkbox
	var gruender = 0;
	if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
	var name  = document.getElementById('content').getElementsByTagName("table")[1+gruender].getElementsByTagName("tr")[n].getElementsByTagName("td")[2].getElementsByTagName("a")[0].innerHTML;
	name = name.replace(/<font color="red">/g, "").replace(/<\/font>/g,""); // delete color tags if existend
	return name;
}

function isChecked(index){
	var checkBox = document.getElementById('eissegler_memberCheckBox_' + index);
	return checkBox.checked;

}

function eissegler_saveCheckBox(name, checked){
	var selection = document.getElementById('eissegler_specialMemberAuswahl').value;
	//alert(selection + ' # ' + name + ' : ' + checked);
	if(checked){ // add to array
		if(selection == "GZ"){
			if(eissegler_GZ.indexOf(name) == -1){
				eissegler_GZ.push(name);
			}
		}
		else if(selection == "BF"){
			if(eissegler_BF.indexOf(name) == -1){
				eissegler_BF.push(name);
			}
		}
		else if(selection == "HFB"){
			if(eissegler_HFB.indexOf(name) == -1){
				eissegler_HFB.push(name);
			}
		}
		else if(selection == "SV"){
			if(eissegler_SV.indexOf(name) == -1){
				eissegler_SV.push(name);
			}
		}
		else if(selection == "!SV"){
			if(eissegler_Stamm.indexOf(name) == -1){
				eissegler_Stamm.push(name);
			}
		}
	}
	else{ // remove from array
		var index;
		if(selection == "GZ"){
			index = eissegler_GZ.indexOf(name);
			if(index != -1){
				eissegler_GZ.splice(index,1);
			}
		}
		else if(selection == "BF"){
			index = eissegler_BF.indexOf(name);
			if(index != -1){
				eissegler_BF.splice(index,1);
			}
		}
		else if(selection == "HFB"){
			index = eissegler_HFB.indexOf(name);
			if(index != -1){
				eissegler_HFB.splice(index,1);
			}
		}
		else if(selection == "SV"){
			index = eissegler_SV.indexOf(name);
			if(index != -1){
				eissegler_SV.splice(index,1);
			}
		}
		else if(selection == "!SV"){
			index = eissegler_Stamm.indexOf(name);
			if(index != -1){
				eissegler_Stamm.splice(index,1);
			}
		}
	}
	updateView();
	
	// store to local storage
	if(selection == "GZ") localStorage.SZS_Eissegler_GZ = JSON.stringify(eissegler_GZ);
	if(selection == "BF") localStorage.SZS_Eissegler_BF = JSON.stringify(eissegler_BF);
	if(selection == "HFB") localStorage.SZS_Eissegler_HFB = JSON.stringify(eissegler_HFB);
	if(selection == "SV") localStorage.SZS_Eissegler_SV = JSON.stringify(eissegler_SV);
	if(selection == "!SV") localStorage.SZS_Eissegler_Stamm = JSON.stringify(eissegler_Stamm);
	
}

function eissegler_selectNone(){
	var gruender = 0;
	if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
	var tags = document.getElementById('content').getElementsByTagName("table")[1+gruender].getElementsByTagName("tr");
	for(var i = 1; i < tags.length; i +=1){
		var checkBox = document.getElementById('eissegler_memberCheckBox_' + i);
		checkBox.checked = false;
	}
	updateView();
	
}

function eissegler_selectGZ(){
	var gruender = 0;
	if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
	var tags = document.getElementById('content').getElementsByTagName("table")[1+gruender].getElementsByTagName("tr");
	for(var i = 1; i < tags.length; i +=1){
		var checkBox = document.getElementById('eissegler_memberCheckBox_' + i);
		var name = eissegler_getName(i);
		if(eissegler_GZ.indexOf(name) != -1){
			checkBox.checked = true;
		} else {
			checkBox.checked = false;
		}
	}
	updateView();
}

function eissegler_selectBF(){
	var gruender = 0;
	if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
	var tags = document.getElementById('content').getElementsByTagName("table")[1+gruender].getElementsByTagName("tr");
	for(var i = 1; i < tags.length; i +=1){
		var checkBox = document.getElementById('eissegler_memberCheckBox_' + i);
		var name = eissegler_getName(i);
		if(eissegler_BF.indexOf(name) != -1){
			checkBox.checked = true;
		} else {
			checkBox.checked = false;
		}
	}
	updateView();
}

function eissegler_selectHFB(){
	var gruender = 0;
	if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
	var tags = document.getElementById('content').getElementsByTagName("table")[1+gruender].getElementsByTagName("tr");
	for(var i = 1; i < tags.length; i +=1){
		var checkBox = document.getElementById('eissegler_memberCheckBox_' + i);
		var name = eissegler_getName(i);
		if(eissegler_HFB.indexOf(name) != -1){
			checkBox.checked = true;
		} else {
			checkBox.checked = false;
		}
	}
	updateView();
}

function eissegler_selectSV(){
	var gruender = 0;
	if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
	var tags = document.getElementById('content').getElementsByTagName("table")[1+gruender].getElementsByTagName("tr");
	for(var i = 1; i < tags.length; i +=1){
		var checkBox = document.getElementById('eissegler_memberCheckBox_' + i);
		var name = eissegler_getName(i);
		if(eissegler_SV.indexOf(name) != -1){
			checkBox.checked = true;
		} else {
			checkBox.checked = false;
		}
	}
	updateView();
}

function eissegler_selectNotSV(){
	var gruender = 0;
	if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
	var tags = document.getElementById('content').getElementsByTagName("table")[1+gruender].getElementsByTagName("tr");
	for(var i = 1; i < tags.length; i +=1){
		var checkBox = document.getElementById('eissegler_memberCheckBox_' + i);
		var name = eissegler_getName(i);
		if(eissegler_Stamm.indexOf(name) != -1){
			checkBox.checked = true;
		} else {
			checkBox.checked = false;
		}
	}

	updateView();
}

// from SZS-Assistent
function number_format(number, laenge, sep, th_sep, fix) {
/*
	out: String
	in:	number as float
			laenge as integer (optional)
			sep as String (optional)
			th_sep as String (optional)
			fix as boolean (optional)
*/
	if(!laenge) laenge = 0;
	if(!sep) sep = ',';
	if(!th_sep) th_sep = '.';
	number = Math.round(number*Math.pow(10, laenge))/Math.pow(10, laenge);
	str_number = number+'';
	arr_int = str_number.split('.');
	if(!arr_int[0]) arr_int[0] = '0';
	if(!arr_int[1]) arr_int[1] = '';
	if(arr_int[1].length < laenge && fix) {
		nachkomma = arr_int[1];
		for(var i=arr_int[1].length+1; i<=laenge; i++) {
			nachkomma += '0';
		}
		arr_int[1] = nachkomma;
	}
	if(th_sep != '' && arr_int[0].length > 3) {
		Begriff = arr_int[0];
		arr_int[0] = '';
		for(var j=3; j<Begriff.length; j+=3) {
			extrakt = Begriff.slice(Begriff.length-j, Begriff.length-j+3);
			arr_int[0] = th_sep+extrakt+arr_int[0]+'';
		}
		str_first = Begriff.substr(0, (Begriff.length%3 == 0)? 3 : (Begriff.length%3));
		arr_int[0] = str_first+arr_int[0];
	}
	return arr_int[0]+((arr_int[1].length>0)? sep : '')+arr_int[1];
}